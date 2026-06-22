<template>
    <div class="min-h-screen">
        <div class="h-[95vh] flex items-center justify-center">
            <div class="box w-full">
                <div class="text-center mx-auto w-full max-w-[370px]">
                    <div class="flex items-center justify-center gap-3 mb-8">
                        <LogoIcon class="w-14 h-14 flex-shrink-0" />
                        <span class="text-left text-[11px] font-bold leading-[1.4] text-[#191c1f] tracking-wide uppercase">
                            FOREIGN INVESTORS COUNCIL<br />
                            UNDER THE PRESIDENT OF THE<br />
                            REPUBLIC OF UZBEKISTAN
                        </span>
                    </div>
                    <h5 class="font-bold text-3xl text-primary">Sign in</h5>
                    <p class="text-base mb-6 mt-1 text-primary opacity-50">Enter your login and password to sign in</p>

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
                            <div class="text-left text-sm font-medium mb-1">Email</div>
                            <el-form-item prop="email" class="mb-4">
                                <el-input
                                    v-model.trim="ruleForm.email"
                                    type="email"
                                    autocomplete="off"
                                    placeholder="Enter your email"
                                />
                            </el-form-item>
                        </div>

                        <div class="mb-4">
                            <div class="text-left text-sm font-medium mb-1">Password</div>
                            <el-form-item prop="password">
                                <el-input
                                    v-model.trim="ruleForm.password"
                                    type="password"
                                    :show-password="true"
                                    autocomplete="off"
                                    placeholder="Enter your password"
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
                                Sign in
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
    email: '',
    password: '',
})

const rules = reactive<FormRules>({
    email: [
        { required: true, message: 'Please enter your email', trigger: 'blur' },
        { type: 'email', message: 'Invalid email format', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please enter your password', trigger: 'blur' },
        { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
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
                ElMessage.success('Successfully signed in')
                const redirect = route.query.redirect as string
                router.push(redirect || '/admin')
            } else {
                ElMessage.error(response.message || 'Invalid login or password')
            }
        } catch {
            ElMessage.error('Invalid login or password')
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
