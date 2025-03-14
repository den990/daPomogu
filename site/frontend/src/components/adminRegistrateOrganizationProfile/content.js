import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { userServiceApi } from "../../utils/api/user_service";

function Content() {
    const { token } = useContext(AuthContext);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [organizationDetails, setOrganizationDetails] = useState(null);

    useEffect(() => {
        if (token) {
            userServiceApi.getOrganizationRequests(token)
            .then(data => {
                setOrganizations(data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке организаций:', error);
            });
        }
    }, [token]);

    const handleOrganizationSelect = (id) => {
        setSelectedOrganization(id);

        if (token) {
            userServiceApi.getOrganizationProfileInfo(token, id)
            .then(data => {
              setOrganizationDetails(data);
            })
            .catch(error => {
              console.error('Ошибка при загрузке данных организации:', error);
            });
        }
      };

    return (
        <main id="main-content" className="container ml-64 px-4 py-6">
            <div className="grid grid-cols-12 gap-6">
                <div id="applications-list" className="col-span-4 rounded-lg border bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg">Заявки</h2>
                    </div>
                    <div className="space-y-3">
                        {organizations.map((organization) => (
                        <div 
                        key={organization.id} 
                        className="cursor-pointer rounded-lg border p-3 hover:bg-neutral-50"
                        onClick={() => handleOrganizationSelect(organization.id)}
                        >
                            <div className="flex items-center gap-3">
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2`} className="h-10 w-10 rounded-full" alt="user-photo" />
                                <div>
                                    <p>{organization.name}</p>
                                    <p className="text-sm text-neutral-600">{organization.date || "Не указано"}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div id="application-details" className="col-span-8 rounded-lg border bg-white p-6">
                {organizationDetails ? (
                    <>
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&amp;seed=2" className="h-16 w-16 rounded-full" alt="user-photo" />
                            <div>
                                <h2 className="text-xl">{organizationDetails.name}</h2>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="rounded-lg border bg-red-600 px-4 py-2 text-white hover:bg-red-800">Принять</button>
                            <button className="rounded-lg border px-4 py-2 text-neutral-700 hover:bg-neutral-50">Отклонить</button>
                        </div>
                    </div>
                    <div className="full-w">
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3">Данные организации</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-neutral-600">Юридическое название</p>
                                    <p>{organizationDetails.name || "Не указано"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Email</p>
                                    <p>{organizationDetails.email || "Не указано"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Телефон</p>
                                    <p>{organizationDetails.phone || "Не указано"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">ИНН</p>
                                    <p>{organizationDetails.inn || "Не указано"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Юридический адрес</p>
                                    <p>Юридический адрес</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Фактический адрес</p>
                                    <p>{organizationDetails.address || "Не указано"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Руководитель организации</p>
                                    <p>{organizationDetails.full_name_owner || "Не указано"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ) : (
                    <p>Выберите организацию, чтобы увидеть подробности.</p>
                )}
                </div>
            </div>
        </main>
    );
}

export default Content;