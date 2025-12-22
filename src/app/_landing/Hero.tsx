"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Hero() {
    const NavbarHeight = 96;
    const router = useRouter();

    const handleStartTest = () => {
        router.push('/mic-test'); 
    };

    const handleHowItWorks = () => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-8" style={{ paddingTop: `${NavbarHeight}px` }}>
            <div className="max-w-4xl text-center">
                <span className="inline-block mb-4 rounded-full bg-white/10 px-4 py-1 text-sm text-gray-300">
                    🎧 Simple & Fast Microphone Check
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
                    Test Your Microphone
                    <span className="block text-blue-400">In Seconds</span>
                </h1>

                <p className="max-w-[600px] font-medium mx-auto text-[18px] mb-8 text-[#9E9E9E]">
                    Instantly check if your microphone is working properly.
                    No downloads, no sign-ups, just real-time audio input testing
                    directly in your browser.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="px-8 py-3 text-[18px]" variant="primary" onClick={handleStartTest}>🎙 Start Mic Test</Button>
                    <Button className="px-8 py-3 text-[18px]" variant="secondary" onClick={handleHowItWorks}>How it Works</Button>
                </div>
            </div>
        </section>
    )
}