import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import {Check, Flag} from "lucide-react";
import {WindowControls} from "#components/index.js";

const Terminal = () => {
    return (
        <>
            <div id="window-header">
               <WindowControls target="terminal"/>
                <h2>Tech Stacks</h2>
            </div>
            <div className="techstack">

                <div className="label">
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content">
                    {techStack.map(({ category, items }) => (
                        <li key={category} className="flex items-center">
                            <Check className="check" size={20} />
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, i) => (
                                    <li key={i}>
                                        {item} {i < items.length - 1 ? "," : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                     <div className="footnote">
                       <p><Check className="check" size={20} /> 5 of 5 tech stack loaded successfully </p>
                      <p className="text-black"> <Flag size={15} fill="black"/> Render time: 6 ms</p>
                     </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;




