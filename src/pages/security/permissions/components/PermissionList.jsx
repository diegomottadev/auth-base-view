import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast';
import AppBreadcrumb from '../../../../components/_pesitos/AppBreadcrumb';
import { permissionServiceInstance } from '../../../../services/security/permissions/PermissionService';
import { roleServiceInstance } from '../../../../services/security/roles/RoleService';
import { Checkbox } from 'primereact/checkbox';

export const PermissionList = () => {
    // Refs
    const toast = useRef();
    
    // Hooks
    const navigate = useNavigate();
    const { roleId } = useParams();
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState(null);
    const [permissionIds, setPermissionIds] = useState([]);
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
            const permissionIdss = response.permissions.map(permission => permission.id);
            // Establecer los IDs de los permisos en el estado permissionIds
            setPermissionIds(permissionIdss);

        } catch (error) {
            console.error(error);
        }
    };

    // Effects
    useEffect(() => {
        if (roleId) {
            fetchPermissions();
        }
    }, []);


    const fetchPermissions = async () => {
        try {
            const { data: {data} } = await permissionServiceInstance.allPermmisions();
            setPermissions(data);

        } catch (error) {
            console.error(error);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

         const data = {
            permissionIds
         };

         console.log(permissionIds)
        try {
          const response = await roleServiceInstance.updateRolePermissions(role.id, data);
          toast.current.show({
                severity: 'success',
                summary: 'Exito',
                detail: `Rol ${role.name} con permisos actualizada`,
                life: 3000,
            });

        } catch (error) {
          console.error('Error:', error);
          // Aquí podrías manejar el error y mostrar un mensaje adecuado al usuario
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: `Rol ${role.name} con permisos actualizada`,
            life: 3000,
        });
        }
      };

    const goBackRoleList = () => {
        navigate('/roles');
    };

    const tienePermisoIdentico = (permissionId) => permissionIds.includes(permissionId);


    const handleChange = (permissionId, checked) => {
        console.log("check", checked)
        if (checked) {
          setPermissionIds(prevPermissionsId => [...prevPermissionsId, permissionId]);
        } else {
          setPermissionIds(prevPermissionsId => prevPermissionsId.filter(id => id !== permissionId));
        }
      };

    const mappedPermissions = permissions && permissions.map((permission,index) => (

        <div key={index} className="col-12 md:col-4">
            <div className="field-checkbox">
                <Checkbox inputId={`checkOption${index}`} name="option" value={permission.id} 
                checked={tienePermisoIdentico(permission.id)} 
                onChange={(e) => handleChange(permission.id, e.target.checked)} />
                <label htmlFor={`checkOption${index}`}>{permission.name || ''}</label>
            </div>
        </div>
      ));

    // Render
// Render
return (
    <div>
      {!role && !permissions ? '' :
        <div>
          <AppBreadcrumb meta={roleId ? 'Permisos / Editar' : 'Permisos / Nuevo'} />
          <div className="layout-content">
            <Toast ref={toast} onHide={() => navigate('/roles')} />
            <div className="grid">
              <div className="col-12">
                <div className="card">
                  <h5>{role ? `Editar permisos rol (${role.name})` : ''}</h5>
                  <form onSubmit={handleSubmit}>
                    <div className="card p-fluid">
                      <div className="grid">
                        {mappedPermissions}
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
      }
    </div>
  );
  
};

export default PermissionList;
