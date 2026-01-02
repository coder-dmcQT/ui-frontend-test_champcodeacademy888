'use client'
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {useRouter} from 'next/navigation';
import styled, {keyframes, createGlobalStyle, css} from 'styled-components';
import {useAppBaseState} from '@/src/store/useAppBaseState';
import {createDialog} from "@/src/components/Dialog";

// -------------------------- 全局样式（与登录页保持一致） --------------------------
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

// -------------------------- 动画（复用登录页渐变逻辑） --------------------------
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

// 新增 Loading 旋转动画
const spinLoading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// -------------------------- 布局组件 --------------------------
// 主容器
const DashboardContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    display: flex;
    min-height: 100vh;
    background: ${({isDarkMode}) =>
            isDarkMode
                    ? 'linear-gradient(-45deg, #1e1b4b, #312e81, #4c1d95, #0f172a)'
                    : 'linear-gradient(-45deg, #f0f4ff, #e6e9ff, #f9e6ff, #e6f7ff)'
    };
    background-size: 400% 400%;
    animation: ${backgroundAnimation} 20s ease infinite;
    color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#111827')};
`;

// 顶部 AppBar
const AppBar = styled.header.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: ${({isDarkMode}) => (isDarkMode ? '#1e1b4b' : 'rgba(255, 255, 255, 0.9)')};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    z-index: 100;
    backdrop-filter: blur(5px);
    border-bottom: ${({isDarkMode}) => (isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb')}
`;

// AppBar 标题
const AppTitle = styled.h1.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    font-size: 22px;
    font-weight: 600;
    color: #6366f1;
`;

// 用户信息区
const UserArea = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    display: flex;
    align-items: center;
    gap: 20px;
`;

// 用户名
const Username = styled.span.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    font-size: 16px;
    color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#374151')};
`;

// 登出按钮
const LogoutBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: ${({isDarkMode}) => (isDarkMode ? '#ef4444' : '#fef2f2')};
    color: ${({isDarkMode}) => (isDarkMode ? '#fff' : '#dc2626')};
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${({isDarkMode}) => (isDarkMode ? '#dc2626' : '#fee2e2')};
    }
`;

// 暗黑模式切换按钮
const ThemeToggle = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-left: 15px;
    backdrop-filter: blur(5px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

// 侧边栏
const Sidebar = styled.aside.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    width: 180px;
    background: ${({isDarkMode}) => (isDarkMode ? '#1e1b4b' : 'rgba(255, 255, 255, 0.9)')};
    border-right: ${({isDarkMode}) => (isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb')};
    padding-top: 80px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 90;
`;

// 侧边栏菜单
const SidebarMenu = styled.ul.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

// 侧边栏菜单项
const SidebarItem = styled.li.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'isActive'
})<{ isActive: boolean; isDarkMode: boolean }>`
    button {
        width: 100%;
        padding: 15px 20px;
        text-align: left;
        background: ${({isActive, isDarkMode}) =>
                isActive
                        ? (isDarkMode ? '#312e81' : '#f3f4f6')
                        : 'transparent'
        };
        border: none;
        color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#374151')};
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 10px;

        &:hover {
            background: ${({isDarkMode}) => (isDarkMode ? '#2d2b55' : '#f9fafb')};
        }
    }
`;

// 主内容区
const MainContent = styled.main.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'loading',
})<{ isDarkMode: boolean, loading: boolean }>`
    margin-top: 60px;
    margin-left: 180px;
    padding: 30px;
    flex: 1;
    background: ${({isDarkMode}) => (isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)')};
    backdrop-filter: blur(10px);
    min-height: 100vh;
    position: relative;

    /* Loading 遮罩 */
    ${({loading, isDarkMode}) => loading && css`
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: ${(isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)')};
            backdrop-filter: blur(2px);
            z-index: 10;
        }
    `} /* Loading 图标 */ ${({loading, isDarkMode}) => loading && css`
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 4px solid ${(isDarkMode ? '#312e81' : '#e5e7eb')};
            border-top-color: #6366f1;
            border-radius: 50%;
            animation: ${spinLoading} 1s linear infinite;
            z-index: 11;
        }
    `}
`;

// 筛选框
const FilterBar = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    background: ${({isDarkMode}) => (isDarkMode ? '#1e1b4b' : 'rgba(255, 255, 255, 0.9)')};
    border: ${({isDarkMode}) => (isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb')};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

// 筛选标签
const FilterLabel = styled.label.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    font-size: 14px;
    color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#374151')};
`;

// 日期输入框
const DateInput = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    padding: 6px 12px;
    border: ${({isDarkMode}) => (isDarkMode ? '1px solid #475569' : '1px solid #d1d5db')};
    border-radius: 6px;
    background: ${({isDarkMode}) => (isDarkMode ? '#0f172a' : '#fff')};
    color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#111827')};
    font-size: 14px;
`;

// 分类选择器
const Select = styled.select.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    padding: 8px 12px;
    border: ${({isDarkMode}) => (isDarkMode ? '1px solid #475569' : '1px solid #d1d5db')};
    border-radius: 6px;
    background: ${({isDarkMode}) => (isDarkMode ? '#0f172a' : '#fff')};
    color: ${({isDarkMode}) => (isDarkMode ? '#f9fafb' : '#111827')};
    font-size: 14px;
    cursor: pointer;
`;

// 课程卡片容器
const LessonsGrid = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

// 课程卡片
const LessonCard = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    background: ${({isDarkMode}) => (isDarkMode ? '#1e1b4b' : 'rgba(255, 255, 255, 0.9)')};
    border: ${({isDarkMode}) => (isDarkMode ? '1px solid #312e81' : '1px solid #e5e7eb')};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 280px;
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;
`;

const LessonCardInfoContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const StudentItem = styled.i.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode' && prop !== 'isMine'
})<{ isDarkMode: boolean, isMine: boolean }>`
    color: ${({isDarkMode, isMine}) => (isMine ? 'red' : isDarkMode ? '#f9fafb' : '#111827')};
    font-size: 14px;
    cursor: pointer;
    margin-right: 9px;
    text-decoration: underline;
`

// 卡片信息项
const CardInfo = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    margin-bottom: 15px;
    font-size: 14px;

    span {
        font-weight: 500;
        color: ${({isDarkMode}) => (isDarkMode ? '#c7d2fe' : '#6366f1')};
    }
`;

// 参与课程按钮
const JoinBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== 'isDarkMode'
})<{ isDarkMode: boolean }>`
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 6px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
    }
`;
import {getLessons, LessonDataItem} from "@/src/request/fetchData";
import useMessage from "@/src/components/Message";

// -------------------------- Dashboard 页面 --------------------------
export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('today');
    const router = useRouter();
    const {username, logout, isLoggedIn, isDarkerMode: isDarkMode, setDarkerMode, hydrated} = useAppBaseState();
    const [loading, setLoading] = useState(false);
    const [currentData, setCurrentData] = useState<LessonDataItem[]>([]);
    const message = useMessage();
    const isFirstFetchDone = useRef(false)
    const msgRef = useRef(message);

    useEffect(() => {
        msgRef.current = message
    }, [message]);
    
    const showError = useCallback((text: string) => {
        msgRef.current.error(text);
    }, [])

    const getData = useCallback(async () => {
        if (isFirstFetchDone.current) return;
        try {
            setLoading(true);
            const data = await getLessons({})
            setCurrentData(data)
            isFirstFetchDone.current = true;
        } catch {
            showError(`Error here`)
        } finally {
            setLoading(false);
        }
    }, [showError])

    // 未登录重定向到登录页
    useEffect(() => {
        if (!hydrated) {
            setLoading(true);
            return
        }
        setLoading(false)
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }
        if (!isFirstFetchDone.current)
            getData().then()
    }, [isLoggedIn, router, hydrated, getData]);

    // 切换暗黑模式
    const toggleDarkMode = useCallback(() => {
        const newMode = !isDarkMode;
        setDarkerMode(newMode);
    }, [isDarkMode, setDarkerMode]);

    // 处理登出
    const handleLogout = useCallback(async () => {
        createDialog({
            title: "Confirm Logout",
            content: "Are you sure you want to log out?",
            isDarkMode,
            confirmText: "Logout",
            cancelText: "Cancel",
            async onConfirm() {
                const isLogoutDone = await logout();
                if (isLogoutDone) {
                    router.push('/login');
                } else {

                }
            }
        })
    }, [isDarkMode, logout, router]);

    // 侧边栏菜单数据
    const sidebarTabs = useMemo(() => [
        {key: 'historic', label: 'Historic Lessons (completed)'},
        {key: 'upcoming', label: 'Upcoming Lessons'},
        {key: 'available', label: 'Available Lessons (open slots)'},
        {key: 'today', label: 'Today’s Lessons'},
    ], []);

    return (
        <>
            <GlobalStyles/>
            <DashboardContainer isDarkMode={isDarkMode}>
                {/* 顶部 AppBar */}
                <AppBar isDarkMode={isDarkMode}>
                    <AppTitle>Tutor Dashboard</AppTitle>
                    <UserArea>
                        <Username isDarkMode={isDarkMode}>{username}</Username>
                        <LogoutBtn isDarkMode={isDarkMode} onClick={handleLogout}>
                            Logout
                        </LogoutBtn>
                        <ThemeToggle onClick={toggleDarkMode}>
                            {!isDarkMode ? '☀️' : '🌙'}
                        </ThemeToggle>
                    </UserArea>
                </AppBar>

                {/* 侧边栏 */}
                <Sidebar isDarkMode={isDarkMode}>
                    <SidebarMenu>
                        {sidebarTabs.map((tab) => (
                            <SidebarItem
                                key={tab.key}
                                isActive={activeTab === tab.key}
                                isDarkMode={isDarkMode}
                            >
                                <button onClick={() => setActiveTab(tab.key)}>
                                    {tab.label}
                                </button>
                            </SidebarItem>
                        ))}
                    </SidebarMenu>
                </Sidebar>

                {/* 主内容区 */}
                <MainContent isDarkMode={isDarkMode} loading={loading}>
                    {/* 筛选框 */}
                    <FilterBar isDarkMode={isDarkMode}>
                        <FilterLabel isDarkMode={isDarkMode}>Date Range：</FilterLabel>
                        <DateInput type="date" isDarkMode={isDarkMode}/>
                        <DateInput type="date" isDarkMode={isDarkMode}/>

                    </FilterBar>

                    {/* 课程卡片容器 */}
                    <LessonsGrid>
                        {currentData.map((lesson, index) => (
                            <LessonCard key={index} isDarkMode={isDarkMode}>
                                <LessonCardInfoContainer>
                                    <CardInfo isDarkMode={isDarkMode}>
                                        <span>Date：</span> {lesson.date.split('T')[0]}
                                    </CardInfo>
                                    <CardInfo isDarkMode={isDarkMode}>
                                        <span>Time：</span> {lesson.date.split('T')[1].slice(0, -1)}
                                    </CardInfo>
                                    <CardInfo isDarkMode={isDarkMode}>
                                        <span>Students：</span> {lesson.students.map((item, index) =>
                                        (
                                            <StudentItem isDarkMode={isDarkMode} isMine={item === username}
                                                         key={index}>{item}{item === username ? '(me)' : ''}</StudentItem>
                                        ))}
                                    </CardInfo>
                                    <CardInfo isDarkMode={isDarkMode}>
                                        <span>Subject：</span> {lesson.subject}
                                    </CardInfo>
                                    <CardInfo isDarkMode={isDarkMode}>
                                        <span>Type：</span> {lesson.type}
                                    </CardInfo>
                                </LessonCardInfoContainer>
                                <JoinBtn isDarkMode={isDarkMode}>Take Lesson</JoinBtn>
                            </LessonCard>
                        ))}
                    </LessonsGrid>
                </MainContent>
            </DashboardContainer>
        </>
    );
}