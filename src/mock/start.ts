'use client'
import {setupWorker} from "msw/browser";
import {handlers} from "@/src/mock/handlers";

export const worker = setupWorker(...handlers);

export const start = async () => {
    try {
        await worker.start({
            onUnhandledRequest: 'bypass'
        });
        console.log('mock started done!')
    } catch (e) {
        console.log('error is here ', e)
    }
}