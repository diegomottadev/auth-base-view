import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import AppBreadcrumb from '../../../../components/_pesitos/AppBreadcrumb';
import { userServiceInstance } from '../../../../services/security/users/UserService';
import { roleServiceInstance } from '../../../../services/security/roles/RoleService';

export const UserForm = () => {
    // Refs
    const toast = useRef();
    
    // Hooks
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(null);
    const [roles, setRoles] = useState(null);

    // Effects
    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId]);

    // Functions
    const fetchUser = async () => {
        try {
            const { data: response } = await userServiceInstance.getUser(userId);
            setUser(response);
            setName(response.name);
            setEmail(response.email);
            setRoleId(response.roleId || '');
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchRoles = async () => {
          try {
            const { data: response } = await roleServiceInstance.allRoles(null);
            setRoles(response.data);
    
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchRoles();
    
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        if (!email) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        if (!password && !userId) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }
        if (!roleId) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, complete todos los campos obligatorios',
                life: 3000,
            });
            return;
        }

        const data = {
            name,
            email,
            password,
            roleId
        };

        try {
            let response;
            if (user) {
                response = await userServiceInstance.updateUser(user.id, data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Usuario ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await userServiceInstance.createUser(data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Usuario ${name} creada`,
                    life: 3000,
                });
            }

            // setName('');
            // setEmail('');
            // setRoleId(null);
            // setPassword('');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message === "Email already exists for another user") {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'El correo electrónico ya está en uso por otro usuario',
                    life: 3000,
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Se produjo un error al procesar la solicitud',
                    life: 3000,
                });
            }
        }
    };

    const goBackRoleList = () => {
        navigate('/users');
    };

    // Render
    return (
        <div>
            <AppBreadcrumb meta={userId ? 'Roles / Editar' : 'Roles / Nuevo'} />
            <div className="layout-content">
                <Toast ref={toast} onHide={() => navigate('/users')} />
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <h5>{userId ? 'Editar rol' : 'Nueva rol'}</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="card p-fluid">
                                    <div className="field">
                                        <label htmlFor="name">Nombre</label>
                                        <InputText
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="email">Email</label>
                                        <InputText
                                            id="description"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    {userId ? null : (
                                    <div className="field">
                                        <label htmlFor="password">Contraseña</label>
                                        <InputText
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                )}
                                    <div className='field'>
                                        <label htmlFor="roles">Rol</label>
                                        <Dropdown value={roleId} optionValue="id" onChange={(e) => setRoleId(e.value)} options={roles} optionLabel="name" placeholder="-- Seleccionar rol --" />
                                    </div>
                                </div>

                                <div className="flex justify-content-end mt-2">
                                    <div className="p-d-flex">
                                        <Button
                                            label="Volver"
                                            icon="pi pi-arrow-circle-left"
                                            className="p-button-raised p-button-secondary mr-2 mb-2"
                                            onClick={goBackRoleList}
                                        />
                                    </div>
                                    <div className="p-d-flex">
                                        <Button
                                            type="submit"
                                            label={user ? 'Actualizar' : 'Guardar'}
                                            icon="pi pi-save"
                                            className="p-button-raised p-button-success"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
