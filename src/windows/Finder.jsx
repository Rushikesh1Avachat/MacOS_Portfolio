import React from "react";
import { WindowControls } from "#components";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";



const Finder = () => {
    const { openWindow } = useWindowStore();

    const { activeLocation, setActiveLocation } = useLocationStore();

// if(item.fileType === "pdf") return openWindow('resume')
// if(item.kind === "folder") return  setActiveLocation(item);
//     if (["fig", "url"].includes(item.fileType) && item.href)
//         return window.open(item.href, "_blank")
// }
    const openItem = (item) => {
        // 1) Folder → open folder
        if (item.kind === "folder") {
            return setActiveLocation(item);
        }

        // 2) PDF → open resume window
        if (item.fileType === "pdf") {
            return openWindow("resume", item);
        }

        // 3) Figma / URL → open in browser
        if (["fig", "url"].includes(item.fileType) && item.href) {
            return window.open(item.href, "_blank");
        }

        // 4) Text File → open text window
        if (item.fileType === "txt") {
            return openWindow("txtfile", item);
        }
        if (item.fileType === "img")
            return openWindow("imgfile", item);

    };

    // Renders a section (title + items)
    const renderList = (title, items) => (
        <div className="sidebar-section">
            <h3 className="sidebar-title">{title}</h3>

            <ul className="sidebar-items">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={clsx( item.id === activeLocation.id ? "active" : "non-active")}
                        onClick={() => setActiveLocation(item)}
                    >
                        {/* Show icon */}
                        <img
                            src={item.icon}
                            alt={item.name}
                            className="w-4 "
                        />

                        {/* Show name */}
                        <p className="text-sm truncate">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                {/* Sidebar */}
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    {renderList("My Projects", locations.work.children)}
                </div>
                <ul className="content">
                    {activeLocation?.children.map((item)=>(
                        <li key={item.id} className={item.position} onClick={()=> openItem(item)}>
                            <img src={item.icon} alt={item.name}  />
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow

