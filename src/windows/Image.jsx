import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import useWindowStore from "#store/window.js";

const ImageFile = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            {/* Header */}
            <div id="window-header">
                <WindowControls target="imgfile" />
                <h2>{name}</h2>
            </div>

            {/* Content */}
            <div className="p-5 bg-white">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className=" w-full h-auto max-h-[70vh] object-contain rounded"
                    />
                ) : null}
            </div>

        </>
    );
};

// Wrap with WindowWrapper (window id = imgfile)
const ImageWindow = WindowWrapper(ImageFile, "imgfile");

export default ImageWindow;
