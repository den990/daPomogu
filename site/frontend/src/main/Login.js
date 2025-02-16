import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    return (
        <div className="container d-flex justify-content-center">
            <div className="col-6 mt-5">
                <div className="fw-bold fs-4 text-black">Вход</div>
                <form>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">Email</label>
                        <input type="email" className="form-control form-control-lg" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Введите email"></input>
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">Пароль</label>
                        <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Введите пароль"></input>
                    </div>
                    <button type="submit" className="btn btn-danger w-100 rounded-4 py-2 mt-2">Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;