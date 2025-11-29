import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const renderText = (text, className, fontFamily, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={`${className} ${fontFamily}`}
            style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
        >
      {char === "-" ? "\u00A0" : char}
    </span>
    ));
};

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const setUpTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `"wght" ${weight}`,
        });
    };

    const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const center = l - rect.left + w / 2;
            const distance = Math.abs(mouseX - center);

            // Smooth Gaussian effect
            const intensity = Math.exp(-(distance ** 2) / 20000);
            const weight = min + (max - min) * intensity;

            animateLetter(letter, weight);
        });
    };

    const resetWeights = () => {
        letters.forEach((letter) => animateLetter(letter, base));
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", resetWeights);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", resetWeights);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const subtitleCleanup = setUpTextHover(subtitleRef.current, "subtitle");
        const titleCleanup = setUpTextHover(titleRef.current, "title");

        return () => {
            subtitleCleanup();
            titleCleanup();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef} >
                 {renderText("Hey,I'm Rushikesh Welcome to my ", "text-4xl", "font-georama", 100)}
            </p>
            <h1 ref={titleRef} className="mt-7 ">
                {renderText("portfolio", "text-7xl italic", "font-georama")}
            </h1>
            <div className="small-screen">
                <p>This Portfolio is designed for Desktop/Tablet Screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;

