

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBreadcrumb from '../../../components/_pesitos/AppBreadcrumb';
import CategoryService from '../../../services/categories/CaterogyService';
import ClasificationService from '../../../services/clasifications/ClasificationService';
import SubclasificationService from '../../../services/subclasifications/SubclasificationService';

const CategoryForm = () => {
    const toast = useRef();
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [clasification, setClasification] = useState(null);
    const [subclasification, setSubclasification] = useState(null);

    const [clasifications, setClasifications] = useState(null);
    const [subclasifications, setSubclasifications] = useState(null);

    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [clasificationValid, setClasificationValid] = useState(true);
    const [subclasificationValid, setSubclasificationValid] = useState(true);

    const [nameValid, setNameValid] = useState(true);



    useEffect(() => {
        const fetchClasifications = async () => {
            try {
                const { data: response } = await ClasificationService.allClasifications();
                setClasifications(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchClasifications();

    }, []);

    useEffect(() => {
        const fetchSubclasifications = async () => {
            const params = { clasification_id: clasification }

            try {
                const { data: response } = await SubclasificationService.allSubclasifications(params);
                setSubclasifications(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchSubclasifications();

    }, [clasification]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { data: response } = await CategoryService.getCategory(categoryId);
                setCategory(response.data);
                setName(response.data.name);
                setDescription(response.data.description || '');
                setClasification(response.data.clasification_id)
                setSubclasification(response.data.subclasification_id)

            } catch (error) {
                console.error(error);
            }
        };

        if (categoryId) {
            fetchCategory();
        }
    }, [categoryId]);


    const handleSubmit = async (event) => {
        event.preventDefault();


        let isValid = true;

        if (!clasification) {
            setClasificationValid(false);
            isValid = false;
        } else {
            setClasificationValid(true);
        }


        if (!subclasification) {
            setSubclasificationValid(false);
            isValid = false;
        } else {
            setSubclasificationValid(true);
        }

        if (!name) {
            setNameValid(false);
            isValid = false;
        } else {
            setNameValid(true);
        }


        if (!isValid) {
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
            clasification,
            subclasification
        };

        try {
            let response;
            if (category) {
                response = await CategoryService.updateCategory(category.id, data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Categoria ${name} actualizada`,
                    life: 3000,
                });
            } else {
                response = await CategoryService.createCategory(data);
                toast.current.show({
                    severity: 'success',
                    summary: 'Exito',
                    detail: `Categoria ${name} creada`,
                    life: 3000,
                });
            }
            setName('');
            setDescription('');
            setClasification(null);
            setSubclasification(null);

        } catch (error) {
            console.error(error);
        }
    };

    const goBackCategoryList = () => {
        navigate('/categories');
    };


    return (
        <div>
            {categoryId ? <AppBreadcrumb meta={'Categorías / Editar'} /> : <AppBreadcrumb meta={'Categorías / Nuevo'} />}
            <div className="layout-content">

                <Toast ref={toast} onHide={() => {
                    if (clasificationValid && nameValid) {
                        navigate('/categories')
                    }
                }
                } />
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <h5>{categoryId ? 'Editar categoría' : 'Nueva categoría'}</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="card p-fluid">
                                        <div className='field'>
                                            <label htmlFor="clasification">Tipo</label>
                                            <Dropdown value={clasification} optionValue="id" onChange={(e) => setClasification(e.value)} options={clasifications} optionLabel="name" placeholder="-- Seleccionar tipo de movimiento --"
                                                className={!clasificationValid ? 'p-invalid' : ''}
                                            />
                                        </div>
                                        <div className='field'>
                                            <label htmlFor="clasification">Clasificación</label>
                                            <Dropdown value={subclasification} optionValue="id" onChange={(e) => setSubclasification(e.value)} options={subclasifications} optionLabel="name" placeholder="-- Seleccionar clasificación --"
                                                className={!subclasificationValid ? 'p-invalid' : ''}
                                            />
                                        </div>
                                    <div className="field">
                                        <label htmlFor="name">Nombre</label>
                                        <InputText
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={!nameValid ? 'p-invalid' : ''}
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
                                            onClick={goBackCategoryList}
                                        />
                                    </div>
                                    <div className="p-d-flex">
                                        <Button
                                            type="submit"
                                            label={category ? 'Actualizar' : 'Guardar'}
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

export default CategoryForm;
