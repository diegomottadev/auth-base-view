import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import AppBreadcrumb from '../../../../components/_pesitos/AppBreadcrumb';
import { roleServiceInstance } from '../../../../services/security/roles/RoleService';

export const RoleForm = () => {
    // Refs
    const toast = useRef();
    
    // Hooks
    const navigate = useNavigate();
    const { roleId } = useParams();
    const [role, setRole] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Effects
    useEffect(() => {
        if (roleId) {
            fetchRole();
        }
    }, [roleId]);

    // Functions
    const fetchRole = async () => {
        try {
            const { data: response } = await roleServiceInstance.getRole(roleId);
            setRole(response);
            setName(response.name);
            setDescription(response.description || '');
        } catch (error) {
            console.error(error);
        }
    };

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

        const data = {
            name,
            description,
        };

        try {
            let response;
            if (role) {
                response = await roleServiceInstance.updateRole(role.id, data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Rol ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await roleServiceInstance.createRole(data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Role ${name} creada`,
                    life: 3000,
                });
            }

            setName('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    const goBackRoleList = () => {
        navigate('/roles');
    };

    // Render
    return (
        <div>
            <AppBreadcrumb meta={roleId ? 'Roles / Editar' : 'Roles / Nuevo'} />
            <div className="layout-content">
                <Toast ref={toast} onHide={() => navigate('/roles')} />
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <h5>{roleId ? 'Editar rol' : 'Nueva rol'}</h5>
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
                                        <label htmlFor="description">Descripción</label>
                                        <InputTextarea
                                            id="description"
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
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
                                            label={role ? 'Actualizar' : 'Guardar'}
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

export default RoleForm;
