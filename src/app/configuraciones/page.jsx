"use client";

import style from './configuraciones.module.css';

import Image from "next/image";
import receta2 from '@/assets/img/RECETA2.png';
import NGripper from '@/assets/img/GRIPPER.png';
import TipoA from '@/assets/img/TIPOA.png';
import TipoB from '@/assets/img/TIPOB.png';
import TipoC from '@/assets/img/TIPOC.png';
import Peso from '@/assets/img/PESO.png';
import Moldes from '@/assets/img/MOLDE.png';
import Niveles from '@/assets/img/NIVELACTUAL.png';

import { useContext, useState, useEffect, useRef } from "react";
import EjemploSkeleton from "./skeleton"
import EjemploSkeleton2 from "./skeleton2"
import EjemploSkeleton3 from "./skeleton3"

import AuthContext from "../context/AuthContext"

import textstyle from './texto.module.css';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BotonAplicar2 from '../components/botones/aplicarfiltro/botonfiltro';
import BotonResetear from '../components/botones/resetearfalla/botonresetear';
import BotonRefresh from '../components/botones/aplicarreset/botonreset'
import SelectConfiguracion from '../components/botones/selectConfiguracion/selectConfiguracion'
import SelectTorre from "../components/botones/selectTorre/selectTorre"
import SelectNivel from "../components/botones/selectNivel/selectNivel"

const Configuraciones = () => {
    const { data } = useContext(AuthContext); // Obtiene datos del contexto
    const [loading, setLoading] = useState(false); // Nuevo estado para controlar el Spinner
    const [refreshKey, setRefreshKey] = useState(0);
    const [torres, setTorres] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter();
    const [setUserRole] = useState(""); // Asegúrate de que useState esté correctamente definido

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user_data');
        const username = sessionStorage.getItem('username'); // Obtenemos el nombre de usuario desde otro objeto
        const token = storedUser ? JSON.parse(storedUser).access_token : null;
        
        async function fetchUsers() {
            try {
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
    
                if (storedUser && username) {
                    // Se busca el usuario actual en el array de usuarios
                    const foundUser = users.find((u) => u.name === username);
                    if (foundUser) {
                        setUserRole(foundUser.role);
                        // Si el rol no es "ADMIN", se redirige a "/completo"
                        if (foundUser.role !== "ADMIN") {
                            router.push("/completo");
                        }
                    } else {
                        throw new Error("Usuario no encontrado en la lista de usuarios");
                    }
                } else {
                    throw new Error("storedUser o username no están presentes");
                }
            } finally {}
        }
        fetchUsers();
    }, [router]);

    const [datosGeneralesIzq, setDatosRecetas1] = useState([
        { id: 1, texto: 'NUMERO DE GRIPPER ', dato: 'null', icono:NGripper  },
        { id: 2, texto: 'TIPO DE MOLDE', dato: 'null', icono:TipoA  },
        { id: 3, texto: 'ANCHO DEL PRODUCTO', dato: 'null', icono:receta2  },
        { id: 4, texto: 'ALTO DEL PRODUCTO', dato: 'null', icono:receta2  },
        { id: 5, texto: 'LARGO DEL PRODUCTO', dato: 'null', icono:receta2  },
        { id: 6, texto: 'PESO DEL PRODUCTO', dato: 'null', icono:Peso  },
        { id: 7, texto: 'MOLDES POR NIVEL', dato: 'null', icono:Moldes  },
    ]);       

    const [datosGeneralesDer, setDatosRecetas2] = useState([
        { id: 1, texto: 'ALTURA DE MOLDE', dato: 'null', icono:receta2  },
        { id: 2, texto: 'LARGO DE MOLDE', dato: 'null', icono:receta2  },
        { id: 3, texto: 'ALTURA AJUSTE', dato: 'null', icono:receta2  },
        { id: 4, texto: 'NIVELES POR TORRE', dato: 'null', icono:Niveles  },
        { id: 5, texto: 'DELTA ENTRE NIVELES', dato: 'null', icono:receta2  },
        { id: 6, texto: 'ALTURA N1', dato: 'null', icono:receta2  },
        { id: 7, texto: 'ALTURA DE BASTIDOR', dato: 'null', icono:receta2  },
        { id: 8, texto: 'ALTURA AJUSTRE N1', dato: 'null', icono:receta2  },
    ]); 

    const [datosCorrecionesTorre, setDatosCorrecionesTorre] = useState([
        { id: 1, texto: 'Coreccion_hBastidor', dato: 'null' },
        { id: 2, texto: 'Coreccion_hAjuste', dato: 'null' },
        { id: 3, texto: 'Coreccion_hAjusteN1', dato: 'null' },
        { id: 4, texto: 'Coreccion_DisteNivel', dato: 'null' },
        { id: 5, texto: 'ActualizarTAG', dato: 'null' },
    ]);

    const [datosCorrecionesNivelesHN, setDatosCorrecionesNivelesHN] = useState([
        { id: 1, texto: 'Correcion_hN1', dato: 'null' },
        { id: 2, texto: 'Correcion_hN2', dato: 'null' },
        { id: 3, texto: 'Correcion_hN3', dato: 'null' },
        { id: 4, texto: 'Correcion_hN4', dato: 'null' },
        { id: 5, texto: 'Correcion_hN5', dato: 'null' },
        { id: 6, texto: 'Correcion_hN6', dato: 'null' },
        { id: 7, texto: 'Correcion_hN7', dato: 'null' },
        { id: 8, texto: 'Correcion_hN8', dato: 'null' },
        { id: 9, texto: 'Correcion_hN9', dato: 'null' },
        { id: 10, texto: 'Correcion_hN10', dato: 'null' },
        { id: 11, texto: 'Correcion_hN11', dato: 'null' },
    ]);

    const [datosCorrecionesNivelesChG, setDatosCorrecionesNivelesChG] = useState([
        { id: 1, texto: 'Correccion_hguardado_N1', dato: 'null' },
        { id: 2, texto: 'Correccion_hguardado_N2', dato: 'null' },
        { id: 3, texto: 'Correccion_hguardado_N3', dato: 'null' },
        { id: 4, texto: 'Correccion_hguardado_N4', dato: 'null' },
        { id: 5, texto: 'Correccion_hguardado_N5', dato: 'null' },
        { id: 6, texto: 'Correccion_hguardado_N6', dato: 'null' },
        { id: 7, texto: 'Correccion_hguardado_N7', dato: 'null' },
        { id: 8, texto: 'Correccion_hguardado_N8', dato: 'null' },
        { id: 9, texto: 'Correccion_hguardado_N9', dato: 'null' },
        { id: 10, texto: 'Correccion_hguardado_N10', dato: 'null' },
        { id: 11, texto: 'Correccion_hguardado_N11', dato: 'null' },
    ]);

    const [datosCorrecionesNivelesChB, setDatosCorrecionesNivelesChB] = useState([
        { id: 1, texto: 'Correccion_hbusqueda_N1', dato: 'null' },
        { id: 2, texto: 'Correccion_hbusqueda_N2', dato: 'null' },
        { id: 3, texto: 'Correccion_hbusqueda_N3', dato: 'null' },
        { id: 4, texto: 'Correccion_hbusqueda_N4', dato: 'null' },
        { id: 5, texto: 'Correccion_hbusqueda_N5', dato: 'null' },
        { id: 6, texto: 'Correccion_hbusqueda_N6', dato: 'null' },
        { id: 7, texto: 'Correccion_hbusqueda_N7', dato: 'null' },
        { id: 8, texto: 'Correccion_hbusqueda_N8', dato: 'null' },
        { id: 9, texto: 'Correccion_hbusqueda_N9', dato: 'null' },
        { id: 10, texto: 'Correccion_hbusqueda_N10', dato: 'null' },
        { id: 11, texto: 'Correccion_hbusqueda_N11', dato: 'null' },
    ]);

    const [datosCorrecionesNivelesFA, setDatosCorrecionesNivelesFA] = useState([
        { id: 1, texto: 'FallasN1', dato: 'null' },
        { id: 2, texto: 'FallasN2', dato: 'null' },
        { id: 3, texto: 'FallasN3', dato: 'null' },
        { id: 4, texto: 'FallasN4', dato: 'null' },
        { id: 5, texto: 'FallasN5', dato: 'null' },
        { id: 6, texto: 'FallasN6', dato: 'null' },
        { id: 7, texto: 'FallasN7', dato: 'null' },
        { id: 8, texto: 'FallasN8', dato: 'null' },
        { id: 9, texto: 'FallasN9', dato: 'null' },
        { id: 10, texto: 'FallasN10', dato: 'null' },
        { id: 11, texto: 'FallasN11', dato: 'null' },
    ]);

    const [datosCorrecionesNivelesuHN, setDatosCorrecionesNivelesuHN] = useState([
        { id: 1, texto: 'ultimo_hNivel1', dato: 'null' },
        { id: 2, texto: 'ultimo_hNivel2', dato: 'null' },
        { id: 3, texto: 'ultimo_hNivel3', dato: 'null' },
        { id: 4, texto: 'ultimo_hNivel4', dato: 'null' },
        { id: 5, texto: 'ultimo_hNivel5', dato: 'null' },
        { id: 6, texto: 'ultimo_hNivel6', dato: 'null' },
        { id: 7, texto: 'ultimo_hNivel7', dato: 'null' },
        { id: 8, texto: 'ultimo_hNivel8', dato: 'null' },
        { id: 9, texto: 'ultimo_hNivel9', dato: 'null' },
        { id: 10, texto: 'ultimo_hNivel10', dato: 'null' },
        { id: 11, texto: 'ultimo_hNivel11', dato: 'null' },
    ]);

    const opcionesCorrecciones = [
        { id: 1, nombre: 'TORRE' },
        { id: 2, nombre: 'NIVEL' },
    ];

    const inputRefs = useRef([]);

    // Guarda datos de Torre en BDD
    const handleAplicarClick2 = () => {
        const inputValues = [];
    
        inputRefs.current.forEach(input => {
            if (input) {
                const value = input.value.trim();  // Elimina espacios en blanco
                inputValues.push(value === "" ? null : value);
            }
        });
    
        while (inputValues.length < 5) {
            inputValues.push(null);
        }
    
        const finalData = {
            id: selectedTorre,
            hBastidor: inputValues[0] !== undefined && inputValues[0] !== "" ? parseInt(inputValues[0]) : null,
            hAjuste: inputValues[1] !== undefined && inputValues[1] !== "" ? parseInt(inputValues[1]) : null,
            hAjusteN1: inputValues[2] !== undefined && inputValues[2] !== "" ? parseInt(inputValues[2]) : null,
            DisteNivel: inputValues[3] !== undefined && inputValues[3] !== "" ? parseInt(inputValues[3]) : null,            
            ActualizarTAG: inputValues[4] || "",
            id_recetario: selectedReceta,
        };
    
        console.log('Datos enviados:', finalData);
    
        fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/tomar-datos-torre`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de la API:', data);
            toast.success("Datos de la torre corregidos exitosamente", {
                position: "bottom-center",
            });
            handleAplicarNiveles();
            refreshTorres(data.ActualizarTAG);
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    };

    // Guarda datos de Niveles en BDD
    const handleAplicarClick = () => {
        const inputValues = [];
    
        inputRefs.current.forEach(input => {
            if (input) {
                const value = input.value.trim();
                // Convertir a número si es un valor numérico, sino dejar null
                inputValues.push(value === "" ? null : isNaN(value) ? value : Number(value));
            }
        });
    
        // Asegurarse de que haya 11 correcciones en total
        while (inputValues.length < 11) {
            inputValues.push(null);
        }
    
        // Estructura del objeto que será enviado
        const finalData = {
            id: selectedTorre,
            tipo: selectedNivel,
            Correcion1: inputValues[0] !== undefined ? inputValues[0] : null,
            Correcion2: inputValues[1] !== undefined ? inputValues[1] : null,
            Correcion3: inputValues[2] !== undefined ? inputValues[2] : null,
            Correcion4: inputValues[3] !== undefined ? inputValues[3] : null,
            Correcion5: inputValues[4] !== undefined ? inputValues[4] : null,
            Correcion6: inputValues[5] !== undefined ? inputValues[5] : null,
            Correcion7: inputValues[6] !== undefined ? inputValues[6] : null,
            Correcion8: inputValues[7] !== undefined ? inputValues[7] : null,
            Correcion9: inputValues[8] !== undefined ? inputValues[8] : null,
            Correcion10: inputValues[9] !== undefined ? inputValues[9] : null,
            Correcion11: inputValues[10] !== undefined ? inputValues[10] : null,            
        };
    
        console.log('Datos enviados:', finalData);
    
        fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/tomar-datos-niveles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.text(); // Leer la respuesta como texto
        })
        .then(text => {
            console.log('Respuesta del servidor:', text); // Ver la respuesta completa como texto
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            toast.success("Datos de la torre corregidos exitosamente", {
                position: "bottom-center",
            });
            handleAplicarNiveles();
            refreshTorres2();
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });      
    };
    
    // Resetea datos fallas
    const handleAplicarReset = (index) => {
        let correcciones = {};
        for (let i = 1; i <= 11; i++) {
            correcciones[`Correcion${i}`] = null;
        }
        correcciones[`Correcion${index + 1}`] = 0;
    
        const datos = {
            id: selectedTorre,
            tipo: 'Fallas',
            ...correcciones
        };

        console.log('Datos enviados:', datos);
    
        fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/reset-datos-niveles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            toast.success("Datos de la torre corregidos exitosamente", {
                position: "bottom-center",
            });
            handleAplicarNiveles();
            refreshTorres2();
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    };         

    const [selectedOption, setSelectedOption] = useState(1);

    const handleOptionClick = (id) => {
        if (selectedOption !== id) {
            setSelectedOption(prev => {
            const newSelectedOption = prev === id ? null : id;
            return newSelectedOption;
            });
        }
    };

    const [selectedNivel, setSelectedNivel] = useState('HN');

    const handleNivelChange = (nivel) => {
        setSelectedNivel(nivel);
    };

    const [selectedTorre, setSelectedTorre] = useState(null);

    const handleTorreChange = (torre) => {
      setSelectedTorre(torre);
    };

    const handleTorresChange = (newTorres) => {
        console.log('Torres recibidas desde SelectTorre:', newTorres); // Aquí se imprime el listado de torres
        setTorres(newTorres); // Al recibir las torres desde SelectTorre, las almacenamos aquí
    };    

    const [selectedReceta, setSelectedReceta] = useState("1");
    
    const datosActuales = selectedOption === 1
    ? datosCorrecionesTorre
    : (selectedNivel === 'HN' 
        ? datosCorrecionesNivelesHN 
        : selectedNivel === 'ChB'
        ? datosCorrecionesNivelesChB
        : selectedNivel === 'FA'
        ? datosCorrecionesNivelesFA
        : selectedNivel === 'uHN'
        ? datosCorrecionesNivelesuHN
        : datosCorrecionesNivelesChG);

        const refreshTorres = (TAG) => {
            fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/lista-torres?id_receta=${selectedReceta}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.ListadoTorres) {
                  setSelectedTorre(TAG || data.ListadoTorres[0]?.id);
                }
              })
              .catch((error) => console.error('Error al obtener torres:', error));
        };

        const refreshTorres2 = () => {
            const currentReceta = selectedReceta;
            const currentTorre = selectedTorre;
          
            fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/lista-torres?id_receta=${currentReceta}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.ListadoTorres) {
                  const torreSeleccionada = currentTorre || null;
                  setSelectedTorre(torreSeleccionada);
                  
                  setSelectedReceta(currentReceta);
                }
              })
              .catch((error) => console.error('Error al obtener torres:', error));
          };

        const handleAplicarNiveles = async () => {
            if (selectedTorre !== null && selectedReceta !== null) {
                setDatosCorrecionesTorre([
                    { id: 1, texto: 'Coreccion_hBastidor', dato: null },
                    { id: 2, texto: 'Coreccion_hAjuste', dato: null },
                    { id: 3, texto: 'Coreccion_hAjusteN1', dato: null },
                    { id: 4, texto: 'Coreccion_DisteNivel', dato: null },
                    { id: 5, texto: 'ActualizarTAG', dato: null },
                ]);
        
                setDatosCorrecionesNivelesHN(Array(11).fill(null).map((_, index) => ({ id: index + 1, texto: `Correcion_hN${index + 1}`, dato: null })));
                setDatosCorrecionesNivelesChG(Array(11).fill(null).map((_, index) => ({ id: index + 1, texto: `Correccion_hguardado_N${index + 1}`, dato: null })));
                setDatosCorrecionesNivelesChB(Array(11).fill(null).map((_, index) => ({ id: index + 1, texto: `Correccion_hbusqueda_N${index + 1}`, dato: null })));
                setDatosCorrecionesNivelesFA(Array(11).fill(null).map((_, index) => ({ id: index + 1, texto: `FallasN${index + 1}`, dato: null })));
                setDatosCorrecionesNivelesuHN(Array(11).fill(null).map((_, index) => ({ id: index + 1, texto: `FallasN${index + 1}`, dato: null })));
        
                const fetchDatosTorre = async () => {
                    try {
                        const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/niveles-torre?id_torre=${selectedTorre}`);
                        if (!response.ok) {
                            throw new Error("Error en la solicitud");
                        }
                        const data = await response.json();
        
                        setDatosCorrecionesTorre([
                            { id: 1, texto: 'Coreccion_hBastidor', dato: data.DatosTorre?.hBastidor ?? null },
                            { id: 2, texto: 'Coreccion_hAjuste', dato: data.DatosTorre?.hAjuste ?? null },
                            { id: 3, texto: 'Coreccion_hAjusteN1', dato: data.DatosTorre?.hAjusteN1 ?? null },
                            { id: 4, texto: 'Coreccion_DisteNivel', dato: data.DatosTorre?.DisteNivel ?? null },
                            { id: 5, texto: 'ActualizarTAG', dato: data.DatosTorre?.ActualizarTAG ?? null },
                        ]);
        
                        const nivelesHN = Array.isArray(data.DatosNivelesHN) ? data.DatosNivelesHN : [];
                        const nivelesChG = Array.isArray(data.DatosNivelesChG) ? data.DatosNivelesChG : [];
                        const nivelesChB = Array.isArray(data.DatosNivelesChB) ? data.DatosNivelesChB : [];
                        const nivelesFA = Array.isArray(data.DatosNivelesFallas) ? data.DatosNivelesFallas : [];
                        const nivelesuHN = Array.isArray(data.DatosNivelesuHN) ? data.DatosNivelesuHN : [];
        
                        setDatosCorrecionesNivelesHN(
                            [...nivelesHN, ...Array(11 - nivelesHN.length).fill(null)].map((dato, index) => ({
                                id: index + 1,
                                texto: `Correcion_hN${index + 1}`,
                                dato: dato
                            }))
                        );
        
                        setDatosCorrecionesNivelesChG(
                            [...nivelesChG, ...Array(11 - nivelesChG.length).fill(null)].map((dato, index) => ({
                                id: index + 1,
                                texto: `Correccion_hguardado_N${index + 1}`,
                                dato: dato
                            }))
                        );
        
                        setDatosCorrecionesNivelesChB(
                            [...nivelesChB, ...Array(11 - nivelesChB.length).fill(null)].map((dato, index) => ({
                                id: index + 1,
                                texto: `Correccion_hbusqueda_N${index + 1}`,
                                dato: dato
                            }))
                        );
        
                        setDatosCorrecionesNivelesFA(
                            [...nivelesFA, ...Array(11 - nivelesFA.length).fill(null)].map((dato, index) => ({
                                id: index + 1,
                                texto: `FallasN${index + 1}`,
                                dato: dato
                            }))
                        );

                        setDatosCorrecionesNivelesuHN(
                            [...nivelesuHN, ...Array(11 - nivelesuHN.length).fill(null)].map((dato, index) => ({
                                id: index + 1,
                                texto: `ultimo_hNivel${index + 1}`,
                                dato: dato
                            }))
                        );
        
                    } catch (error) {
                        console.error("Error al obtener los datos de la torre:", error);
                    }
                };
        
                fetchDatosTorre();
            }
        };
        
        useEffect(() => {
        if (selectedTorre !== null && selectedReceta !== null) {
            handleAplicarNiveles();
        }
        }, [selectedReceta, selectedTorre]);

        const handleAplicarReceta = async () => {
            if (selectedReceta !== null) {
              setDatosRecetas1([
                { id: 1, texto: 'NUMERO DE GRIPPER', dato: null, icono: NGripper },
                { id: 2, texto: 'TIPO DE MOLDE', dato: null, icono: TipoA },
                { id: 3, texto: 'ANCHO DEL PRODUCTO', dato: null, icono: receta2 },
                { id: 4, texto: 'ALTO DEL PRODUCTO', dato: null, icono: receta2 },
                { id: 5, texto: 'LARGO DEL PRODUCTO', dato: null, icono: receta2 },
                { id: 6, texto: 'PESO DEL PRODUCTO', dato: null, icono: Peso },
                { id: 7, texto: 'MOLDES POR NIVEL', dato: null, icono: Moldes },
              ]);
          
              setDatosRecetas2([
                { id: 1, texto: 'ALTURA DE MOLDE', dato: null, icono: receta2 },
                { id: 2, texto: 'LARGO DE MOLDE', dato: null, icono: receta2 },
                { id: 3, texto: 'ALTURA AJUSTE', dato: null, icono: receta2 },
                { id: 4, texto: 'NIVELES POR TORRE', dato: null, icono: Niveles },
                { id: 5, texto: 'DELTA ENTRE NIVELES', dato: null, icono: receta2 },
                { id: 6, texto: 'ALTURA N1', dato: null, icono: receta2 },
                { id: 7, texto: 'ALTURA DE BASTIDOR', dato: null, icono: receta2 },
                { id: 8, texto: 'ALTURA AJUSTE N1', dato: null, icono: receta2 },
              ]);
          
              const fetchDatosReceta = async () => {
                try {
                  const url = `http://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/configuraciones/datos-recetas?id_receta=${selectedReceta}`;
                  console.log("Llamando a la API:", url);
          
                  const response = await fetch(url);
                  if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Error en la API:", errorText);
                    throw new Error("Error en la solicitud");
                  }
          
                  const data = await response.json();
                  console.log("Datos recibidos:", data);
          
                  const receta = data.DatosRecetas[0];
          
                  setDatosRecetas1([
                    { id: 1, texto: 'NUMERO DE GRIPPER', dato: receta.nroGripper ?? null, icono: NGripper },
                    { id: 2, texto: 'TIPO DE MOLDE', dato: receta.tipoMolde ?? null, icono: TipoA },
                    { id: 3, texto: 'ANCHO DEL PRODUCTO', dato: receta.anchoProducto ? `${receta.anchoProducto} mm` : null, icono: receta2 },
                    { id: 4, texto: 'ALTO DEL PRODUCTO', dato: receta.altoProducto ? `${receta.altoProducto} mm` : null, icono: receta2 },
                    { id: 5, texto: 'LARGO DEL PRODUCTO', dato: receta.largoProducto ? `${receta.largoProducto} mm` : null, icono: receta2 },
                    { id: 6, texto: 'PESO DEL PRODUCTO', dato: receta.pesoProducto ? `${receta.pesoProducto} kg` : null, icono: Peso },
                    { id: 7, texto: 'MOLDES POR NIVEL', dato: receta.moldesNivel ?? null, icono: Moldes },
                  ]);
          
                  setDatosRecetas2([
                    { id: 1, texto: 'ALTURA DE MOLDE', dato: receta.altoMolde ? `${receta.altoMolde} mm` : null, icono: receta2 },
                    { id: 2, texto: 'LARGO DE MOLDE', dato: receta.largoMolde ? `${receta.largoMolde} mm` : null, icono: receta2 },
                    { id: 3, texto: 'ALTURA AJUSTE', dato: receta.ajusteAltura ? `${receta.ajusteAltura} mm` : null, icono: receta2 },
                    { id: 4, texto: 'NIVELES POR TORRE', dato: receta.cantidadNiveles ?? null, icono: Niveles },
                    { id: 5, texto: 'DELTA ENTRE NIVELES', dato: receta.deltaNiveles ? `${receta.deltaNiveles} mm` : null, icono: receta2 },
                    { id: 6, texto: 'ALTURA N1', dato: receta.n1Altura ? `${receta.n1Altura} mm` : null, icono: receta2 },
                    { id: 7, texto: 'ALTURA DE BASTIDOR', dato: receta.bastidorAltura ? `${receta.bastidorAltura} mm` : null, icono: receta2 },
                    { id: 8, texto: 'ALTURA AJUSTE N1', dato: receta.ajusteN1Altura ? `${receta.ajusteN1Altura} mm` : null, icono: receta2 },
                  ]);
                } catch (error) {
                  console.error("Error al obtener los datos de la receta:", error);
                }
              };
          
              fetchDatosReceta();
            }
          };
          
          useEffect(() => {
            if (selectedReceta !== null) {
              handleAplicarReceta();
            }
          }, [selectedReceta]);
                   

    return (
        <div className={style.all}>
            <div className={style.Izq}>
                <div className={style.selector}>
                    <SelectConfiguracion onChange={setSelectedReceta} onClick={handleAplicarReceta} />
                </div>
                <div className={style.contenedor}>
                    <div className={style.datosGen}>
                        <ul className={style.lista}>
                            {datosGeneralesIzq.map(({ id, texto, dato, icono }) => (
                                <li key={id} className={style.datoListIzq}>
                                    <div className={style.detallesDatos}>
                                        <div className={style.texto}>
                                            {(dato === 'null' || dato === undefined || dato === null) ? (
                                            <>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <EjemploSkeleton2 />
                                            </>
                                            ) : (
                                            <>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <h4 className={textstyle.h4}>{dato}</h4>
                                            </>
                                            )}
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
                                            {(dato === 'null' || dato === undefined || dato === null) ? (
                                            <div className={style.Skeleton}>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <EjemploSkeleton2 />
                                            </div>
                                            ) : (
                                            <>
                                                <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                <h4 className={textstyle.h4}>{dato}</h4>
                                            </>
                                            )}
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
                                        {id === 1 && <SelectTorre onChange={handleTorreChange} onTorresChange={handleTorresChange} selectedReceta={selectedReceta} refreshTorres={refreshTorres} refreshTorres2={refreshTorres2} selectedTorre={selectedTorre}/>}
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
                        (selectedNivel === "HN" || selectedNivel === "ChG" || selectedNivel === "ChB") ? (
                        <div className={style.datosGenNiveles}>
                            <ul className={style.listaNiveles}>
                            {datosActuales.map(({ id, texto, dato }, index) => (
                                <li key={id} className={ (dato === 'null' || dato === undefined) ? style.datoListNivelesFallas : style.datoListNiveles }>
                                <div className={style.detallesDatos}>
                                    <div className={style.texto}>
                                    <h3 className={textstyle.subtitulo}>{texto}</h3>
                                    <h4 className={textstyle.h4}>
                                        {(dato === 'null' || dato === undefined || dato === null) ? (
                                            <EjemploSkeleton2 />
                                        ) : (
                                        <>
                                            {dato}
                                            <span> </span> 
                                            -
                                            <span> </span> 
                                            <input
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            className={style.inputCorreciones}
                                            type="number"
                                            onInput={(e) => {
                                                if (e.target.value.includes('.')) {
                                                e.target.value = e.target.value.split('.')[0];
                                                }
                                            }}
                                            pattern="\d+"
                                            />
                                        </>
                                        )}
                                    </h4>
                                    </div>
                                </div>
                                </li>
                            ))}
                                <div className={style.botonesAbajoDiv2}>
                                    <BotonAplicar2 
                                        className={style.botonesAbajo2} 
                                        onClick={() => handleAplicarClick()}
                                    />
                                    <BotonRefresh 
                                        className={style.botonesAbajo2}
                                        onClick={() => handleAplicarNiveles()}
                                    />
                                </div>
                            </ul>
                        </div>
                        ) : selectedNivel === "FA" ? (
                        <div className={selectedOption === 2 ? style.datosGenNiveles : style.datosGenCorreciones}>
                            <ul className={selectedOption === 2 ? style.listaNiveles : style.lista}>
                                {datosActuales.map(({ id, texto, dato }, index) => (
                                    <li key={id} className={selectedOption === 2 ? style.datoListNivelesFallas : style.datoListCorreciones}>
                                        <div className={style.detallesDatos}>
                                            <div className={style.texto}>
                                                {(dato === 'null' || dato === undefined || dato === null) ? (
                                                    <>
                                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                        <h4 className={textstyle.h4}>
                                                        <EjemploSkeleton2 />
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                        <h4 className={textstyle.h4}>
                                                            {dato}
                                                        </h4>
                                                    </>
                                                )}
                                            </div>
                                            {(dato === 'null' || dato === undefined || dato === null) ? (
                                                ''
                                            ) : (
                                                <BotonResetear 
                                                    className={style.botonAplicar} 
                                                    onClick={() => handleAplicarReset(index)}
                                                />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        ) : (
                        <div className={selectedOption === 2 ? style.datosGenNiveles : style.datosGenCorreciones}>
                            <ul className={selectedOption === 2 ? style.listaNiveles : style.lista}>
                                {datosActuales.map(({ id, texto, dato }) => (
                                    <li key={id} className={selectedOption === 2 ? style.datoListNivelesFallas : style.datoListNiveles}>
                                        <div className={style.detallesDatos}>
                                            <div className={style.texto}>
                                                {(dato === 'null' || dato === undefined || dato === null) ? (
                                                    <>
                                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                        <h4 className={textstyle.h4}>
                                                            <EjemploSkeleton2 />
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                                        <h4 className={textstyle.h4}>
                                                            {dato}
                                                        </h4>
                                                    </>
                                                )}
                                            </div>
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
                            <li key={id} className={selectedOption === 1 ? style.datoListCorreciones : style.datoListCorreciones}>
                                <div className={style.detallesDatos}>
                                <div className={style.texto}>
                                    {(dato === 'null' || dato === undefined || dato === null) ? (
                                    <>
                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                        <h4 className={textstyle.h4}>
                                        <EjemploSkeleton2 />
                                        </h4>
                                    </>
                                    ) : (
                                    <>
                                        <h3 className={textstyle.subtitulo}>{texto}</h3>
                                        <h4 className={textstyle.h4}>
                                        {dato}
                                        <span> </span> 
                                        - <span> </span> 
                                        <input
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            className={style.inputCorreciones}
                                            onInput={(e) => {
                                                let inputValue = e.target.value.toUpperCase();

                                                if (torres.some(torre => torre.id === inputValue)) {
                                                    toast.error("Ya existe una torre con este TAG.", {
                                                        position: "bottom-center",
                                                    });
                                                    setIsButtonDisabled(true);
                                                } else {
                                                    setIsButtonDisabled(false);
                                                }

                                                if (inputValue.includes('.')) {
                                                    inputValue = inputValue.split('.')[0];
                                                }

                                                e.target.value = inputValue;
                                            }}
                                        />
                                        </h4>
                                    </>
                                    )}
                                </div>
                                </div>
                            </li>
                            ))}
                            <div className={style.botonesAbajoDiv}>
                            <BotonAplicar2 
                                className={style.botonesAbajo} 
                                onClick={() => handleAplicarClick2()}
                                isDisabled={isButtonDisabled} // Usamos isDisabled en lugar de disabled
                            />
                            <BotonRefresh 
                                className={style.botonesAbajo} 
                                onClick={() => handleAplicarNiveles()}
                            />
                            </div>
                        </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Configuraciones;