import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

function Stats() {
    const { profile } = useContext(AuthContext);

    return (
        <section id="statistics" className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Статистика и отчеты</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    id="stat-1"
                    className="border border-gray-200 rounded-lg p-6 text-center"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <img
                        style={{ width: 30, height: 30 }}
                        src={require("../../images/stats_red.svg").default}
                        alt="stats"
                    />
                    <h4 className="font-semibold text-gray-900">Выполнено заданий</h4>
                    <p className="text-2xl font-bold text-red-600 mt-2">{profile.count_finished_tasks}</p>
                </div>
                <div
                    id="stat-2"
                    className="border border-gray-200 rounded-lg p-6 text-center"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <img
                        style={{ width: 38, height: 30 }}
                        src={require("../../images/people_red.svg").default}
                        alt="people"
                    />
                    <h4 className="font-semibold text-gray-900">Активных волонтеров</h4>
                    <p className="text-2xl font-bold text-red-600 mt-2">{profile.count_volunteers}</p>
                </div>
                <div
                    id="stat-3"
                    className="border border-gray-200 rounded-lg p-6 text-center"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                    <img
                        style={{ width: 30, height: 36 }}
                        src={require("../../images/clock_red.svg").default}
                        alt="clock"
                    />
                    <h4 className="font-semibold text-gray-900">Дней волонтерства</h4>
                    <p className="text-2xl font-bold text-red-600 mt-2">{profile.count_days}</p>
                </div>
            </div>
        </section>
    );
}

export default Stats;
