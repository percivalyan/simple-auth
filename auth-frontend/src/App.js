import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, logout } from './utils/auth';
import { Navigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <ul>
                    {!isAuthenticated() && (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <li>
                            <button onClick={() => { 
                                logout(); 
                                navigate('/login'); 
                            }}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
                />
            </Routes>
        </div>
    );
};

export default App;
