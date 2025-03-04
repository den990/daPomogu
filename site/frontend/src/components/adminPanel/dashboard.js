function dashboard() {
    return (
        <div className="ml-64 p-8">
            <div id="header" className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p className="text-gray-600">Welcome back, Admin</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-800">
                        <img style={{ width: 18, height: 20 }} src={require("../../images/bell_dark.svg").default} alt="bell" />
                    </button>
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" className="w-10 h-10 rounded-full" alt="person" />
                </div>
            </div>
            <div id="stats-grid" className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 25, height: 24 }} src={require("../../images/people_red.svg").default} alt="people" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            12%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-800">2,453</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/stats_red.svg").default} alt="stats" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            8%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Active Tasks</h3>
                    <p className="text-2xl font-bold text-gray-800">186</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/ban_red.svg").default} alt="ban" />
                        </div>
                        <span className="text-red-500 flex items-center gap-1">
                            <img style={{ width: 12, height: 16 }} src={require("../../images/down-arrow_red.svg").default} alt="up-arrow"/>
                            3%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Banned Users</h3>
                    <p className="text-2xl font-bold text-gray-800">23</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                            <img style={{ width: 20, height: 24 }} src={require("../../images/circle-check_red.svg").default} alt="circle-check" />
                        </div>
                        <span className="text-green-500 flex items-center gap-1">
                            e<img style={{ width: 12, height: 16 }} src={require("../../images/up-arrow_green.svg").default} alt="up-arrow"/>
                            15%
                        </span>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">Completed Tasks</h3>
                    <p className="text-2xl font-bold text-gray-800">1,429</p>
                </div>
            </div>
            <div id="recent-users" className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
                </div>
                <div className="p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-600">
                                <th className="pb-4">User</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Tasks</th>
                                <th className="pb-4">Joined</th>
                                <th className="pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-8 h-8 rounded-full" alt="person" />
                                        <span>Anna Johnson</span>
                                    </div>
                                </td>
                                <td><span className="text-green-500 bg-green-50 px-2 py-1 rounded-full text-sm">Active</span></td>
                                <td>12</td>
                                <td>Jan 15, 2025</td>
                                <td>
                                    <button className="text-red-600 hover:text-red-800">
                                        <img style={{ width: 16, height: 16 }} src={require("../../images/ban_red.svg").default} alt="ban" />
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-8 h-8 rounded-full" alt="person" />
                                        <span>Mark Wilson</span>
                                    </div>
                                </td>
                                <td><span className="text-red-500 bg-red-50 px-2 py-1 rounded-full text-sm">Banned</span></td>
                                <td>5</td>
                                <td>Jan 12, 2025</td>
                                <td>
                                    <button className="text-green-600 hover:text-green-800">
                                        <img style={{ width: 14, height: 16 }} src={require("../../images/unlock_green.svg").default} alt="unlock" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="tasks-overview" className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800">Task Categories</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">Social Support</h4>
                                    <p className="text-sm text-gray-600">42 active tasks</p>
                                </div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-600 h-2 rounded-full" style={{width: "70%"}}></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">Environmental</h4>
                                    <p className="text-sm text-gray-600">28 active tasks</p>
                                </div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-600 h-2 rounded-full" style={{width: "45%"}}></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-medium">Education</h4>
                                    <p className="text-sm text-gray-600">35 active tasks</p>
                                </div>
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-600 h-2 rounded-full" style={{width: "60%"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800">Recent Tasks</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 className="font-medium">Senior Care Support</h4>
                                    <p className="text-sm text-gray-600">Posted 2h ago</p>
                                </div>
                                <button className="text-red-600 hover:text-red-800">
                                    <img style={{ width: 4, height: 16 }} src={require("../../images/three-dot_red.svg").default} alt="three-dot" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 className="font-medium">Park Cleanup</h4>
                                    <p className="text-sm text-gray-600">Posted 5h ago</p>
                                </div>
                                <button className="text-red-600 hover:text-red-800">
                                    <img style={{ width: 4, height: 16 }} src={require("../../images/three-dot_red.svg").default} alt="three-dot" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default dashboard;