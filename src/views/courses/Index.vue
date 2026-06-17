<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Kurslar</h1>
      <el-button type="primary" @click="showCreateDialog = true">
        Kurs qo'shish
      </el-button>
    </div>

    <el-table v-loading="loading" :data="courses" class="w-full">
      <el-table-column prop="title" label="Nomi" />
      <el-table-column prop="category" label="Kategoriya" />
      <el-table-column prop="price" label="Narx">
        <template #default="{ row }">
          {{ row.price === 0 ? 'Bepul' : row.price + " so'm" }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonsCount" label="Darslar soni" />
      <el-table-column label="Amallar" width="120" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="editCourse(row)">Tahrirlash</el-button>
          <el-button type="danger" link @click="deleteCourse(row.id)">O'chirish</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-if="!loading && courses.length === 0" description="Kurslar mavjud emas" />

    <el-dialog v-model="showCreateDialog" :title="editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs'" width="500px">
      <el-form :model="form" label-position="top">
        <el-form-item label="Nomi">
          <el-input v-model="form.title" placeholder="Kurs nomini kiriting" />
        </el-form-item>
        <el-form-item label="Kategoriya">
          <el-input v-model="form.category" placeholder="Kategoriya" />
        </el-form-item>
        <el-form-item label="Narx">
          <el-input v-model.number="form.price" type="number" placeholder="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelEdit">Bekor qilish</el-button>
        <el-button type="primary" :loading="saveLoading" @click="saveCourse">Saqlash</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCourseStore } from '@/features/courses';
import type { Course } from '@/features/courses';

const courseStore = useCourseStore();
const courses = computed(() => courseStore.courses);
const loading = computed(() => courseStore.loading);

const showCreateDialog = ref(false);
const saveLoading = ref(false);
const editingCourse = ref<Course | null>(null);

const form = ref({ title: '', category: '', price: 0 });

onMounted(() => courseStore.fetchCourses());

function editCourse(course: Course) {
  editingCourse.value = course;
  form.value = { title: course.title, category: course.category, price: course.price };
  showCreateDialog.value = true;
}

function cancelEdit() {
  showCreateDialog.value = false;
  editingCourse.value = null;
  form.value = { title: '', category: '', price: 0 };
}

async function saveCourse() {
  saveLoading.value = true;
  try {
    if (editingCourse.value) {
      await courseStore.updateCourse({ ...editingCourse.value, ...form.value });
      ElMessage.success('Kurs yangilandi');
    } else {
      await courseStore.createCourse(form.value);
      ElMessage.success('Kurs yaratildi');
    }
    cancelEdit();
  } finally {
    saveLoading.value = false;
  }
}

async function deleteCourse(id: string) {
  await ElMessageBox.confirm("Kursni o'chirishni xohlaysizmi?", 'Ogohlantirish', {
    confirmButtonText: 'Ha',
    cancelButtonText: "Yo'q",
    type: 'warning',
  });
  await courseStore.deleteCourse(id);
  ElMessage.success("Kurs o'chirildi");
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 24px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;
}
</style>
