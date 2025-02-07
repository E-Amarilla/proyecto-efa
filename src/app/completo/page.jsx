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

  const wsUrl = `ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/alarmas-logs`;

  // Función para convertir el formato de fecha
  const convertirFecha = (fechaStr) => {
    const fechaFormateada = fechaStr.replace(/-/g, ":").replace(/(\d{4}):(\d{2}):(\d{2}):(\d{2}):(\d{2})/, "$1-$2-$3 $4:$5");
    return new Date(fechaFormateada);
  };

  const connectWebSocket = () => {
    setIsLoading(true);
    setError(null); // Limpiar cualquier error previo

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      setError(null); // Limpiamos el estado de error al establecer la conexión
      setIsLoading(true); // Aseguramos que está cargando inicialmente
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data) && data.some(alerta => alerta.tipoAlarma === "Error" || alerta.tipoAlarma === "Alerta")) {
          const filteredItems = data.filter(alerta => alerta.tipoAlarma === "Error" || alerta.tipoAlarma === "Alerta");

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

          setIsLoading(false);
        }
      } catch (err) {
        setError("Error procesando datos del servidor.");
        setIsLoading(false); // Deja de cargar cuando ocurre un error
      }
    };

    socket.onerror = () => {
      setError("No se pudieron obtener los datos");
      setIsLoading(false); // Detener el estado de carga en caso de error de conexión
    };

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    connectWebSocket(); // Iniciar la conexión al montar el componente
  }, [wsUrl]);

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

  return (
    <div className={style.body}>
      <div className={style.contenedor}>
        <div className={style.contenedorImagen}>
          <LayoutCompleto />
        </div>
      </div>

      {/* Título */}
      <h2 className={style.titulo}>LISTADO ALERTAS</h2>

      <div className="w-full bg-[#131313] text-[#D9D9D9] table-fixed p-[2px] rounded-[15px]">
      <Table
        aria-label="Tabla de alertas"
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
                  {columnKey === "state" ? renderState(item.state) : item[columnKey]}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {error && (
        <div className="text-center mt-[4px] text-[#D9D9D9] h-[150px] flex flex-col justify-center items-center shadow-md rounded-[15px]">
            <div className="mb-2">{error}</div>
            <Button onClick={connectWebSocket} className="bg-[#761122]">
                Reintentar
            </Button>
        </div>
      )}
      </div>

      <div className="flex justify-between mt-[8px]">
        {/* Paginación */}
        <Pagination
          showControls
          total={totalPages}
          page={page}
          onChange={handlePageChange}
          color="white"
          size="lg"
        />

        <Link href="/alertas" className="flex justify-end">
          <Button
            className="hoverEffect flex justify-self-left font-bold bg-[#131313]"
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
