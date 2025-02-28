import './Index.css';

function Index() {
    return (
        <div className="container">
            <div className="landing-fon rounded-4">
                <div className="text-center landing-text_upper text-white fw-bolder pt-5">
                    Помощь нужна всегда. Станьте <br></br> волонтером
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-5 flex-fill">
                    <div className="mt-5"></div>
                    <div className="col-10 text-center text-white mt-5">
                        Мы помогаем некоммерческим организациям и муниципалитетам находить волонтеров для решения социальных задач. Мы создаем технологические решения для управления волонтерскими программами, проводим образовательные мероприятия и работаем над развитием волонтерства в России.
                    </div>
                </div>
            </div>
            <div className="d-flex mt-4">
                <div className="p-2 col-4">
                    <div className="card p-3 d-flex h-100">
                        <div className="col-6">
                            <div className="fw-semibold text-start fs-5">123</div>
                            <h3 className="text-start fw-bold">Волонтеров</h3>
                        </div>
                    </div>
                </div>
                <div className="p-2 col-4">
                    <div className="card p-3 d-flex h-100 ">
                        <div className="col-6">
                            <div className="fw-semibold text-start fs-5">456</div>
                            <h3 className="text-start fw-bold">Заданий размещено</h3>
                        </div>
                    </div>
                </div>
                <div className="p-2 col-4">
                    <div className="card p-3 d-flex h-100 ">
                        <div className="col-6">
                            <div className="fw-semibold text-start fs-5">789</div>
                            <h3 className="text-start fw-bold">Организаций</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;