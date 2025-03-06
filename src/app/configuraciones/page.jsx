"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Para redirección
import axios from "axios";
import style from './configuraciones.module.css';
// Imagenes
import Image from "next/image";
import receta2 from '@/assets/img/RECETA2.png';

import AuthContext from "../context/AuthContext"
import textstyle from './texto.module.css';
import { toast } from "sonner";
import BotonAplicar from '../components/botones/aplicarcorrecion/botonaplicar';
import BotonResetear from '../components/botones/resetearfalla/botonresetear';
import SelectConfiguracion from '../components/botones/selectConfiguracion/selectConfiguracion';
import SelectTorre from "../components/botones/selectTorre/selectTorre";
import SelectNivel from "../components/botones/selectNivel/selectNivel";

const Configuraciones = () => {
    const router = useRouter();
    const [userRole, setUserRole] = useState(""); // Asegúrate de que useState esté correctamente definido

    useEffect(() => {
        const storedUser = localStorage.getItem('user_data');
        const username = localStorage.getItem('username'); // Obtenemos el nombre de usuario desde otro objeto
        const token = storedUser ? JSON.parse(storedUser).access_token : null;
        console.log("Paso 1");
        console.log("Stored User:", storedUser);
        console.log("Username:", username); // Verificamos el nombre de usuario
        
        async function fetchUsers() {
            console.log("Paso 2");
            try {
                console.log("Paso 3");
                const response = await fetch(
                    `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/usuario/lista-usuarios`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );
    
                if (!response.ok) {
                    throw new Error("Error al obtener la lista de usuarios");
                }
    
                const users = await response.json();
                console.log("Users:", users);
    
                if (storedUser && username) {
                    console.log("Paso 4");
                    console.log("Current User:", username);
                    console.log("User being compared:", users.map(u => u.name));
                    // Se busca el usuario actual en el array de usuarios
                    const foundUser = users.find((u) => u.name === username);
                    if (foundUser) {
                        console.log("Paso 5");
                        setUserRole(foundUser.role);
                        // Si el rol no es "ADMIN", se redirige a "/completo"
                        if (foundUser.role !== "ADMIN") {
                            console.log("Redirigiendo a /completo");
                            router.push("/completo");
                        }
                    } else {
                        throw new Error("Usuario no encontrado en la lista de usuarios");
                    }
                } else {
                    throw new Error("storedUser o username no están presentes");
                }
            } catch (error) {
                console.error("Error en fetch de usuarios:", error);
            }
        }
        fetchUsers();
    }, [router]);

    const { data } = useContext(AuthContext);
    const { idRecetaActual } = data?.desmoldeo || {};

    const datosGeneralesIzq = [
        { id: 1, texto: 'DATO 1', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 2, texto: 'DATO 2', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 3, texto: 'DATO 3', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 4, texto: 'DATO 4', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 5, texto: 'DATO 5', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 6, texto: 'DATO 6', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 7, texto: 'DATO 7', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 8, texto: 'DATO 8', dato: idRecetaActual ?? 'null', icono: receta2 },
    ];       

    const datosGeneralesDer = [
        { id: 1, texto: 'DATO 9', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 2, texto: 'DATO 10', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 3, texto: 'DATO 11', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 4, texto: 'DATO 12', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 5, texto: 'DATO 13', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 6, texto: 'DATO 14', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 7, texto: 'DATO 15', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 8, texto: 'DATO 16', dato: idRecetaActual ?? 'null', icono: receta2 },
        { id: 9, texto: 'DATO 17', dato: idRecetaActual ?? 'null', icono: receta2 },
    ];

    const datosCorrecionesTorre = [
        { id: 1, texto: 'Coreccion_hBastidor', dato: idRecetaActual ?? 'null' },
        { id: 2, texto: 'Coreccion_hAjuste', dato: idRecetaActual ?? 'null' },
        { id: 3, texto: 'Coreccion_hAjusteN1', dato: idRecetaActual ?? 'null' },
        { id: 4, texto: 'Coreccion_DisteNivel', dato: idRecetaActual ?? 'null' },
        { id: 5, texto: 'Coreccion_hNivel1', dato: idRecetaActual ?? 'null' },
        { id: 6, texto: 'hDeltaeNiveles', dato: idRecetaActual ?? 'null' }
    ];

    const datosCorrecionesNivelesCH = [
        { id: 1, texto: 'Correcion_h1', dato: idRecetaActual ?? 'null' },
        { id: 2, texto: 'Correcion_h2', dato: idRecetaActual ?? 'null' },
        { id: 3, texto: 'Correcion_h3', dato: idRecetaActual ?? 'null' },
        { id: 4, texto: 'Correcion_h4', dato: idRecetaActual ?? 'null' },
        { id: 5, texto: 'Correcion_h5', dato: idRecetaActual ?? 'null' },
        { id: 6, texto: 'Correcion_h6', dato: idRecetaActual ?? 'null' },
        { id: 7, texto: 'Correcion_h7', dato: idRecetaActual ?? 'null' },
        { id: 8, texto: 'Correcion_h8', dato: idRecetaActual ?? 'null' },
        { id: 9, texto: 'Correcion_h9', dato: idRecetaActual ?? 'null' },
        { id: 10, texto: 'Correcion_h10', dato: idRecetaActual ?? 'null' },
        { id: 11, texto: 'Correcion_h11', dato: idRecetaActual ?? 'null' },
    ];

    const datosCorrecionesNivelesCHg = [
        { id: 1, texto: 'Correccion_hguardado1', dato: idRecetaActual ?? 'null' },
        { id: 2, texto: 'Correccion_hguardado2', dato: idRecetaActual ?? 'null' },
        { id: 3, texto: 'Correccion_hguardado3', dato: idRecetaActual ?? 'null' },
        { id: 4, texto: 'Correccion_hguardado4', dato: idRecetaActual ?? 'null' },
        { id: 5, texto: 'Correccion_hguardado5', dato: idRecetaActual ?? 'null' },
        { id: 6, texto: 'Correccion_hguardado6', dato: idRecetaActual ?? 'null' },
        { id: 7, texto: 'Correccion_hguardado7', dato: idRecetaActual ?? 'null' },
        { id: 8, texto: 'Correccion_hguardado8', dato: idRecetaActual ?? 'null' },
        { id: 9, texto: 'Correccion_hguardado9', dato: idRecetaActual ?? 'null' },
        { id: 10, texto: 'Correccion_hguardado10', dato: idRecetaActual ?? 'null' },
        { id: 11, texto: 'Correccion_hguardado1', dato: idRecetaActual ?? 'null' },
    ];

    const datosCorrecionesNivelesCHb = [
        { id: 1, texto: 'Correccion_hbusqueda1', dato: idRecetaActual ?? 'null' },
        { id: 2, texto: 'Correccion_hbusqueda2', dato: idRecetaActual ?? 'null' },
        { id: 3, texto: 'Correccion_hbusqueda3', dato: idRecetaActual ?? 'null' },
        { id: 4, texto: 'Correccion_hbusqueda4', dato: idRecetaActual ?? 'null' },
        { id: 5, texto: 'Correccion_hbusqueda5', dato: idRecetaActual ?? 'null' },
        { id: 6, texto: 'Correccion_hbusqueda6', dato: idRecetaActual ?? 'null' },
        { id: 7, texto: 'Correccion_hbusqueda7', dato: idRecetaActual ?? 'null' },
        { id: 8, texto: 'Correccion_hbusqueda8', dato: idRecetaActual ?? 'null' },
        { id: 9, texto: 'Correccion_hbusqueda9', dato: idRecetaActual ?? 'null' },
        { id: 10, texto: 'Correccion_hbusqueda10', dato: idRecetaActual ?? 'null' },
        { id: 11, texto: 'Correccion_hbusqueda11', dato: idRecetaActual ?? 'null' },
    ];

    const datosCorrecionesNivelesFA = [
        { id: 1, texto: 'FallasN1', dato: idRecetaActual ?? 'null' },
        { id: 2, texto: 'FallasN2', dato: idRecetaActual ?? 'null' },
        { id: 3, texto: 'FallasN3', dato: idRecetaActual ?? 'null' },
        { id: 4, texto: 'FallasN4', dato: idRecetaActual ?? 'null' },
        { id: 5, texto: 'FallasN5', dato: idRecetaActual ?? 'null' },
        { id: 6, texto: 'FallasN6', dato: idRecetaActual ?? 'null' },
        { id: 7, texto: 'FallasN7', dato: idRecetaActual ?? 'null' },
        { id: 8, texto: 'FallasN8', dato: idRecetaActual ?? 'null' },
        { id: 9, texto: 'FallasN9', dato: idRecetaActual ?? 'null' },
        { id: 10, texto: 'FallasN10', dato: idRecetaActual ?? 'null' },
        { id: 11, texto: 'FallasN11', dato: idRecetaActual ?? 'null' },
    ];

    const opcionesCorrecciones = [
        { id: 1, nombre: 'TORRE' },
        { id: 2, nombre: 'NIVEL' },
    ];

    const inputRefs = useRef([]);

    const handleAplicarClick = (index) => {
        if (inputRefs.current[index]) {
            toast.success("El dato de la corrección fue ajustado con éxito", {
                position: "bottom-center",
            });
        }
    };

    const [selectedOption, setSelectedOption] = useState(1);

    const handleOptionClick = (id) => {
        if (selectedOption !== id) {
            setSelectedOption(prev => (prev === id ? null : id));
        }
    };

    const [selectedNivel, setSelectedNivel] = useState('CH');

    const handleNivelChange = (nivel) => {
        setSelectedNivel(nivel);
    };

    useEffect(() => {
        // Se observa el cambio en el nivel seleccionado
    }, [selectedNivel]);

    const [selectedTorre, setSelectedTorre] = useState('1');

    const handleTorreChange = (torre) => {
        setSelectedTorre(torre);
    };

    useEffect(() => {
        // Se observa el cambio en la torre seleccionada
    }, [selectedTorre]);
    
    const datosActuales = selectedOption === 1
        ? datosCorrecionesTorre
        : (selectedNivel === 'CH' 
            ? datosCorrecionesNivelesCH 
            : selectedNivel === 'CHb'
            ? datosCorrecionesNivelesCHb
            : selectedNivel === 'FA'
            ? datosCorrecionesNivelesFA
            : datosCorrecionesNivelesCHg);

    const [selectedReceta, setSelectedReceta] = useState("1");

    return (
        <div className={style.all}>
            <div className={style.Izq}>
                <div className={style.selector}>
                    <SelectConfiguracion onChange={setSelectedReceta}/>
                </div>
                <div className={style.contenedor}>
                    <div className={style.datosGen}>
                        <ul className={style.lista}>
                            {datosGeneralesIzq.map(({ id, texto, dato, icono }) => (
                                <li key={id} className={style.datoListIzq}>
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            <h3 className={textstyle.subtitulo}>{texto}</h3>
                                            <h4 className={textstyle.h4}>{dato}</h4>
                                        </div>
                                        <Image src={icono} alt={`Estado: ${id}`} className={style.icon} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.Med}>
                <div className={style.contenedor}>
                    <div className={style.datosGen}>
                        <ul className={style.lista}>
                            {datosGeneralesDer.map(({ id, texto, dato, icono }) => (
                                <li key={id} className={style.datoList}>
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            <h3 className={textstyle.subtitulo}>{texto}</h3>
                                            <h4 className={textstyle.h4}>{dato}</h4>
                                        </div>
                                        <Image src={icono} alt={`Estado: ${id}`} className={style.icon} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={style.Der}>
                <div className={style.tituloCorreciones}>
                    <h2 className={style.h2}>CORRECIONES</h2>
                </div>

                <div className={style.botonesCorreciones}>
                    <ul className={style.navList}>
                        {opcionesCorrecciones.map(({ id, nombre }) => (
                            <li key={id} className={style.navItem}>
                                <button
                                    className={`${style.navLink} ${selectedOption === id ? style.active : ''}`}
                                    onClick={() => handleOptionClick(id)}
                                >
                                    <div className={style.botonTorre}>
                                        <span className={style.nombre}>{nombre}</span>
                                        <div className={style.selectTorreWrapper}>
                                            {id === 1 && <SelectTorre onChange={handleTorreChange}/>}
                                            {id === 2 && <SelectNivel onChange={handleNivelChange}/>}
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={style.contenedor}>
                    {selectedOption === 2 ? (
                        (selectedNivel === "CH" || selectedNivel === "CHg" || selectedNivel === "CHb") ? (
                            <div className={style.datosGenNiveles}>
                                <ul className={style.listaNiveles}>
                                    {datosActuales.map(({ id, texto, dato }, index) => (
                                        <li key={id} className={style.datoListNiveles}>
                                            <div className={style.detallesDatos}>
                                                <div className={style.texto}>
                                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                    <h4 className={textstyle.h4}>
                                                        {dato} - 
                                                        <input 
                                                            ref={(el) => (inputRefs.current[index] = el)}
                                                            className={style.inputCorreciones} 
                                                        />
                                                    </h4>
                                                </div>
                                                <BotonAplicar 
                                                    className={style.botonAplicar} 
                                                    onClick={() => handleAplicarClick(index)}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className={selectedOption === 2 ? style.datosGenNiveles : style.datosGenCorreciones}>
                                <ul className={selectedOption === 2 ? style.listaNiveles : style.lista}>
                                    {datosActuales.map(({ id, texto, dato }, index) => (
                                        <li key={id} className={selectedOption === 2 ? style.datoListNivelesFallas : style.datoListCorreciones}>
                                            <div className={style.detallesDatos}>
                                                <div className={style.texto}>
                                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                    <h4 className={textstyle.h4}>
                                                        {dato}
                                                    </h4>
                                                </div>
                                                <BotonResetear 
                                                    className={style.botonAplicar} 
                                                    onClick={() => handleAplicarClick(index)}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ) : (
                        <div className={selectedOption === 2 ? style.datosGenNiveles : style.datosGenCorreciones}>
                            <ul className={selectedOption === 2 ? style.listaNiveles : style.lista}>
                                {datosActuales.map(({ id, texto, dato }, index) => (
                                    <li key={id} className={selectedOption === 2 ? style.datoListNiveles : style.datoListCorreciones}>
                                        <div className={style.detallesDatos}>
                                            <div className={style.texto}>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <h4 className={textstyle.h4}>
                                                    {dato} - 
                                                    <input 
                                                        ref={(el) => (inputRefs.current[index] = el)}
                                                        className={style.inputCorreciones} 
                                                    />
                                                </h4>
                                            </div>
                                            <BotonAplicar 
                                                className={style.botonAplicar} 
                                                onClick={() => handleAplicarClick(index)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Configuraciones;
