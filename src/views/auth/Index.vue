<template>
    <div class="min-h-screen">
        <div class="h-[95vh] flex items-center justify-center">
            <div class="box w-full">
                <div class="text-center mx-auto w-full max-w-[370px]">
                    <LogoIcon class="mx-auto fixed top-8 left-8 max-w-[120px]" />
                    <h5 class="font-bold text-3xl text-primary">Tizimga kirish</h5>
                    <p class="text-base mb-6 mt-1 text-primary opacity-50">Tizimga kirish uchun login va parolingizni <br /> kiriting</p>

                    <el-form
                        @keyup.enter="submitForm(ruleFormRef)"
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                        :hide-required-asterisk="true"
                        label-position="top"
                        class="!text-xs"
                    >
                        <div class="mb-4">
                            <div class="text-left text-sm font-medium mb-1">Login</div>
                            <el-form-item prop="username" class="mb-4">
                                <el-input
                                    v-model.trim="ruleForm.username"
                                    type="text"
                                    autocomplete="off"
                                    placeholder="Loginingizni kiriting"
                                />
                            </el-form-item>
                        </div>

                        <div class="mb-4">
                            <div class="text-left text-sm font-medium mb-1">Parol</div>
                            <el-form-item prop="password">
                                <el-input
                                    v-model.trim="ruleForm.password"
                                    type="password"
                                    :show-password="true"
                                    autocomplete="off"
                                    placeholder="Parolingizni kiriting"
                                />
                            </el-form-item>
                        </div>

                        <div class="flex flex-col py-1 mt-4">
                            <el-button
                                class="w-full login-btn"
                                size="large"
                                type="primary"
                                @click="submitForm(ruleFormRef)"
                                :loading="loading"
                            >
                                Tizimga kirish
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LogoIcon } from '@/components/icons'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const store = useUserStore()
const router = useRouter()
const route = useRoute()
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
    username: '',
    password: '',
})

const rules = reactive<FormRules>({
    username: [
        { required: true, message: 'Iltimos, usernameingizni kiriting', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Iltimos, parolingizni kiriting', trigger: 'blur' },
        { min: 6, message: `Parol kamida 6 ta belgidan iborat bo'lishi kerak`, trigger: 'blur' },
    ],
})

const loading = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return

    await formEl.validate(async (valid) => {
        if (!valid) return

        loading.value = true
        try {
            const response = await store.login(ruleForm)
            if (response.success) {
                await store.fetchUserInfo()
                ElMessage.success('Tizimga muvaffaqiyatli kirdingiz')
                const redirect = route.query.redirect as string
                const role = store.getUser?.roles[0].name
                if (redirect) {
                    router.push(redirect)
                } else {
                    router.push(role === 'teacher' ? '/admin/teacher-courses' : '/admin')
                }
            } else {
                ElMessage.error(response.message || `Login yoki parol noto'g'ri`)
            }
        } catch {
            ElMessage.error(`Login yoki parol noto'g'ri`)
        } finally {
            loading.value = false
        }
    })
}
</script>

<style lang="scss" scoped>
.login-btn {
    border-radius: 6px;
    height: 48px;
    font-weight: 500;
}

:deep(.el-input__wrapper) {
    border-radius: 6px;
    padding: 10px 15px;
}
</style>
