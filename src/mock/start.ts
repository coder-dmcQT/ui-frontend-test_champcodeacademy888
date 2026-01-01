'use client'
import {setupWorker} from "msw/browser";
import {handlers} from "@/src/mock/handlers";

export const start = async () => {
    const worker = setupWorker(...handlers);
    try {
        await worker.start({
            onUnhandledRequest: 'bypass'
        });
        console.log('mock started done!')
    } catch (e) {
        console.log('error is here ', e)
    }
}