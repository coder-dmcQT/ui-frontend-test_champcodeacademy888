'use client'
import {setupWorker} from "msw/browser";
import {handlers} from "@/src/mock/handlers";
import {initLessonsData} from "@/src/mock/idbHandles";
import {lessonsDataMocked} from "@/src/mock/data";
import nextConfig from "../../next.config"

export const start = async () => {
    const worker = setupWorker(...handlers);
    try {
        console.log('nextcon', nextConfig);
        await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                url: "/ui-frontend-test_champcodeacademy888/mockServiceWorker.js"
            }
        });
        await initLessonsData(lessonsDataMocked)
        console.log('mock started done!')
    } catch (e) {
        console.log('error is here ', e)
    }
}