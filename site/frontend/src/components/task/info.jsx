import Comments from "./comments";
import MapComponent from "./MapComponent";

function Info({ task, imageUrl }) {
    const location = task.location;
    const [latitude, longitude] = location.split(",").map((coord) => parseFloat(coord.trim()));
    return (
        <div className="col-span-2">
            <div id="task-header" className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-3xl mb-4">{task.name}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                                alt="humanitarian organization logo with volunteers in red and white colors"
                            />
                        ) : (
                            <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500 text-xs">
                                    {task.organization_name?.charAt(0) || 'A'}
                                </span>
                            </div>
                        )}
                        <span className="text-neutral-900 hover:underline cursor-pointer text-sm md:text-base">
                            {task.organization_name}
                        </span>
                    </div>
                    <span className="text-neutral-500 hidden md:block">•</span>
                    <span className="text-neutral-600 text-sm md:text-base">
                        {new Date(task.task_date + 'Z').toLocaleString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>
            <div id="task-description" className="prose max-w-none mb-6 md:mb-8">
                <p className="text-neutral-700 text-sm md:text-base">{task.description}</p>
            </div>
            <div id="task-location" className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl mb-4">Местоположение</h2>
                <div className="w-full h-[200px] md:h-[300px] bg-neutral-200 rounded-lg flex items-center justify-center">
                    <MapComponent latitude={latitude} longitude={longitude} />
                </div>
            </div>
            <div className="mt-20">
                <Comments task={task} />
            </div>
        </div>
    );
}

export default Info;
