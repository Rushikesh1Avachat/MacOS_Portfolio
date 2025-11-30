import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";

const Photos = () => {
    const { openWindow } = useWindowStore();

    return (
        <>
            <div id="window-header">
                <WindowControls target="photos" />
                <div className="w-full flex justify-end items-center gap-3 text-gray-500">
                    <Mail className="icon" />
                    <Search className="icon" />
                </div>
            </div>

            <div className="flex w-full h-full">
                {/* Sidebar on left */}
                <div className="sidebar w-1/4 p-4 border-r border-gray-200">
                    <h2>Photos</h2>
                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li key={id} className="flex items-center gap-2 cursor-pointer mb-2">
                                <img src={icon} alt={title} className="w-6 h-6" />
                                <p>{title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Gallery on right */}
                <div className="gallery w-3/4 p-4 flex flex-wrap gap-4 overflow-auto">
                    {gallery.map(({ id, img }) => (
                        <div
                            key={id}
                            onClick={() =>
                                openWindow("imgfile", {
                                    id,
                                    name: "Gallery Image",
                                    icon: "/images/image.png",
                                    kind: "file",
                                    fileType: "img",
                                    imageUrl: img,
                                })
                            }
                            className="w-32 h-32 cursor-pointer overflow-hidden rounded-lg shadow hover:scale-105 transition-transform"
                        >
                            <img
                                src={img}
                                alt={`Gallery image ${id}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;





