import { Link } from 'react-router';
import ROUTES from '../constants/routes';

function HeaderAdmin() {
    return (
        <header id="header-admin" className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-end">
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">Администратор</span>
                        <div className="flex items-center space-x-2">
                            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-8 h-8 rounded-full" alt="Admin" />
                            <Link to={ROUTES.ADMIN_PANEL} className="text-gray-600">Админ</Link>
                            <img style={{width: 14, height: 14}} src={ require("../images/arrow-down_grey.svg").default } alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderAdmin;