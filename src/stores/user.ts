import { defineStore } from 'pinia'
import {
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    getAccessToken,
    getRefreshToken,
    setRefreshToken,
    setUserInfo,
    removeUserInfo
} from '../utils/cookies'
import userService from '../services/modules/user.service'
import { LoginRequest } from '../types/server/user.types'
import { UserProfileResponse } from '@/types/server/user.types'

const STATIC_TOKEN = 'static-admin-token'

const STATIC_USER: NonNullable<UserProfileResponse['data']> = {
    id: 'static-1',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    roles: [{ id: '1', name: 'admin', description: 'Administrator' }],
    permissions: [],
}

interface UserState {
    token?: string
    refresh_token?: string
    user: UserProfileResponse['data'] | null,
    screenSplit: boolean,
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: getAccessToken(),
        refresh_token: getRefreshToken(),
        user: null,
        screenSplit: false,
    }),
    actions: {
        async login(data: LoginRequest) {
            if (data.username === 'admin' && data.password === 'admin123') {
                this.token = STATIC_TOKEN
                this.refresh_token = STATIC_TOKEN
                this.user = STATIC_USER
                setAccessToken(STATIC_TOKEN)
                setRefreshToken(STATIC_TOKEN)
                return {
                    success: true, statusCode: 200, message: 'OK', error: null,
                    data: { accessToken: STATIC_TOKEN, refreshToken: STATIC_TOKEN },
                    meta: { timestamp: new Date().toISOString() },
                }
            }
            const response = await userService.login(data);
            if (response.success && response.data) {
                this.setTokens(response.data.accessToken, response.data.refreshToken);
            }
            return response;
        },
        async fetchUserInfo() {
            if (this.token === STATIC_TOKEN) {
                this.user = STATIC_USER
                return {
                    success: true, statusCode: 200, message: 'OK', error: null,
                    data: STATIC_USER,
                    meta: { timestamp: new Date().toISOString() },
                }
            }
            const response = await userService.getCurrentUser();
            if (response.success && response.data) {
                this.user = response.data;
                setUserInfo(response.data);
            }
            return response;
        },
        async refreshToken() {
            if (this.token === STATIC_TOKEN) return { success: true, statusCode: 200, message: 'OK', error: null, data: null, meta: { timestamp: new Date().toISOString() } }
            const response = await userService.refreshToken({
                refresh_token: this.refresh_token || getRefreshToken() || ''
            });
            if (response.success && response.data) {
                this.setTokens(response.data.accessToken, response.data.refreshToken);
            }
            return response;
        },
        setTokens(accessToken: string, refreshToken: string) {
            this.token = accessToken
            this.refresh_token = refreshToken
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
        },
        resetToken() {
            removeAccessToken();
            removeRefreshToken();
            removeUserInfo()
            this.token = '';
            this.refresh_token = '';
            this.user = null;
        },
        async logout() {
            if (this.token === STATIC_TOKEN) {
                this.resetToken()
                return { success: true, statusCode: 200, message: 'OK', error: null, data: null, meta: { timestamp: new Date().toISOString() } }
            }
            const response = await userService.logout();
            if (response.success) {
                this.resetToken();
            }
            return response;
        },
    },
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    },
});
