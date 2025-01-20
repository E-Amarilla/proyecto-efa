"use client";

import { useState, useEffect, useMemo } from "react";
import {
Table,
TableHeader,
TableColumn,
TableBody,
TableRow,
TableCell,
getKeyValue,
Pagination,
Spinner
} from "@nextui-org/react";

const Tabla = () => {
const [page, setPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [items, setItems] = useState([]);
const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

const wsUrl = `ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/alarmas-logs`;

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
        // Actualizar los items con el WebSocket
        setItems((prevItems) => {
            const updatedItems = [...prevItems];

            data.forEach((alerta) => {
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

    socket.onerror = (err) => {
    console.error("Error en WebSocket:", err);
    setError("Error al conectarse al servidor WebSocket.");
    setIsLoading(false);
    };

    socket.onclose = () => {
    console.log("Conexión WebSocket cerrada.");
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

const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
    direction = "desc";
    }
    setSortConfig({ key, direction });
};

const sortedItems = useMemo(() => {
    let sortedData = [...items];
    if (sortConfig.key) {
    sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });
    }
    return sortedData;
}, [items, sortConfig]);

const totalRows = sortedItems.length;
const totalPages = Math.ceil(totalRows / rowsPerPage);
const paginatedRows = useMemo(
    () => sortedItems.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [sortedItems, page, rowsPerPage]
);

const handlePageChange = (newPage) => setPage(newPage);

const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
};

return (
    <div className="w-full bg-[#131313] rounded-[15px] p-[20px]">
        <div className="w-1/2 font-bold text-[#D9D9D9] mb-[15px]">
            <h1 className="text-[25px]">HISTORIAL DE ALERTAS</h1>
            <h2 className="text-[20px]">EXTENDIDO</h2>
        </div>
        <Table
        aria-label="Tabla de alertas"
        className="w-full bg-[#131313] text-[#D9D9D9] table-fixed"
        >
            <TableHeader columns={columns}>
                {(column) => (
                <TableColumn
                    key={column.key}
                    allowsSorting
                    className="bg-[#1F1F1F] text-[#D9D9D9] font-medium"
                    onClick={() => handleSort(column.key)} // Agregar click para ordenar
                >
                    {column.label}
                    {sortConfig.key === column.key && (
                    <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span> // Indicador de dirección
                    )}
                </TableColumn>
                )}
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                items={paginatedRows}
                loadingContent={<Spinner
                    label="Cargando..."/>}
            >
                {(item) => (
                <TableRow key={item.key}>
                    {(columnKey) => (
                    <TableCell className="bg-[#131313] text-[#D9D9D9]">
                        {getKeyValue(item, columnKey)}
                    </TableCell>
                    )}
                </TableRow>
                )}
            </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-2 text-[#D9D9D9]">
                <label htmlFor="rows-per-page">Filas por página:</label>
                <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="bg-[#2C2C2C] text-[#D9D9D9] rounded-md p-[5px]"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
            </div>
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
        </div>
    </div>
);
};

export default Tabla;
