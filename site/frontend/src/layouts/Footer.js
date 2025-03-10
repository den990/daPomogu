import { Link } from 'react-router';
import ROUTES from '../constants/routes';

function Footer() {
    return (
        <footer id="footer" className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">ДаПомогу</h3>
                        <p className="text-gray-400">Платформа для объединения волонтеров и организаций</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Платформа</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to={ROUTES.ABOUT} className="text-gray-400 hover:text-white cursor-pointer">О нас</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 ДаПомогу. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;