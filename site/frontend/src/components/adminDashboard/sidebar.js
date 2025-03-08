function sidebar() {
    return (
        <aside id="sidebar" className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="p-6">
                <h2 className="text-xl font-bold text-red-600">Volunteer Platform</h2>
            </div>
            <nav className="mt-6">
                <a href="/#" className="flex items-center px-6 py-3 text-gray-700 bg-red-50">
                    <img style={{ width: 20, height: 16 }} src={ require("../../images/people_dark.svg").default } alt="icon"/>
                    <span style={{paddingLeft: 10}}>Users &amp; Organizations</span>
                </a>
                <a href="/#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-red-50">
                    <img style={{ width: 16, height: 16 }} src={ require("../../images/graphic_dark.svg").default } alt="icon"/>
                    <span style={{paddingLeft: 10}}>Analytics</span>
                </a>
                <a href="/#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-red-50">
                    <img style={{ width: 16, height: 16 }} src={ require("../../images/settings_dark.svg").default } alt="icon"/>
                    <span style={{paddingLeft: 10}}>Settings</span>
                </a>
            </nav>
        </aside>
    );
}

export default sidebar;