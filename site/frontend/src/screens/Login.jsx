import Title from "../components/login/title";
import Form from "../components/login/form";
import { Helmet } from 'react-helmet';

function Login() {
    return (
        <div className="h-full text-base-content">
            <Helmet>
                <title>Войти в систему</title>
            </Helmet>
            <div
                id="login-page"
                className="min-h-screen bg-gray-50 flex flex flex-col justify-center py-12 sm:px-6 lg:px-8"
            >
                <Title />
                <Form />
            </div>
        </div>
    );
}

export default Login;
