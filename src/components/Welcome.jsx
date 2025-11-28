import React, {useRef} from 'react'
import  gsap from "gsap";
import {useGSAP} from "@gsap/react";
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
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const center = l - left + w / 2;
            const distance = Math.abs(mouseX - center);

            // Gaussian falloff — same effect as the video
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
    return()=>{
        container.removeEventListener("mousemove," ,handleMouseMove)
        container.removeEventListener("mouseleave," ,resetWeights)
    }
};

const Welcome = () => {
    const titleRef=useRef(null)
    const subtitleRef=useRef(null)
    useGSAP(()=>{
    const subtitleCleanUp=   setUpTextHover(subtitleRef.current, 'subtitle')
        const titleCleanUp=    setUpTextHover(titleRef.current , 'title')

        return ()=>{
       subtitleCleanUp()
            titleCleanUp()
        }
    },[])
    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText(`Hey 👋, I'm Rushikesh Avachat `, `text-3xl`, `font-georama`, 100)}
            </p>

            <h1 ref={titleRef} className=" mt-7">
                { renderText(" Portfolio", " text-9xl italic font-georama ")}</h1>
            <div className="small-screen">
                <p> This Portfolio is designed for Desktop/Tablet Screens only.</p>
            </div>
        </section>
    )
}
export default Welcome
