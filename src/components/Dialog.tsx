'use client'
import styled, { createGlobalStyle } from 'styled-components';
import {Root} from "react-dom/client";

// -------------------------- 全局遮罩样式 --------------------------
const DialogGlobalStyle = createGlobalStyle`
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .dialog-overlay.show {
    opacity: 1;
  }

  .dialog-content {
    transform: scale(0.95);
    transition: transform 0.2s ease;
  }

  .dialog-overlay.show .dialog-content {
    transform: scale(1);
  }
`;

// -------------------------- 对话框样式 --------------------------
const DialogWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  background: ${({ isDarkMode }) => (isDarkMode ? '#1e1b4b' : '#ffffff')};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: ${({ isDarkMode }) => (isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb')};
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`;

const DialogTitle = styled.h3.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#111827')};
`;

const CloseBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  background: transparent;
  border: none;
  color: ${({ isDarkMode }) => (isDarkMode ? '#9ca3af' : '#6b7280')};
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ isDarkMode }) => (isDarkMode ? '#f9fafb' : '#111827')};
  }
`;

const DialogBody = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
  margin-bottom: 20px;
  font-size: 14px;
  color: ${({ isDarkMode }) => (isDarkMode ? '#d1d5db' : '#4b5563')};
  line-height: 1.6;
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const DialogBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ type: 'primary' | 'default', isDarkMode: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ type, isDarkMode }) => {
    if (type === 'primary') {
        return `
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        color: #fff;
        border: none;

        &:hover {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
      `;
    }
    return `
      background: ${isDarkMode ? '#312e81' : '#f3f4f6'};
      color: ${isDarkMode ? '#f9fafb' : '#374151'};
      border: none;

      &:hover {
        background: ${isDarkMode ? '#2d2b55' : '#e5e7eb'};
      }
    `;
}}
`;

// -------------------------- 类型定义 --------------------------
interface DialogOptions {
    title: string;
    content: string | React.ReactNode;
    isDarkMode?: boolean;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    showCancel?: boolean;
}

// -------------------------- 全局 Dialog 管理器 --------------------------
let dialogInstance: React.ReactElement | null = null;
let dialogContainer: HTMLDivElement | null = null;
let root: Root | null

// 创建 Dialog 函数（仿 naive-ui dialog.create）
export const createDialog = (options: DialogOptions) => {
    const {
        title,
        content,
        isDarkMode = false,
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        onConfirm,
        onCancel,
        showCancel = true
    } = options;

    // 创建容器
    if (!dialogContainer) {
        dialogContainer = document.createElement('div');
        document.body.appendChild(dialogContainer);
    }

    // 关闭 Dialog
    const closeDialog = () => {
        if (dialogContainer) {
            const overlay = dialogContainer.querySelector('.dialog-overlay');
            if (overlay) overlay.classList.remove('show');

            setTimeout(() => {
                if (dialogContainer) {
                    dialogContainer.innerHTML = '';
                }
                dialogInstance = null;
            }, 200);
        }
    };

    // 处理确认
    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
        closeDialog();
    };

    // 处理取消
    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        closeDialog();
    };

    // 渲染 Dialog
    const renderDialog = () => {
        const dialogElement = (
            <>
                <DialogGlobalStyle />
                <div className="dialog-overlay show">
                    <div className="dialog-content">
                        <DialogWrapper isDarkMode={isDarkMode}>
                            <DialogHeader>
                                <DialogTitle isDarkMode={isDarkMode}>{title}</DialogTitle>
                                <CloseBtn isDarkMode={isDarkMode} onClick={handleCancel}>
                                    ×
                                </CloseBtn>
                            </DialogHeader>
                            <DialogBody isDarkMode={isDarkMode}>
                                {content}
                            </DialogBody>
                            <DialogFooter>
                                {showCancel && (
                                    <DialogBtn type="default" isDarkMode={isDarkMode} onClick={handleCancel}>
                                        {cancelText}
                                    </DialogBtn>
                                )}
                                <DialogBtn type="primary" isDarkMode={isDarkMode} onClick={handleConfirm}>
                                    {confirmText}
                                </DialogBtn>
                            </DialogFooter>
                        </DialogWrapper>
                    </div>
                </div>
            </>
        );

        // 使用 ReactDOM 渲染（需安装 @types/react-dom）
        import('react-dom/client').then(({ createRoot }) => {
            if (dialogContainer) {
                if (!root) {
                    root = createRoot(dialogContainer)
                }
                root.render(dialogElement);
            }
        });

        dialogInstance = dialogElement;
    };

    renderDialog();

    // 返回关闭方法
    return {
        close: closeDialog
    };
};

// -------------------------- 组件式调用（可选） --------------------------
interface DialogProps extends DialogOptions {
    visible: boolean;
    onClose: () => void;
}

export const Dialog = ({
                           visible,
                           title,
                           content,
                           isDarkMode = false,
                           confirmText = 'Confirm',
                           cancelText = 'Cancel',
                           onConfirm,
                           onCancel,
                           showCancel = true,
                           onClose
                       }: DialogProps) => {
    const handleConfirm = async () => {
        if (onConfirm) {
            await onConfirm();
        }
        onClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        onClose();
    };

    if (!visible) return null;

    return (
        <>
            <DialogGlobalStyle />
            <div className="dialog-overlay show">
                <div className="dialog-content">
                    <DialogWrapper isDarkMode={isDarkMode}>
                        <DialogHeader>
                            <DialogTitle isDarkMode={isDarkMode}>{title}</DialogTitle>
                            <CloseBtn isDarkMode={isDarkMode} onClick={handleCancel}>
                                ×
                            </CloseBtn>
                        </DialogHeader>
                        <DialogBody isDarkMode={isDarkMode}>
                            {content}
                        </DialogBody>
                        <DialogFooter>
                            {showCancel && (
                                <DialogBtn type="default" isDarkMode={isDarkMode} onClick={handleCancel}>
                                    {cancelText}
                                </DialogBtn>
                            )}
                            <DialogBtn type="primary" isDarkMode={isDarkMode} onClick={handleConfirm}>
                                {confirmText}
                            </DialogBtn>
                        </DialogFooter>
                    </DialogWrapper>
                </div>
            </div>
        </>
    );
};

export default Dialog;