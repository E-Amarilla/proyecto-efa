"use client";

import { useState, useEffect, useMemo, useContext } from "react";
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
import AuthContext from "../context/AuthContext.js";

const Completo = () => {
  const { data } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!data) return;

    try {
      // Las alarmas están en el índice 3 del array
      const alarmasData = data[3];

      if (Array.isArray(alarmasData) && alarmasData.length > 0) {
        const filteredItems = alarmasData.map(alarma => ({
          key: alarma.id_alarma.toString(),
          description: alarma.descripcion || "Sin descripción",
          type: alarma.tipoAlarma,
          state: alarma.estadoAlarma ? "Activo" : "Inactivo",
          time: alarma.fechaRegistro,
          registerTime: alarma.fechaRegistro,
        }));

        setItems(filteredItems);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error procesando datos:', err);
      setError("No se pudieron obtener los datos");
      setIsLoading(false);
    }
  }, [data]);

  const columns = [
    { key: "description", label: "DESCRIPCIÓN" },
    { key: "type", label: "TIPO" },
    { key: "state", label: "ESTADO" },
    { key: "time", label: "FECHA Y HORA ACTUAL" },
    { key: "registerTime", label: "FECHA Y HORA DE INICIO" },
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
        <Table aria-label="Tabla de alertas">
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
            <Button onClick={() => window.location.reload()} className="bg-[#761122]">
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
