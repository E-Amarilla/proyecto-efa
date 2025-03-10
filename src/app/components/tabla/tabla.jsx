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
  Spinner,
  Button,
} from "@nextui-org/react";

const Tabla = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const wsUrl = `ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/alarmas-logs`;

  const connectWebSocket = () => {
    setIsLoading(true);
    setError(null);

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (Array.isArray(data) && data.length > 0) {
          setItems((prevItems) => {
            const updatedItems = [...prevItems];

            data.forEach((alerta) => {
              const index = updatedItems.findIndex(
                (item) => item.key === alerta.id_alarma.toString()
              );

              const newItem = {
                key: alerta.id_alarma.toString(),
                description: alerta.descripcion,
                type: alerta.tipoAlarma,
                state: alerta.estadoAlarma,
                time: alerta.fechaActual,
                startDate:
                  alerta.estadoAlarma === "Activo" && alerta.fechaInicio
                    ? alerta.fechaInicio
                    : "",
              };

              if (index !== -1) {
                // Actualizamos el item existente
                updatedItems[index] = newItem;
              } else {
                // Agregamos un nuevo item
                updatedItems.push(newItem);
              }
            });

            return updatedItems;
          });
          setIsLoading(false);
        }
      } catch (err) {
        setError("Error processing data from server.");
        setIsLoading(false);
      }
    };

    socket.onerror = () => {
      setError("");
      setIsLoading(false);
    };

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, [wsUrl]);

  const columns = [
    { key: "description", label: "DESCRIPTION" },
    { key: "type", label: "TYPE" },
    { key: "state", label: "STATE" },
    { key: "time", label: "ACTUAL DATE & TIME" },
    { key: "startDate", label: "INITIAL DATE & TIME" },
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
    <div className="w-full bg-[#131313] rounded-[15px] p-[20px] mt-[113px]">
      <div className="w-1/2 font-bold text-[#D9D9D9] mb-[15px]">
        <h1 className="text-[25px]">ALERT HISTORY</h1>
        <h2 className="text-[20px]">EXTENDED</h2>
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
              onClick={() => handleSort(column.key)}
            >
              {column.label}
              {sortConfig.key === column.key && (
                <span>{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
              )}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading && !error}
          items={!error ? paginatedRows : []}
          loadingContent={<Spinner label="Loading..." />}
        >
          {!error
            ? (item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell className="bg-[#131313] text-[#D9D9D9]">
                      {getKeyValue(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )
            : null}
        </TableBody>
      </Table>
      {error && (
        <div className="text-center mt-[4px] text-[#D9D9D9] h-[150px] flex flex-col justify-center items-center shadow-md rounded-[15px]">
          <div className="mb-2">{error}</div>
          <Button onClick={connectWebSocket} className="bg-[#761122]">
            Retry
          </Button>
        </div>
      )}
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-2 text-[#D9D9D9]">
          <label htmlFor="rows-per-page">Rows Per Page:</label>
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="bg-[#2C2C2C] text-[#D9D9D9] rounded-md p-[5px]"
            disabled={!!error}
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
          disabled={!!error}
        />
      </div>
    </div>
  );
};

export default Tabla;
