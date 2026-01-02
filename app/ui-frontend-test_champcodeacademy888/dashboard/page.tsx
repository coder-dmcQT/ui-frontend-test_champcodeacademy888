'use client'
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./component/DashboardPage"), {
    ssr: false
})

export default function DashboardPage() {
    return (
        <NoSSR />
    )
}