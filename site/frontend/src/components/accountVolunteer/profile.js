function profile() {
    return (
        <div id="profile-section" className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col items-center">
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-32 h-32 rounded-full" alt="Profile" />
                <h2 className="mt-4 text-xl font-semibold">Анна Петрова</h2>
                <p className="text-gray-600" style={{display: "flex", alignItems: "center"}}>
                    <img style={{ width: 12, height: 16 }} src={require("../../images/placemark_grey.svg").default} alt="placemark" />
                    <span style={{paddingLeft: 10}}>Москва</span>
                </p>
            </div>
            <div className="mt-6 gap-4 text-center flex flex-col justify-center">
                <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">47</div>
                    <div className="text-sm text-gray-600">Выполнено заданий</div>
                </div>
                <button className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Редактировать профиль
                </button>
            </div>
            </div>
        </div>
    );
}

export default profile;