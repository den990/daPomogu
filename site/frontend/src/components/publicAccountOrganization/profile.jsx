import React from 'react';

function Profile( {profile} ) {
    return (
        <section id="org-profile" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-6">
                <img className="w-48 h-48 rounded-lg object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/cb61e8f45a-5ee863536d744c529bb2.png" alt="humanitarian organization logo with volunteers in red and white colors" />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile.name || "Нет данных"}</h2>
                </div>
            </div>
        </section>
    );
}

export default Profile;