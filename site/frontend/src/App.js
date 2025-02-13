import './App.css';
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Index from './landing/Index'
import Login from './main/Login'

import  { BrowserRouter as Router, Routes, Route } from 'react-router'

function App() {
    return (
        <Router>
            <div className="h-100 d-flex flex-column">
                <Header/>
                <div className="App flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
