import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { userServiceApi } from "../../utils/api/user_service";

function Content({ isSidebarOpen, setIsSidebarOpen }) {
    const { token } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [organizationDetails, setOrganizationDetails] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)

    const fetchOrganizations = useCallback(() => {
        if (token) {
            userServiceApi
                .getOrganizationRequests(token)
                .then((data) => {
                    setOrganizations(data || []);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке организаций:", error);
                    setOrganizations([]);
                });

            userServiceApi.getAvatarByID(1)
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            })
            .catch(() => {
                console.log({ message: "Ошибка при загрузке фото пользователя", severity: "error" });
            });
        }
    }, [token]);

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    const handleOrganizationSelect = (id) => {
        setSelectedOrganization(id);

        if (token) {
            userServiceApi
                .getOrganizationProfileById(id)
                .then((data) => {
                    setOrganizationDetails(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Ошибка при загрузке данных организации:", error);
                });
        }
    };

    const handleApplyOrganization = (id) => {
        if (token) {
            userServiceApi
                .putApplyOrganization(token, id)
                .then(() => {
                    fetchOrganizations();
                    setOrganizationDetails(null);
                    setSelectedOrganization(null);
                })
                .catch((error) => {
                    console.error("Ошибка при регистрации организации:", error);
                });
        }
    };

    const handleRejectOrganization = (id) => {
        if (token) {
            userServiceApi
                .putRejectOrganization(token, id)
                .then(() => {
                    fetchOrganizations();
                    setOrganizationDetails(null);
                    setSelectedOrganization(null);
                })
                .catch((error) => {
                    console.error("Ошибка при регистрации организации:", error);
                });
        }
    };

    return (
        <main className={`flex-1 transition-all duration-300 min-w-0 ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}`}>
            <div className="container mx-auto px-4 py-4 md:py-6">
                {/* Мобильная кнопка сайдбара */}
                <div className="md:hidden mb-4 flex justify-end">
                    <button
                        onClick={setIsSidebarOpen}
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                        aria-label="Открыть меню"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                    <div className="md:col-span-4 order-1">
                        <div className="rounded-lg border bg-white p-3 md:p-4">
                            <div className="mb-3 md:mb-4">
                                <h2 className="text-base md:text-lg font-medium">Заявки</h2>
                            </div>
                            <div className="space-y-2 md:space-y-3 max-h-[600px] overflow-y-auto">
                                {organizations.map((organization) => (
                                    <div
                                        key={organization.id}
                                        className="cursor-pointer rounded-lg border p-2 md:p-3 hover:bg-neutral-50 transition-colors"
                                        onClick={() => handleOrganizationSelect(organization.id)}
                                    >
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <img
                                                src={imageUrl}
                                                className="h-8 w-8 md:h-10 md:w-10 rounded-full flex-shrink-0"
                                                alt={organization.name}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm md:text-base truncate font-medium">
                                                    {organization.name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-8 order-2">
                        <div className="rounded-lg border bg-white p-4 md:p-6">
                            {organizationDetails ? (
                                <>
                                    <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                                        <div className="flex items-center gap-3 md:gap-4">
                                            <img
                                                src={imageUrl}
                                                className="h-12 w-12 md:h-16 md:w-16 rounded-full"
                                                alt="Логотип организации"
                                            />
                                            <h2 className="text-lg md:text-xl truncate">{organizationDetails.name}</h2>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto py-2">
                                            <button
                                                className="w-full md:w-auto rounded-lg bg-red-600 text-white px-4 py-2 hover:bg-red-800 text-sm md:text-base"
                                                onClick={() => handleApplyOrganization(selectedOrganization)}
                                            >
                                                Принять
                                            </button>
                                            <button
                                                className="w-full md:w-auto rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50 text-sm md:text-base"
                                                onClick={() => handleRejectOrganization(selectedOrganization)}
                                            >
                                                Отклонить
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-lg border p-4">
                                            <h3 className="text-lg font-medium mb-3">Данные организации</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {[
                                                    { label: "Юридическое название", value: organizationDetails.name },
                                                    { label: "Email", value: organizationDetails.email },
                                                    { label: "Телефон", value: organizationDetails.phone },
                                                    { label: "ИНН", value: organizationDetails.inn },
                                                    {
                                                        label: "Юридический адрес",
                                                        value: organizationDetails.legal_address,
                                                    },
                                                    {
                                                        label: "Фактический адрес",
                                                        value: organizationDetails.actual_address,
                                                    },
                                                    {
                                                        label: "Руководитель",
                                                        value: organizationDetails.full_name_owner,
                                                    },
                                                ].map((item, index) => (
                                                    <div key={index} className="break-words">
                                                        <p className="text-sm text-neutral-600 mb-1">{item.label}</p>
                                                        <p className="text-base truncate">
                                                            {item.value || "Не указано"}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4 md:p-6 text-neutral-500 text-sm md:text-base">
                                    Выберите организацию, чтобы увидеть подробности
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Content;
