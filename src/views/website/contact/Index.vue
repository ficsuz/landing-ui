<template>
    <div class="py-20 md:py-28">
        <div class="max-w-[1400px] mx-auto px-6 md:px-12">
            <!-- Title -->
            <h1 class="text-[clamp(40px,6vw,80px)] font-black uppercase text-[#191c1f] tracking-tight text-center mb-16">
                {{ $t('contact.title') }}
            </h1>

            <!-- Body -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-start">
                <!-- Left: Form -->
                <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="contact-form" @submit.prevent="handleSubmit">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mb-6">
                        <el-form-item :label="$t('contact.firstName')" prop="firstName">
                            <el-input
                                v-model="form.firstName"
                                :placeholder="$t('contact.firstNamePlaceholder')"
                                size="large"
                                class="contact-input--pill"
                            />
                        </el-form-item>
                        <el-form-item :label="$t('contact.lastName')" prop="lastName">
                            <el-input
                                v-model="form.lastName"
                                :placeholder="$t('contact.lastNamePlaceholder')"
                                size="large"
                                class="contact-input--pill"
                            />
                        </el-form-item>
                    </div>

                    <el-form-item :label="$t('contact.phone')" prop="phone">
                        <el-input v-model="form.phone" :placeholder="$t('contact.phonePlaceholder')" size="large" class="contact-input--pill" />
                    </el-form-item>

                    <el-form-item :label="$t('contact.email')" prop="email">
                        <el-input v-model="form.email" :placeholder="$t('contact.emailPlaceholder')" size="large" class="contact-input--pill" />
                    </el-form-item>

                    <el-form-item :label="$t('contact.message')" prop="message">
                        <el-input v-model="form.message" type="textarea" :rows="5" :placeholder="$t('contact.messagePlaceholder')" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" native-type="submit" size="large" round class="contact-submit-btn" :loading="loading" @click="handleSubmit">
                            {{ $t('contact.submit') }}
                        </el-button>
                    </el-form-item>
                </el-form>

                <!-- Right: Info + Map -->
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col gap-5">
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.1em] text-[#98a2b3] mb-1">
                                {{ $t('footer.phoneLabel') }}
                            </p>
                            <a href="tel:+998880998888" class="text-xl font-bold text-[#191c1f] hover:text-[#475467] transition-colors">
                                +998 88 099 88 88
                            </a>
                        </div>
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.1em] text-[#98a2b3] mb-1">
                                {{ $t('footer.emailLabel') }}
                            </p>
                            <a href="mailto:secretariat@fics.uz" class="text-xl font-bold text-[#191c1f] hover:text-[#475467] transition-colors">
                                secretariat@fics.uz
                            </a>
                        </div>
                        <div>
                            <p class="text-xs font-semibold uppercase tracking-[0.1em] text-[#98a2b3] mb-1">
                                {{ $t('footer.addressLabel') }}
                            </p>
                            <p class="text-xl font-bold text-[#191c1f]">BoMI Finance Center, 100135, Tashkent</p>
                        </div>

                        <div class="flex gap-3 mt-1">
                            <a
                                v-for="social in socials"
                                :key="social.name"
                                :href="social.href"
                                target="_blank"
                                rel="noopener"
                                :aria-label="social.name"
                                class="w-11 h-11 rounded-full bg-[#191c1f] text-white flex items-center justify-center hover:opacity-75 transition-opacity"
                            >
                                <component :is="social.icon" />
                            </a>
                        </div>
                    </div>

                    <div class="w-full h-[380px] rounded-2xl overflow-hidden bg-[#f2f4f7]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0!2d69.2796!3d41.2992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b6a3b6b8b8b%3A0x1234567890abcdef!2sBoMI%20Finance%20Center!5e0!3m2!1sen!2s!4v1718000000000"
                            width="100%"
                            height="100%"
                            style="border: 0"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, h } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
})

const rules: FormRules = {
    firstName: [{ required: true, message: () => t('contact.firstNamePlaceholder'), trigger: 'blur' }],
    lastName: [{ required: true, message: () => t('contact.lastNamePlaceholder'), trigger: 'blur' }],
    phone: [{ required: true, message: () => t('contact.phonePlaceholder'), trigger: 'blur' }],
    email: [{ required: true, type: 'email', message: () => t('contact.emailPlaceholder'), trigger: 'blur' }],
    message: [{ required: true, message: () => t('contact.messagePlaceholder'), trigger: 'blur' }],
}

const handleSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => false)
    if (!valid) return

    loading.value = true
    try {
        const res = await fetch('https://6935988eacba7.xvest1.ru/fic_bot_test/send.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: form.firstName,
                last_name: form.lastName,
                phone: form.phone,
                email: form.email,
                message: form.message,
            }),
        })

        const data = await res.json()
        if (data.success) {
            ElMessage.success(t('contact.successMessage'))
            formRef.value?.resetFields()
        } else {
            ElMessage.error(t('contact.errorMessage'))
        }
    } catch {
        ElMessage.error(t('contact.errorMessage'))
    } finally {
        loading.value = false
    }
}

const TelegramIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', width: 18, height: 18 }, [
        h('path', {
            d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
        }),
    ])

const FacebookIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', width: 18, height: 18 }, [
        h('path', {
            d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
        }),
    ])

const LinkedInIcon = () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', width: 18, height: 18 }, [
        h('path', {
            d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
        }),
    ])

const socials = [
    { name: 'Telegram', href: 'https://t.me/fic_uz', icon: TelegramIcon },
    { name: 'Facebook', href: 'https://www.facebook.com/fics.uz', icon: FacebookIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ficsuz', icon: LinkedInIcon },
]
</script>

<style scoped lang="scss">
/* Pill-shaped inputs */
.contact-input--pill {
    :deep(.el-input__wrapper) {
        border-radius: 999px !important;
        padding: 0 20px;
        background: #fff !important;
        box-shadow: 0 0 0 1.5px #e4e7ec inset !important;

        &:hover {
            box-shadow: 0 0 0 1.5px #98a2b3 inset !important;
        }

        &.is-focus {
            box-shadow: 0 0 0 1.5px #191c1f inset !important;
        }
    }
}

/* Full-width submit button */
.contact-submit-btn {
    width: 100%;
    font-size: 16px !important;
    font-weight: 600 !important;
    height: 52px !important;
    background-color: #191c1f !important;
    border-color: #191c1f !important;

    &:hover {
        opacity: 0.85;
    }
}

/* Remove el-form-item bottom margin for submit row */
.contact-form {
    :deep(.el-form-item:last-child) {
        margin-bottom: 0 !important;
    }
}
</style>
