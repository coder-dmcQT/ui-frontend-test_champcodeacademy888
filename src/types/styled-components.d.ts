// src/types/styled-components.d.ts
import 'styled-components';

// 定义主题类型（与你实际的主题结构一致）
type Theme = {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    inputBg: string;
    inputBorder: string;
    errorColor: string;
    particleOpacity: number;
};

// 扩展 styled-components 的 DefaultTheme 类型
declare module 'styled-components' {
}