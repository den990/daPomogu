
function mission()
{
    return (
        <section id="mission" className="pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Наша миссия</h1>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-gray-600 mb-8">Мы стремимся объединить волонтеров и организации, создавая эффективную платформу для совместной работы и помощи обществу. Наша цель - сделать волонтерство доступным и организованным для всех.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 bg-red-50 rounded-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <img style={{ width: 30, height: 30 }} src={require("../../images/heart_red.svg").default} alt="heart" />
                            <h3 className="text-xl font-semibold mb-2">Помощь</h3>
                            <p className="text-gray-600">Содействие в реализации социально значимых проектов</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <img style={{ width: 30, height: 30 }} src={require("../../images/members.svg").default} alt="members" />
                            <h3 className="text-xl font-semibold mb-2">Сообщество</h3>
                            <p className="text-gray-600">Объединение активных и неравнодушных людей</p>
                        </div>
                        <div className="p-6 bg-red-50 rounded-xl" style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <img style={{ width: 30, height: 30 }} src={require("../../images/graphic_red.svg").default} alt="graphic" />
                            <h3 className="text-xl font-semibold mb-2">Развитие</h3>
                            <p className="text-gray-600">Постоянное совершенствование волонтерской деятельности</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default mission;