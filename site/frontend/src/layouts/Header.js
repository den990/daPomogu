import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router";

function Header() {
    return (
        <div>
            <div className="mx-5 d-flex my-3 justify-content-between" >
                <Link to="/" className="fw-bold fs-5 text-decoration-none text-black">ДаПомогу</Link>
                <div className="d-flex justify-content-between col-4 align-items-center">
                    <a className="text-black text-decoration-none fw-semibold">Задания</a>
                    <a className="text-black text-decoration-none fw-semibold">Волонтеры</a>
                    <a className="text-black text-decoration-none fw-semibold">О нас</a>
                    <button className="btn btn-danger rounded-3 py-2">
                        Разместить задание
                    </button>
                    <div>
                        <Link to="/login"><img className="img-fluid rounded-5" src="/images/main/test.png"></img></Link>
                    </div>
                </div>
            </div>
            <hr className="border-secondary border-1"></hr>
        </div>
    );
}

export default Header;