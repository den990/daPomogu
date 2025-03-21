function Volunteers() {
    return (
        <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                Активные волонтеры
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {[1, 2].map((volunteer) => (
                    <div 
                        key={volunteer}
                        className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 md:p-4"
                    >
                        <img 
                            src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${volunteer}.jpg`} 
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full" 
                            alt={`Аватар ${volunteer === 1 ? 'Анны Петровой' : 'Ивана Смирнова'}`} 
                        />
                        <div>
                            <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                                {volunteer === 1 ? "Анна Петрова" : "Иван Смирнов"}
                            </h4>
                            <p className="text-gray-600 text-xs md:text-sm">
                                {volunteer === 1 ? "3 активных задания" : "2 активных задания"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Volunteers;