import React from 'react'
import {locations} from "#constants";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const projects= locations?.work?.children ?? []
const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    // FIX: pass the clicked project
    const handleProjectFinder = (project) => {
        setActiveLocation(project);     // set Finder to open inside this folder
        openWindow("finder");           // open Finder window
    };

    // Draggable icons
    useGSAP(() => {
        Draggable.create(".folder");
    }, []);
    return (
        <section id="home">
          <ul>
              {projects.map((project)=>(
                  <li key={project.id}                         className={clsx("group folder", project.windowPosition)}

                      onClick={() => handleProjectFinder(project)} // PASS PROJECT HERE

                  >
                      <img src="/images/folder.png" />
                      <p>{project.name}</p>

                  </li>
              ))}
          </ul>

        </section>
    )
}
export default Home
