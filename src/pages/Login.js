import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Error from '../components/Error';
import { login } from '../services/auth/Authorization';

export const Login = ({ mostrarError, error, setToken }) => {
    // State
    const [usuario, setUsuario] = useState({
        email: "",
        password: ''
    });

    // Handlers
    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data: { token } } = await login(usuario.email, usuario.password);
            setToken(token);
        } catch (error) {
            mostrarError(error.response.data.message);
        }
    };

    // Render
    return (
        <div className="login-body">
            <div className="login-panel"></div>

            <div className="login-content">
                <img src="assets/layout/images/pesitos-login.png" alt="babylon-layout" />

                <h1>
                    <span>Ingreso </span>a Pesitos
                </h1>
                <p>Bienvenido👋, usa tus credenciales de acceso para ingresar👇</p>

                <form onSubmit={handleLogin}>
                    <div className="login-input-wrapper">
                        <Error mensaje={error} />
                    </div>
                    <div className="login-input-wrapper">
                        <InputText placeholder="Email" type="text" name="email" onChange={handleInputChange} value={usuario.email || ''} required />
                        <i className="pi pi-user"></i>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText placeholder="Contraseña" type="password" name="password" max="150" onChange={handleInputChange} value={usuario.password || ''} required />
                        <i className="pi pi-lock"></i>
                    </div>

                    <Button label="Ingresar" type="submit" />
                </form>
            </div>
        </div>
    );
};
