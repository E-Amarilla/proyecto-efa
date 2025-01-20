"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  Button
} from "@nextui-org/react";
import Link from 'next/link';
import Image from "next/image";
import luzR from '@/assets/img/puntoRojo.png';
import luzV from '@/assets/img/puntoVerde.png';
import LayoutCompleto from '../components/layoutcompleto/LayoutCompleto.jsx';
import style from './Completo.module.css';

const Completo = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const wsUrl = `ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/alarmas-logs`

  // Función para convertir el formato de fecha
  const convertirFecha = (fechaStr) => {
    // Cambiar el formato '2025-01-17-12-00' a '2025-01-17 12:00'
    const fechaFormateada = fechaStr.replace(/-/g, ":").replace(/(\d{4}):(\d{2}):(\d{2}):(\d{2}):(\d{2})/, "$1-$2-$3 $4:$5");
    return new Date(fechaFormateada);
  };

  useEffect(() => {
    const socket = new WebSocket(wsUrl);
  
    socket.onopen = () => {
      console.log("Conexión WebSocket establecida.");
      setError(null); // Limpiamos el estado de error al establecer la conexión
      setIsLoading(true); // Aseguramos que está cargando inicialmente
    };
  
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
  
        if (Array.isArray(data) && data.some(alerta => alerta.tipoAlarma === "Error" || alerta.tipoAlarma === "Alerta")) {
          // Filtrar solo alertas de tipo "Error" y "Alerta"
          const filteredItems = data.filter(alerta => alerta.tipoAlarma === "Error" || alerta.tipoAlarma === "Alerta");
  
          // Actualizar los items con el WebSocket
          setItems((prevItems) => {
            const updatedItems = [...prevItems];
  
            filteredItems.forEach((alerta) => {
              const index = updatedItems.findIndex(item => item.key === alerta.id_alarma.toString());
              if (index !== -1) {
                updatedItems[index] = {
                  key: alerta.id_alarma.toString(),
                  description: alerta.descripcion,
                  type: alerta.tipoAlarma,
                  state: alerta.estadoAlarma,
                  time: alerta.fechaRegistro,
                };
              } else {
                updatedItems.push({
                  key: alerta.id_alarma.toString(),
                  description: alerta.descripcion,
                  type: alerta.tipoAlarma,
                  state: alerta.estadoAlarma,
                  time: alerta.fechaRegistro,
                });
              }
            });
  
            return updatedItems;
          });
  
          setIsLoading(false); // Desactivar carga cuando se reciban los datos
        } else {
          console.error("Formato de datos no válido o sin datos relevantes:", data);
        }
      } catch (err) {
        console.error("Error procesando datos del WebSocket:", err);
        setError("Error procesando datos del servidor.");
      }
    };
  
    socket.onerror = (err) => {
      console.error("Error en WebSocket:", err);
      if (!isLoading) { // Solo establecer error si no se ha completado la carga
        setError("Error al conectarse al servidor WebSocket.");
      }
      setIsLoading(false);
    };
  
    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada.");
    };
  
    return () => {
      socket.close();
    };
  }, [wsUrl]); // Dependemos de isLoading para asegurarnos de que vuelva a ser true si es necesario   

  const columns = [
    { key: "description", label: "DESCRIPCIÓN" },
    { key: "type", label: "TIPO" },
    { key: "state", label: "ESTADO" },
    { key: "time", label: "HORA" },
  ];

  const totalRows = items.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedRows = useMemo(
    () => items.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [items, page, rowsPerPage]
  );

  const handlePageChange = (newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const renderState = (state) => {
    if (state === "Activo") {
      return <Image src={luzV} alt="Activo" width={15} height={15} />;
    } else if (state === "Inactivo") {
      return <Image src={luzR} alt="Inactivo" width={15} height={15} />;
    }
    return state;
  };

  useEffect(() => {
    // Agregar el atributo "data-active" y "aria-current" a la página activa
    const paginationItems = document.querySelectorAll('.nextui-pagination-item');
    paginationItems.forEach(item => {
      const pageNumber = parseInt(item.textContent);
      if (pageNumber === page) {
        item.setAttribute('data-active', 'true');
        item.setAttribute('aria-current', 'true');
        item.setAttribute('data-focus', 'true');
      } else {
        item.removeAttribute('data-active');
        item.removeAttribute('aria-current');
        item.removeAttribute('data-focus');
      }
    });
  }, [page]);  

  return (
    <div className={style.body}>
      <div className={style.contenedor}>
        <div className={style.contenedorImagen}>
          <LayoutCompleto />
        </div>
      </div>

      {/* Título */}
      <h2 className={style.titulo}>ÚLTIMAS ALERTAS</h2>

      {/* Mostrar error si lo hay */}
      {error && <p className="text-red-500">Error: {error}</p>}

      <Table
        aria-label="Tabla de alertas"
        className="w-full bg-[#131313] text-[#D9D9D9] table-fixed p-[2px] rounded-[15px]"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="bg-[#1f1f1f] text-[#D9D9D9] font-medium"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={paginatedRows}
          loadingContent={<Spinner label="Cargando..." />}
        >
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell className="bg-[#131313] text-[#D9D9D9]">
                  {columnKey === "state" ? renderState(item.state) : columnKey === "time" ? convertirFecha(item.time).toLocaleString() : item[columnKey]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-5">
        <Pagination
          className="flex flex-wrap gap-4 items-center overflow-hidden"
          showControls
          isCompact
          color="white"
          variant="light"
          size="lg"
          total={totalPages}
          page={page}  // Página actual gestionada por estado
          onChange={handlePageChange}
        />
        <Link href="/alertas">
          <Button
            className={`${style.hoverEffect} flex justify-self-center font-bold`}
            radius="full"
            auto
          >
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Completo;
