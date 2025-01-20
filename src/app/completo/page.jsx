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
      setIsLoading(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
          // Filtrar solo alertas de tipo "Error" y "Alerta"
          const filteredItems = data.filter(alerta => alerta.tipoAlarma === "Error" || alerta.tipoAlarma === "Alerta");

          // Actualizar los items con el WebSocket
          setItems((prevItems) => {
            const updatedItems = [...prevItems];

            filteredItems.forEach((alerta) => {
              const index = updatedItems.findIndex(item => item.key === alerta.id_alarma.toString());
              if (index !== -1) {
                // Si el item ya existe, lo actualizamos
                updatedItems[index] = {
                  key: alerta.id_alarma.toString(),
                  description: alerta.descripcion,
                  type: alerta.tipoAlarma,
                  state: alerta.estadoAlarma,
                  time: alerta.fechaRegistro,
                };
              } else {
                // Si no existe, lo agregamos
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
        } else {
          console.error("Formato de datos no válido:", data);
        }
      } catch (err) {
        console.error("Error procesando datos del WebSocket:", err);
        setError("Error procesando datos del servidor.");
      }
    };

    return () => {
      socket.close();
    };
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
          initialPage={1}
          total={totalPages}
          page={page}
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
