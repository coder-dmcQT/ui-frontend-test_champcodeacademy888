'use client'
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// -------------------------- 动画定义 --------------------------
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// -------------------------- 全局样式 --------------------------
const MessageGlobalStyle = createGlobalStyle`
  .message-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message-item {
    animation: ${fadeIn} 0.3s ease forwards;
    opacity: 0;
  }

  .message-item.hide {
    animation: ${fadeOut} 0.3s ease forwards;
  }
`;

// -------------------------- Message 项样式 --------------------------
const MessageItem = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'type'
})<{
    type: 'success' | 'error' | 'info' | 'warning';
    isDarkMode: boolean;
}>`
  padding: 12px 16px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  /* 类型样式 */
  ${({ type, isDarkMode }) => {
    const baseBg = isDarkMode ? 'rgba(30, 27, 75, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    const baseBorder = isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb';

    switch (type) {
        case 'success':
            return `
          background: ${baseBg};
          border-left: 4px solid #10b981;
          border: ${baseBorder};
          color: ${isDarkMode ? '#6ee7b7' : '#059669'};
        `;
        case 'error':
            return `
          background: ${baseBg};
          border-left: 4px solid #ef4444;
          border: ${baseBorder};
          color: ${isDarkMode ? '#fca5a5' : '#dc2626'};
        `;
        case 'info':
            return `
          background: ${baseBg};
          border-left: 4px solid #3b82f6;
          border: ${baseBorder};
          color: ${isDarkMode ? '#93c5fd' : '#2563eb'};
        `;
        case 'warning':
            return `
          background: ${baseBg};
          border-left: 4px solid #f59e0b;
          border: ${baseBorder};
          color: ${isDarkMode ? '#fcd34d' : '#d97706'};
        `;
    }
}}
`;

const MessageIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const MessageText = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  font-size: 14px;
  flex: 1;
  color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#374151')};
`;

// -------------------------- 类型定义 --------------------------
interface MessageOptions {
    content: string | React.ReactNode;
    type?: 'success' | 'error' | 'info' | 'warning';
    duration?: number; // 自动关闭时间（毫秒），0 不关闭
    isDarkMode?: boolean;
    onClose?: () => void;
}

// -------------------------- 全局 Message 管理器 --------------------------
let messageContainer: HTMLDivElement | null = null;
let messageId = 1;

// 创建单个 Message 函数（仿 createDialog 写法）
export const createMessage = (options: MessageOptions | string) => {
    // 处理参数
    const finalOptions: MessageOptions = typeof options === 'string'
        ? { content: options }
        : {
            type: 'info',
            duration: 3000,
            isDarkMode: false,
            ...options
        };

    // 创建容器（完全参考 Dialog 写法）
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        document.body.appendChild(messageContainer);
    }

    // 生成唯一ID
    const id = `message_${messageId++}`;

    // 关闭当前 Message
    const closeMessage = () => {
        const el = messageContainer?.querySelector(`#${id}`);
        if (el) {
            el.classList.add('hide');
            setTimeout(() => {
                el.remove();
                finalOptions.onClose && finalOptions.onClose();
                // 清空容器（如果没有子元素）
                if (messageContainer?.children.length === 0) {
                    messageContainer.innerHTML = '';
                }
            }, 300);
        }
    };

    // 渲染 Message（完全参考 Dialog 渲染逻辑）
    const renderMessage = () => {
        // 构建 Message 元素
        const messageElement = (
            <>
                <MessageGlobalStyle />
                <div className="message-container">
                    <MessageItem
                        id={id}
                        className="message-item"
                        type={finalOptions.type || 'info'}
                        isDarkMode={finalOptions.isDarkMode || false}
                    >
                        <MessageIcon>
                            {finalOptions.type === 'success' && '✓'}
                            {finalOptions.type === 'error' && '✕'}
                            {finalOptions.type === 'info' && 'ℹ'}
                            {finalOptions.type === 'warning' && '⚠'}
                        </MessageIcon>
                        <MessageText isDarkMode={finalOptions.isDarkMode || false}>
                            {finalOptions.content}
                        </MessageText>
                    </MessageItem>
                </div>
            </>
        );

        // 参考 Dialog 动态导入 ReactDOM
        import('react-dom/client').then(({ createRoot }) => {
            if (messageContainer) {
                const root = createRoot(messageContainer);
                root.render(messageElement);
            }
        });

        // 自动关闭
        if (finalOptions.duration && finalOptions.duration > 0) {
            setTimeout(closeMessage, finalOptions.duration);
        }

        return {
            id,
            close: closeMessage
        };
    };

    // 立即渲染
    renderMessage();

    // 返回关闭方法
    return {
        close: closeMessage
    };
};

// -------------------------- useMessage Hook（仿 naive-ui） --------------------------
export const useMessage = () => {
    // 快捷方法
    const success = (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) => {
        return createMessage({ ...options, content, type: 'success' });
    };

    const error = (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) => {
        return createMessage({ ...options, content, type: 'error' });
    };

    const info = (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) => {
        return createMessage({ ...options, content, type: 'info' });
    };

    const warning = (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) => {
        return createMessage({ ...options, content, type: 'warning' });
    };

    // 关闭所有 Message
    const closeAll = () => {
        if (messageContainer) {
            const messages = messageContainer.querySelectorAll('.message-item');
            messages.forEach(msg => {
                msg.classList.add('hide');
                setTimeout(() => msg.remove(), 300);
            });
            setTimeout(() => {
                messageContainer!.innerHTML = '';
            }, 300);
        }
    };

    return {
        create: createMessage,
        success,
        error,
        info,
        warning,
        closeAll
    };
};

// 快捷函数（全局调用）
export const message = {
    success: (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) =>
        createMessage({ ...options, content, type: 'success' }),
    error: (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) =>
        createMessage({ ...options, content, type: 'error' }),
    info: (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) =>
        createMessage({ ...options, content, type: 'info' }),
    warning: (content: string | React.ReactNode, options?: Omit<MessageOptions, 'content' | 'type'>) =>
        createMessage({ ...options, content, type: 'warning' }),
    closeAll: () => {
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }
    }
};

export default useMessage;