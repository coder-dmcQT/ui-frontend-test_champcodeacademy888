'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { useAppBaseState } from '@/src/store/useAppBaseState';

// -------------------------- 全局样式重置 --------------------------
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  body {
    overflow-x: hidden;
  }
`;

// -------------------------- 动画定义 --------------------------
const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// -------------------------- 组件样式（直接传参，不依赖 ThemeProvider） --------------------------
// 全局容器（通过 props 传递主题）
const LoginContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;

    /* 渐变背景 + 动画 */
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? 'linear-gradient(-45deg, #1e1b4b, #312e81, #4c1d95, #0f172a)'
                    : 'linear-gradient(-45deg, #6366f1, #8b5cf6, #ec4899, #23a6d5)'
    };
    background-size: 400% 400%;
    animation: ${backgroundAnimation} 15s ease infinite;
    position: relative;
    overflow: hidden;
`;

// 装饰粒子
const Particle = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{
    size: number;
    top: string;
    left: string;
    delay: number;
    color: string;
    isDarkMode: boolean;
}>`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  opacity: ${({ isDarkMode }) => (isDarkMode ? 0.2 : 0.3)};
  animation: ${float} ${({ delay }) => 5 + delay}s ease-in-out infinite;
  z-index: 1;
`;

// 暗黑模式切换按钮
const ThemeToggle = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    z-index: 3;
    backdrop-filter: blur(5px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

// 登录卡片
const LoginCard = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? 'rgba(15, 23, 42, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)'
    };
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    border: ${({ isDarkMode }) =>
            isDarkMode
                    ? '1px solid rgba(75, 85, 99, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.2)'
    };
`;

// 标题
const LoginTitle = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    text-align: center;
    color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#111827')};
    margin: 0 0 30px 0;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.5px;
`;

// 输入框容器
const InputGroup = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

// 标签
const InputLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  font-size: 14px;
  color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#374151')};
  font-weight: 500;
`;

// 密码输入框容器
const PasswordWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    position: relative;
`;

// 输入框
const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    padding: 14px 16px;
    border: 1px solid ${({ isDarkMode }) => (isDarkMode ? '#475569' : '#d1d5db')};
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? 'rgba(30, 41, 59, 0.8)'
                    : 'rgba(255, 255, 255, 0.8)'
    };
    color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#111827')};
    width: 100%;

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &::placeholder {
        color: ${({ isDarkMode }) => (isDarkMode ? '#9ca3af' : '#6b7280')};
        opacity: 0.8;
    }
`;

// 密码显隐按钮
const PasswordToggle = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: ${({ isDarkMode }) => (isDarkMode ? '#9ca3af' : '#6b7280')};
    cursor: pointer;
    font-size: 18px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#111827')};
    }
`;

// 记住密码容器
const RememberWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: -10px 0 15px 0;
`;

// 复选框
const Checkbox = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    width: 16px;
    height: 16px;
    accent-color: #6366f1;
    cursor: pointer;
`;

// 记住密码标签
const RememberLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    font-size: 14px;
    color: ${({ isDarkMode }) => (isDarkMode ? '#9ca3af' : '#6b7280')};
    cursor: pointer;
`;

// 错误提示
const ErrorText = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    color: ${({ isDarkMode }) => (isDarkMode ? '#f87171' : '#ef4444')};
    font-size: 14px;
    margin: -10px 0 15px 0;
    text-align: center;
    min-height: 18px;
`;

// 登录按钮（过滤 isLoading 属性）
const LoginButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isLoading'
})<{ isLoading: boolean }>`
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    /* 加载动画 */
    &::after {
        content: '';
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        border-top-color: white;
        animation: ${spin} 1s linear infinite;
        display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
    }
`;

// 底部提示
const FooterText = styled.p.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    text-align: center;
    color: ${({ isDarkMode }) => (isDarkMode ? '#9ca3af' : '#6b7280')};
    font-size: 14px;
    margin: 20px 0 0 0;

    span {
        color: #6366f1;
        font-weight: 500;
    }
`;

import {useMessage} from "@/src/components/Message";

// -------------------------- 登录组件逻辑 --------------------------
export default function LoginPage() {
    // 基础状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();
    const { login, isLoggedIn, isDarkerMode: isDarkMode, setDarkerMode } = useAppBaseState();
    const message = useMessage();
    // 已登录跳转
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard');
        }

        // 读取记住密码
        const savedUser = localStorage.getItem('rememberedUser');
        if (savedUser) {
            const { username } = JSON.parse(savedUser);
            setUsername(username);
            setRememberMe(true);
        }
    }, [isLoggedIn, router]);

    // 切换暗黑模式
    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setDarkerMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    // 登录处理
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError('请输入用户名和密码');
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const success = await login(username, password);

            if (success) {
                message.success("Login successfully");
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({ username }));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                router.push('/dashboard');
            } else {
                message.error("Login failed");
                setError('用户名或密码错误（正确：admin/admin）');
            }
        } catch (err) {
            setError('登录失败，请重试');
            console.error('登录异常：', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 装饰粒子数据
    const particles = [
        { size: 10, top: '10%', left: '10%', delay: 0, color: '#6366f1' },
        { size: 15, top: '20%', left: '80%', delay: 1, color: '#8b5cf6' },
        { size: 8, top: '80%', left: '20%', delay: 2, color: '#ec4899' },
        { size: 12, top: '70%', left: '70%', delay: 3, color: '#23a6d5' },
        { size: 18, top: '40%', left: '40%', delay: 4, color: '#6366f1' },
        { size: 6, top: '90%', left: '90%', delay: 5, color: '#8b5cf6' },
    ];

    return (
        <>
            <GlobalStyles />
            <LoginContainer isDarkMode={isDarkMode}>
                {/* 暗黑模式切换按钮 */}
                <ThemeToggle onClick={toggleDarkMode}>
                    {!isDarkMode ? '☀️' : '🌙'}
                </ThemeToggle>

                {/* 背景粒子 */}
                {particles.map((particle, index) => (
                    <Particle
                        key={index}
                        size={particle.size}
                        top={particle.top}
                        left={particle.left}
                        delay={particle.delay}
                        color={particle.color}
                        isDarkMode={isDarkMode}
                    />
                ))}

                {/* 登录卡片 */}
                <LoginCard isDarkMode={isDarkMode}>
                    <form onSubmit={handleLogin}>
                        <LoginTitle isDarkMode={isDarkMode}>欢迎登录</LoginTitle>

                        <InputGroup>
                            <InputLabel isDarkMode={isDarkMode}>用户名</InputLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                placeholder="请输入用户名"
                                isDarkMode={isDarkMode}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLabel isDarkMode={isDarkMode}>密码</InputLabel>
                            <PasswordWrapper>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    placeholder="请输入密码"
                                    isDarkMode={isDarkMode}
                                />
                                <PasswordToggle
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    isDarkMode={isDarkMode}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </PasswordToggle>
                            </PasswordWrapper>
                        </InputGroup>

                        {/* 记住密码 */}
                        <RememberWrapper>
                            <Checkbox
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            <RememberLabel htmlFor="remember" isDarkMode={isDarkMode}>
                                记住用户名
                            </RememberLabel>
                        </RememberWrapper>

                        <ErrorText isDarkMode={isDarkMode}>{error}</ErrorText>

                        <LoginButton
                            type="submit"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            {isLoading ? '' : '登录'}
                        </LoginButton>

                        <FooterText isDarkMode={isDarkMode}>
                            测试账号：<span>admin</span> / 密码：<span>admin</span>
                        </FooterText>
                    </form>
                </LoginCard>
            </LoginContainer>
        </>
    );
}