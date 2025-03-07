function mainContent() {
    return (
        <main id="main-content" className="ml-64 p-8">
            <header id="header" className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Users &amp; Organizations</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img style={{ width: 14, height: 16}} src={ require("../../images/bell_dark.svg").default } alt="icon"/>
                        <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </div>
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Admin" className="w-10 h-10 rounded-full" />
                </div>
            </header>
            <section id="search-section" className="mb-8">
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <input type="text" placeholder="Search users or organizations..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500" />
                        <img className="absolute left-3 top-3" style={{ width: 16, height: 16 }} src={require("../../images/find_grey.svg").default} alt="icon" />
                    </div>
                </div>
            </section>
            <section id="users-list" className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left pb-4">User/Organization</th>
                                <th className="text-left pb-4">Type</th>
                                <th className="text-left pb-4">Status</th>
                                <th className="text-left pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User" className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-medium">John Smith</p>
                                            <p className="text-sm text-gray-500">john@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Volunteer</span>
                                </td>
                                <td className="py-4">
                                    <span className="text-green-600 flex items-center">
                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/check_green.svg").default } alt="icon" />
                                        <span style={{paddingLeft: 10}}>Active</span>
                                    </span>
                                </td>
                                <td className="py-4">
                                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md flex items-center">
                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/ban_red.svg").default } alt="icon" />
                                        <span style={{paddingLeft: 10}}>Block</span>
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <i className="text-gray-600" data-fa-i2svg=""><svg className="svg-inline--fa fa-building" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="building" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"></path></svg></i>
                                        </div>
                                        <div>
                                            <p className="font-medium">Red Cross Local</p>
                                            <p className="text-sm text-gray-500">contact@redcross.org</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Organization</span>
                                </td>
                                <td className="py-4">
                                    <span className="text-red-600 flex items-center">
                                        <img style={{ width: 16, height: 16 }} src={ require("../../images/ban_red.svg").default } alt="icon" />
                                        <span style={{paddingLeft: 10}}>Blocked</span>
                                    </span>
                                </td>
                                <td className="py-4">
                                    <button className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-md flex items-center">
                                    <img style={{ width: 14, height: 16 }} src={ require("../../images/unlock_green.svg").default } alt="icon" />
                                        <span style={{paddingLeft: 10}}>Unblock</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="pagination" className="p-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Showing 1-10 of 56 entries</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">Previous</button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded-md">1</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">2</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">3</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default mainContent;