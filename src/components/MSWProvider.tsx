'use client'
import {FC, useEffect} from "react";
import {start} from "@/src/mock/start";

export const MSWProvider: FC = () => {
    useEffect(() => {
        start().then()
    }, []);
    return null
}