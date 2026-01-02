'use client';
import {motion, AnimatePresence, TargetAndTransition, VariantLabels} from 'framer-motion';
import { ReactNode } from 'react';
import type { Transition } from "framer-motion";

// 修正 AnimationConfig 类型：
export type AnimationConfig = {
    initial?: TargetAndTransition | VariantLabels | boolean; // 匹配 motion 的 initial 类型
    animate?: TargetAndTransition | VariantLabels | boolean; // 匹配 animate 类型
    exit?: TargetAndTransition | VariantLabels | undefined;    // 匹配 exit 类型
    transition?: Transition | object; // 匹配 transition 类型
};

// 组件属性
interface AnimatedContentProps {
    // 唯一key（路由path/Tab key，用于触发动画）
    keyValue: string;
    // 要渲染的内容
    children: ReactNode;
    // 自定义动画配置（可选）
    animationConfig?: AnimationConfig;
    // 容器样式（可选）
    className?: string;
    // 是否禁用动画（可选）
    disableAnimation?: boolean;
}

// 默认动画配置（淡入淡出 + 轻微位移）
const defaultAnimation: AnimationConfig = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3, ease: "easeInOut" },
};

export default function AnimatedContent({
                                            keyValue,
                                            children,
                                            animationConfig = defaultAnimation,
                                            className = "",
                                            disableAnimation = false,
                                        }: AnimatedContentProps) {
    // 禁用动画时的兜底配置
    const finalConfig = (disableAnimation
        ? {
            initial: { opacity: 1 },
            animate: { opacity: 1 },
            exit: { opacity: 1 },
            transition: { duration: 0 },
        }
        : { ...defaultAnimation, ...animationConfig }) as Required<AnimationConfig>;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={keyValue} // 核心：key变化触发动画
                initial={finalConfig.initial}
                animate={finalConfig.animate}
                exit={finalConfig.exit}
                transition={finalConfig.transition}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}