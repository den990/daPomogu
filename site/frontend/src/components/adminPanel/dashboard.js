function dashboard() {
    return (
        <div class="ml-64 p-8">
            <div id="header" class="flex justify-between items-center mb-8">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                    <p class="text-gray-600">Welcome back, Admin</p>
                </div>
                <div class="flex items-center gap-4">
                    <button class="text-gray-600 hover:text-gray-800">
                        <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-bell" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"></path></svg></i>
                    </button>
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" class="w-10 h-10 rounded-full" />
                </div>
            </div>
            <div id="stats-grid" class="grid grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-red-600 bg-red-100 p-3 rounded-lg">
                            <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-users" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"></path></svg></i>
                        </div>
                        <span class="text-green-500 flex items-center gap-1">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg></i>
                            12%
                        </span>
                    </div>
                    <h3 class="text-gray-600 text-sm mb-1">Total Users</h3>
                    <p class="text-2xl font-bold text-gray-800">2,453</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-red-600 bg-red-100 p-3 rounded-lg">
                            <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-list-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg></i>
                        </div>
                        <span class="text-green-500 flex items-center gap-1">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg></i>
                            8%
                        </span>
                    </div>
                    <h3 class="text-gray-600 text-sm mb-1">Active Tasks</h3>
                    <p class="text-2xl font-bold text-gray-800">186</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-red-600 bg-red-100 p-3 rounded-lg">
                            <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-ban" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg></i>
                        </div>
                        <span class="text-red-500 flex items-center gap-1">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg></i>
                            3%
                        </span>
                    </div>
                    <h3 class="text-gray-600 text-sm mb-1">Banned Users</h3>
                    <p class="text-2xl font-bold text-gray-800">23</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-red-600 bg-red-100 p-3 rounded-lg">
                            <i class="text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-circle-check" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg></i>
                        </div>
                        <span class="text-green-500 flex items-center gap-1">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-arrow-up" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path></svg></i>
                            15%
                        </span>
                    </div>
                    <h3 class="text-gray-600 text-sm mb-1">Completed Tasks</h3>
                    <p class="text-2xl font-bold text-gray-800">1,429</p>
                </div>
            </div>
            <div id="recent-users" class="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-lg font-bold text-gray-800">Recent Users</h3>
                </div>
                <div class="p-6">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm text-gray-600">
                                <th class="pb-4">User</th>
                                <th class="pb-4">Status</th>
                                <th class="pb-4">Tasks</th>
                                <th class="pb-4">Joined</th>
                                <th class="pb-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100">
                                <td class="py-4">
                                    <div class="flex items-center gap-3">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" class="w-8 h-8 rounded-full" />
                                        <span>Anna Johnson</span>
                                    </div>
                                </td>
                                <td><span class="text-green-500 bg-green-50 px-2 py-1 rounded-full text-sm">Active</span></td>
                                <td>12</td>
                                <td>Jan 15, 2025</td>
                                <td>
                                    <button class="text-red-600 hover:text-red-800">
                                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-ban" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ban" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"></path></svg></i>
                                    </button>
                                </td>
                            </tr>
                            <tr class="border-b border-gray-100">
                                <td class="py-4">
                                    <div class="flex items-center gap-3">
                                        <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" class="w-8 h-8 rounded-full" />
                                        <span>Mark Wilson</span>
                                    </div>
                                </td>
                                <td><span class="text-red-500 bg-red-50 px-2 py-1 rounded-full text-sm">Banned</span></td>
                                <td>5</td>
                                <td>Jan 12, 2025</td>
                                <td>
                                    <button class="text-green-600 hover:text-green-800">
                                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-unlock" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="unlock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"></path></svg></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="tasks-overview" class="grid grid-cols-2 gap-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">Task Categories</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium">Social Support</h4>
                                    <p class="text-sm text-gray-600">42 active tasks</p>
                                </div>
                                <div class="w-32 bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 70%"></div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium">Environmental</h4>
                                    <p class="text-sm text-gray-600">28 active tasks</p>
                                </div>
                                <div class="w-32 bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4 class="font-medium">Education</h4>
                                    <p class="text-sm text-gray-600">35 active tasks</p>
                                </div>
                                <div class="w-32 bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 60%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">Recent Tasks</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 class="font-medium">Senior Care Support</h4>
                                    <p class="text-sm text-gray-600">Posted 2h ago</p>
                                </div>
                                <button class="text-red-600 hover:text-red-800">
                                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-ellipsis-vertical" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-vertical" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" data-fa-i2svg=""><path fill="currentColor" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path></svg></i>
                                </button>
                            </div>
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h4 class="font-medium">Park Cleanup</h4>
                                    <p class="text-sm text-gray-600">Posted 5h ago</p>
                                </div>
                                <button class="text-red-600 hover:text-red-800">
                                    <i data-fa-i2svg=""><svg class="svg-inline--fa fa-ellipsis-vertical" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-vertical" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" data-fa-i2svg=""><path fill="currentColor" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path></svg></i>
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