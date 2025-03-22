import React from "react";

function ErrorWindow({ errorCode, errorMessage }) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="bg-red-500 text-white p-8 rounded-lg shadow-xl max-w-sm w-full transform transition duration-300 hover:scale-105">
                <h1 className="text-6xl font-bold text-center animate__animated animate__fadeIn">{errorCode}</h1>
                <p className="text-center text-lg mt-4 animate__animated animate__fadeIn animate__delay-1s">
                    {errorMessage}
                </p>
                <div className="mt-8 flex justify-center">
                    <a
                        href="/"
                        className="bg-white text-red-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
                    >
                        На главную
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ErrorWindow;
