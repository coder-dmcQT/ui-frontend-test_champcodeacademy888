'use client';
import styled, { keyframes } from 'styled-components';

// 复用旋转动画（抽离为全局常量）
export const spinLoading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// Loading 遮罩容器
const LoadingContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ isDarkMode }) =>
    isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
    backdrop-filter: blur(2px);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// Loading 旋转图标
const LoadingSpinner = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    width: 40px;
    height: 40px;
    border: 4px solid ${({ isDarkMode }) =>
    isDarkMode ? '#312e81' : '#e5e7eb'};
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: ${spinLoading} 1s linear infinite;
    z-index: 11;
`;

// 组件属性
interface LoadingOverlayProps {
    /** 是否显示 Loading */
    visible: boolean;
    /** 是否暗黑模式 */
    isDarkMode: boolean;
    /** 容器类名（可选） */
    className?: string;
    /** Loading 尺寸（可选，默认 40px） */
    size?: number;
}

// 核心：可复用的 Loading 遮罩组件
export default function LoadingOverlay({
                                           visible,
                                           isDarkMode,
                                           className = '',
                                           size = 40,
                                       }: LoadingOverlayProps) {
    // 不显示时直接返回 null
    if (!visible) return null;

    return (
        <LoadingContainer isDarkMode={isDarkMode} className={className}>
            <LoadingSpinner
                isDarkMode={isDarkMode}
                style={{ width: size, height: size, borderWidth: size / 10 }}
            />
        </LoadingContainer>
    );
}