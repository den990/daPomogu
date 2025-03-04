
function description() {
    return (
        <div className="lg:col-span-2">
            <section id="task-info" className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Помощь в организации благотворительного марафона</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-6">
                    <span className="flex items-center">
                        <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-calendar" aria-hidden="true" focusable="false" data-prefix="far" data-icon="calendar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"></path></svg></i>
                        15 марта 2025
                    </span>
                    <span className="flex items-center">
                        <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-clock" aria-hidden="true" focusable="false" data-prefix="far" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
                        10:00 - 18:00
                    </span>
                </div>
                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">Требуются волонтеры для помощи в организации благотворительного марафона в поддержку детского дома. Задачи включают регистрацию участников, раздачу воды, координацию на маршруте и помощь в организации питания после забега.</p>
                    <h3 className="text-xl font-semibold mb-3">Требования:</h3>
                    <ul className="list-disc pl-5 mb-6">
                        <li>Возраст от 18 лет</li>
                        <li>Опыт волонтерства (желательно)</li>
                        <li>Готовность работать на открытом воздухе</li>
                        <li>Коммуникабельность</li>
                    </ul>
                </div>
            </section>
            <section id="task-location" className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Место проведения</h2>
                <div className="h-[300px] bg-gray-200 rounded-lg mb-4"></div>
                    <div style={{display: "flex", }}>
                        <img style={{ width: 12, height: 16 }} src={require("../../images/placemark_red.svg").default} alt="placemark" />
                        <span style={{paddingLeft: 10}}>Центральный парк, ул. Ленина, 123</span>
                    </div>
            </section>
        </div>
    );
}

export default description;