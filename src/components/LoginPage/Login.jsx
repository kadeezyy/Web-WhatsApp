import React, { useState } from 'react';
import './Login.scss';

const Login = () => {
    const [idInstance, setIdInstance] = useState('');
    const [api_token, setToken] = useState('');

    const handlePhoneNumberChange = (e) => {
        setIdInstance(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setToken(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("idInstance", idInstance)
        localStorage.setItem("api_token", api_token)
        window.location.reload()
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <h1>WhatsApp</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="IdInstance"
                    value={idInstance}
                    onChange={handlePhoneNumberChange}
                />
                <input
                    type="text"
                    placeholder="ApiTokenInstance"
                    value={api_token}
                    onChange={handlePasswordChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;