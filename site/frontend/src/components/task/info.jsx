import Comments from "./comments";

function Info({ task }) {
    return (
        <div className="col-span-2">
            <div id="task-header" className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-3xl mb-4">{task.name}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=456"
                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                            alt="organization"
                        />
                        <span className="text-neutral-900 hover:underline cursor-pointer text-sm md:text-base">
                            {task.organization_name}
                        </span>
                    </div>
                    <span className="text-neutral-500 hidden md:block">•</span>
                    <span className="text-neutral-600 text-sm md:text-base">
                        {new Date(task.task_date).toLocaleString("ru-RU", {
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
                    <span className="text-neutral-600">Карта местоположения</span>
                </div>
            </div>

            <Comments taskId={task.id} />
        </div>
    );
}

export default Info;
