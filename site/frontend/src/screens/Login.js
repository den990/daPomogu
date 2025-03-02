import Title from '../components/login/title';
import Form from '../components/login/form';

function Login() {
    return (
        <body class="h-full text-base-content">
            <div id="login-page" class="min-h-screen bg-gray-50 flex flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <Title />
                <Form />
            </div>
        </body>
    );
}

export default Login;