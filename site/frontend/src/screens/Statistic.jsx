import Footer from "../layouts/Footer.jsx";
import RoleHeader from "../components/RoleHeader/RoleHeader.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider.js";
import { useNavigate, useParams } from "react-router";
import { statisticServiceApi } from "../utils/api/statistic_service.js";
import { Helmet } from 'react-helmet';
import ROUTES from "../constants/routes";

function Statistic() {
    const { token, logout, role } = useContext(AuthContext);
    const [stats, setStats] = useState([]);             // общий массив
    const [orgs, setOrgs] = useState([]);
    const [selectedOrg, setSelectedOrg] = useState("");
    const [type, setType] = useState("all");
    const { taskId } = useParams();
    const nav = useNavigate();

    useEffect(() => {
        statisticServiceApi.getUserOrganizations(token, logout)
            .then(r => setOrgs(r.data || []))
            .catch(() => nav(ROUTES.ERROR));
    }, [token]);

    useEffect(() => {
        if (type === "all") {
            statisticServiceApi.getAllStatistic(token, taskId, logout)
                .then(r => setStats(r.data.stats || []))
                .catch(() => nav(ROUTES.ERROR));
        } else if (type === "organization") {
            if (role === "organization") {
                statisticServiceApi.getMyOrganizationStatistics(token, logout)
                    .then(r => setStats(r.data.stats || []))
                    .catch(() => nav(ROUTES.ERROR));
            } else if (selectedOrg)
            {
                statisticServiceApi.getOrganizationStatistics(token, selectedOrg, logout)
                    .then(r => setStats(r.data.stats || []))
                    .catch(() => nav(ROUTES.ERROR));
            }
        }
    }, [type, selectedOrg, token, taskId]);

    return (
        <div className="min-h-screen flex flex-col">
            <RoleHeader />
            <Helmet><title>Статистика</title></Helmet>
            <main className="flex-1 p-5">
                <div className="mb-4 flex space-x-4">
                    <select
                        value={type}
                        onChange={e => { setType(e.target.value); setStats([]); }}
                        className="p-2 border rounded-md"
                    >
                        <option value="all">Вся статистика</option>
                        <option value="organization">По организации</option>
                    </select>

                    {type === "organization" && role !== "organization" && (
                        <select
                            value={selectedOrg}
                            onChange={e => setSelectedOrg(e.target.value)}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Выберите организацию</option>
                            {orgs.map(o => (
                                <option key={o.id} value={o.id}>{o.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="overflow-x-auto shadow-md rounded-lg">
                    {stats.length>0 ? (
                        <table className="min-w-full table-auto bg-white">
                            <thead className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Место</th>
                                <th className="px-6 py-3 text-left">Имя Фамилия</th>
                                <th className="px-6 py-3 text-left">Очки</th>
                                <th className="px-6 py-3 text-left">Задач</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {stats.map((u, i) => (
                                <tr key={i} className={`border-t hover:bg-red-100 ${i%2? "bg-red-50": "bg-white"}`}>
                                    <td className="px-6 py-4">{u.rank}</td>
                                    <td className="px-6 py-4">{u.user_name} {u.user_surname}</td>
                                    <td className="px-6 py-4">{u.score}</td>
                                    <td className="px-6 py-4">{u.tasks_count}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-4 text-center text-gray-500">Нет данных для отображения</div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Statistic;
