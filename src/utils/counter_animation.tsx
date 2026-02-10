import { animate, KeyframeOptions, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

interface CounterAnimationProps {
    from: number;
    to: number;
    animateOptions?: KeyframeOptions;
    suffix?: string;
}
export const CounterAnimation = ({ from, to, animateOptions, suffix = "" }: CounterAnimationProps) => {
    const counterRef = useRef<HTMLSpanElement>(null);
    const inview = useInView(counterRef, { once: true });

    useIsomorphicLayoutEffect(() => {
        const element = counterRef.current;
        if (!element) return;
        if (!inview) return;

        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = `${to}${suffix}`;
            return;
        }

        element.textContent = `${from}${suffix}`;

        const controls = animate(from, to, {
            duration: 1.5,
            ease: "easeOut",
            ...animateOptions,
            onUpdate(value) {
                element.textContent = `${value.toFixed(0)}${suffix}`;
            },
        });

        return () => {
            controls.stop();
        };
    }, [counterRef, from, to, inview]);

    return <span ref={counterRef} />;
};
