"use client";

import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from '@mui/material';
import { Box, Button, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";

const Tabla = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation('trad');
  const [rowsPerPage, setRowsPerPage] = useState(10); // Cambiado de 5 a 10
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const wsUrl = `ws://${process.env.NEXT_PUBLIC_IP}:${process.env.NEXT_PUBLIC_PORT}/ws/datos`;

  const connectWebSocket = () => {
    setIsLoading(true);
    setError(null);

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Extraer solo el array de alarmas (último elemento del array principal)
        const alarmas = Array.isArray(data) && data.length >= 4 ? data[3] : [];
        
        if (Array.isArray(alarmas) && alarmas.length > 0) {
          setItems((prevItems) => {
            const updatedItems = [...prevItems];

            alarmas.forEach((alarma) => {
              // Verificamos que la descripción no esté vacía
              if (alarma.descripcion && alarma.descripcion.trim() !== "") {
                const index = updatedItems.findIndex(
                  (item) => item.key === alarma.id_alarma.toString()
                );

                const newItem = {
                  key: alarma.id_alarma.toString(),
                  description: alarma.descripcion,
                  type: alarma.tipoAlarma,
                  state: alarma.estadoAlarma ? "Activo" : "Inactivo",
                  time: alarma.fechaRegistro,
                };

                if (index !== -1) {
                  updatedItems[index] = newItem;
                } else {
                  updatedItems.push(newItem);
                }
              }
            });

            // También podemos filtrar los items existentes para eliminar los que tengan descripción vacía
            return updatedItems.filter(item => item.description && item.description.trim() !== "");
          });
          setIsLoading(false);
        }
      } catch (err) {
        setError(t('min.noSePudieronObtenerDatos'));
        setIsLoading(false);
      }
    };

    socket.onerror = () => {
      setError(t('min.noSePudieronObtenerDatos'));
      setIsLoading(false);
    };

    return () => {
      socket.close();
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, [wsUrl]);

  // Convertir el formato de columnas al formato esperado por MaterialReactTable
  const columns = useMemo(() => [
    {
      accessorKey: 'description',
      header: t('mayus.descripcion'),
      size: 300,
    },
    {
      accessorKey: 'type',
      header: t('mayus.tipo'),
      size: 150,
    },
    {
      accessorKey: 'state',
      header: t('mayus.estado'),
      size: 150,
    },
    {
      accessorKey: 'time',
      header: t('mayus.fechaRegistro'),
      size: 200,
    },
  ], [t]);

  // Función para ordenar manualmente (mantenemos la lógica existente)
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

  // Paginación manual (mantenemos la lógica existente)
  const totalRows = sortedItems.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedRows = useMemo(
    () => sortedItems.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [sortedItems, page, rowsPerPage]
  );

  // Función mejorada para exportar filas a PDF con soporte para UTF-8
  const handleExportRowsToPDF = (rows) => {
    // Configurar PDF con fuente que soporte UTF-8
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });
    
    // Usar una fuente que soporte caracteres especiales
    doc.setFont("helvetica", "normal");
    
    // Extraer datos para la tabla
    const tableData = rows.map((row) => {
      return columns.map(col => {
        const value = row.original[col.accessorKey] || '';
        return String(value); // Asegurar que todos los valores son cadenas
      });
    });
    
    const tableHeaders = columns.map(c => c.header);

    // Configurar autoTable con opciones para caracteres especiales
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: 'grid',
      styles: { 
        fillColor: [41, 41, 41],
        textColor: [255, 255, 255],
        font: 'helvetica', 
        fontSize: 8,
        overflow: 'linebreak',
        cellPadding: 3
      },
      headStyles: { 
        fillColor: [25, 25, 25],
        textColor: [255, 255, 255],
        fontSize: 9,
        fontStyle: 'bold' 
      },
      // Definir anchos de columnas proporcionales
      columnStyles: {
        0: { cellWidth: 'auto' }, // Descripción
        1: { cellWidth: 60 },     // Tipo
        2: { cellWidth: 60 },     // Estado
        3: { cellWidth: 90 }      // Fecha
      },
    });

    // Añadir título
    doc.setFontSize(14);
    doc.text(t('mayus.historialDeAlertas'), doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
    
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    doc.setFontSize(10);
    doc.text(`${t('mayus.fechaHoraActual')}: ${formattedDate}`, doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

    doc.save("Alertas.pdf");
  };

  // Tema personalizado para Material-UI
  const customTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#761122',
      },
      background: {
        paper: '#131313',
        default: '#131313',
      },
      text: {
        primary: '#D9D9D9',
        secondary: '#AAAAAA',
      },
    },
    components: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#131313',
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          selectLabel: { color: '#ffffff' },
          selectRoot: { color: '#ffffff' },
          selectIcon: { color: '#ffffff' },
          displayedRows: { color: '#ffffff' },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: '#d9d9d9',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }
            },
          },
        },
      },
    },
  });

  // Configuración para MaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: paginatedRows,
    state: { 
      isLoading,
      pagination: {
        pageIndex: page - 1,
        pageSize: rowsPerPage, // Esto usará el nuevo valor por defecto (10)
      },
    },
    manualPagination: true,
    rowCount: totalRows,
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const currentPagination = {
          pageIndex: page - 1,
          pageSize: rowsPerPage
        };
        const newPagination = updater(currentPagination);
        setPage(newPagination.pageIndex + 1);
        setRowsPerPage(newPagination.pageSize);
      }
    },
    enableSorting: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    layoutMode: "grid",
    initialState: {
      density: 'spacious',
      pagination: {
        pageSize: 10, // Asegúrate de que este valor coincida con el valor inicial del estado
      }
    },

    // Estilo para la cabecera de la tabla
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#1F1F1F",
        color: "#d9d9d9",
        fontWeight: "bold",
        '& .MuiDivider-root': {
          backgroundColor: '#FFF5 !important',
          height: '20px',
          '&:hover': {
            backgroundColor: 'rgb(129, 129, 129) !important',
          },
        },
      },
    },

    muiTableHeadRowProps: {
      sx: {
        backgroundColor: "#1F1F1F",
      },
    },

    // Estilo para la barra de herramientas superior
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#131313",
        position: 'relative',
        '& .MuiInputBase-root': {
          color: '#d9d9d9',
        },
        '& .MuiInputBase-input': {
          color: '#d9d9d9',
        },
        '& .MuiSvgIcon-root': {
          color: '#d9d9d9',
        },
      },
    },

    // Estilos para el cuerpo de la tabla y otros elementos
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: "#131313",
        color: "#d9d9d9",
      },
    },
    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "#131313",
        "&:nth-of-type(odd)": {
          backgroundColor: "#131313",
        }
      },
    },
    muiTableFooterProps: {
      sx : {
        '& .MuiInputLabel-root': {
          color: '#d9d9d9',
        },
        '& .MuiFormLabel-root': {
          color: '#d9d9d9',
        }
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor: "#131313",
        color: "#d9d9d9",
        '& .MuiTablePagination-root': {
          color: '#d9d9d9',
        },
        '& .MuiSelect-icon': {
          color: '#d9d9d9',
        },
        '& .MuiInputBase-input': {
          color: '#d9d9d9',
        },
        '& .MuiSvgIcon-root': {
          color: '#d9d9d9',
        },
        '& .MuiInputLabel-root': {
          color: '#d9d9d9 !important',
        },
        '& .MuiFormLabel-root': {
          color: '#d9d9d9 !important',
        }
      },
    },
    muiTableProps: {
      sx: {
        '& .MuiInputLabel-root': {
          color: '#d9d9d9 !important',
        },
        '& .MuiSelect-select, & .MuiSelect-icon': {
          color: '#d9d9d9',
        }
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
      },
    },
    muiTableContainerProps: {
      sx: {
        backgroundColor: "#131313",
      },
    },
    muiSkeletonProps: {
      sx: {
        backgroundColor: "#131313",
      },
    },
    muiColumnActionsButtonProps: {
      sx: {
        color: '#d9d9d9',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },

    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        gap: 1,
      }}>
        {/* Botones de exportación a PDF */}
        <Box sx={{
          display: 'flex',
          gap: 1,
          gridColumn: 1,
          justifyContent: 'flex-start',
        }}>
          <Button
            onClick={() => handleExportRowsToPDF(table.getPrePaginationRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            color="primary"
            disabled={error || isLoading}
          >
            {t('mayus.descargarTodasPDF')}
          </Button>
          <Button
            onClick={() => handleExportRowsToPDF(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="outlined"
            color="primary"
            disabled={error || isLoading}
          >
            {t('mayus.descargarVisiblesPDF')}
          </Button>
        </Box>

        {/* Título de la tabla */}
        <Box sx={{
          gridColumn: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          justifyContent: 'center',
        }}>
          <Typography variant="h4" sx={{
            color: '#d9d9d9',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '-5px'
          }}>
            {t('mayus.historialDeAlertas')}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#d9d9d9' }}>
            {t('mayus.extendido')}
          </Typography>
        </Box>
      </Box>
    ),
  });

  return (
    <div className="w-full bg-[#131313] rounded-[15px] p-[20px] mt-[113px]">
      {error ? (
        <div className="text-center mt-[4px] text-[#D9D9D9] h-[150px] flex flex-col justify-center items-center shadow-md rounded-[15px]">
          <div className="mb-2">{error}</div>
          <Button 
            onClick={connectWebSocket} 
            variant="contained" 
            color="error" 
            sx={{backgroundColor: "#761122"}}
          >
            {t('min.reintentar')}
          </Button>
        </div>
      ) : (
        <ThemeProvider theme={customTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Tabla;
