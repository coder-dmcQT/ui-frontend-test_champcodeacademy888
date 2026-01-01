import { create } from "zustand/react";
import { persist } from "zustand/middleware/persist";

interface AuthState {
    isLoggedIn: boolean;
    username: string;
    password: string; // 注意：实际项目中不要存储明文密码，这里仅为Mock
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

export const useAuthState = create<AuthState>()(
    persist(
        (set) => ({
            // 初始状态
            isLoggedIn: false,
            username: "",
            password: "",

            // 登录逻辑（Mock：仅验证 admin/admin）
            login: async (username: string, password: string) => {
                try {
                    // 模拟接口请求延迟
                    await new Promise((resolve) => setTimeout(resolve, 800));
                    const resp = await fetch('/api/login', {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: username, password: password }),
                    })
                    const json = await resp.json();
                    // Mock 验证逻辑
                    if (json.code === 200) {
                        set({
                            isLoggedIn: true,
                            username: username,
                            password: password, // 仅Mock，生产环境删除
                        });
                        return true;
                    } else {
                        // 登录失败
                        set({
                            isLoggedIn: false,
                            username: "",
                            password: "",
                        });
                        return false;
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    set({
                        isLoggedIn: false,
                        username: "",
                        password: "",
                    });
                    return false;
                }
            },

            // 登出逻辑
            logout: async () => {
                try {
                    // 模拟接口请求延迟
                    const resp = await fetch('/api/logout')
                    const json = await resp.json();
                    if (json.code === 200) {
                        // 重置状态
                        set({
                            isLoggedIn: false,
                            username: "",
                            password: "",
                        });
                        return true;
                    } else {
                        return false;
                    }

                } catch (error) {
                    console.error("Logout error:", error);
                    return false;
                }
            },
        }),
        {
            name: "auth-storage", // 存储键名（建议语义化）
            skipHydration: true, // 启用持久化数据水合
        }
    )
);