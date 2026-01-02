'use client'
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {MSWProvider} from "@/src/components/MSWProvider";
import {usePathname} from "next/navigation";
import AnimatedContent from "@/src/components/AnimationContent";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>Tutor Dashboard</title>
            <meta name={"description"} content={"Tutor Dashboard, take lessons and have fun!"}/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <AnimatedContent keyValue={pathname}><MSWProvider></MSWProvider>
            {children}</AnimatedContent>
        </body>
        </html>
    );
}
