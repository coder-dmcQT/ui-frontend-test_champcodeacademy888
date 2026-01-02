'use client';
import {LessonDataItem} from "@/src/mock/data";

// 数据库配置
const DB_NAME = 'TutorDashboardDB';
const DB_VERSION = 1;
const STORE_NAME = 'lessons';

let db: IDBDatabase | null = null;

// 打开/创建数据库
const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        // 数据库升级（首次创建）
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            // 创建 lessons 存储库，主键为 id
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject(`IndexedDB 打开失败: ${(event.target as IDBOpenDBRequest).error}`);
        };
    });
};

// 初始化数据：无数据则写入默认值
export const initLessonsData = async (defaultData: LessonDataItem[]) => {
    if (db === null) {
        db = await openDB();
    }
    return new Promise<void>((resolve, reject) => {
        const transaction = db!.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = async () => {
            const existingData = request.result as LessonDataItem[];
            // 无数据则写入默认值
            if (existingData.length === 0) {
                const writeTx = db!.transaction(STORE_NAME, 'readwrite');
                const writeStore = writeTx.objectStore(STORE_NAME);
                defaultData.forEach(item => writeStore.put(item));

                writeTx.oncomplete = () => {
                    resolve();
                };
                writeTx.onerror = (e) => reject(e);
            } else {
                resolve();
            }
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};

// 获取所有课程数据
export const getLessonsFromDB = async (): Promise<LessonDataItem[]> => {
    if (db === null) {
        db = await openDB();
    }
    return new Promise((resolve, reject) => {
        const transaction = db!.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result as LessonDataItem[]);
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};

// 更新单条课程数据
export const updateLessonInDB = async (lesson: LessonDataItem): Promise<void> => {
    if (!db) {
        db = await openDB();
    }
    return new Promise((resolve, reject) => {
        const transaction = db!.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(lesson); // 根据 id 覆盖更新

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};
