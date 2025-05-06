"use client";

import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from '@mui/material';
import { Box, Button, Typography, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";
import * as XLSX from 'xlsx';

const Tabla = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation('trad');
  const [rowsPerPage, setRowsPerPage] = useState(10); // Cambiado de 5 a 10
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Estado para el menú de exportación
  const [exportMenuAnchorEl, setExportMenuAnchorEl] = useState(null);
  const exportMenuOpen = Boolean(exportMenuAnchorEl);

  const handleExportMenuClick = (event) => {
    setExportMenuAnchorEl(event.currentTarget);
  };

  const handleExportMenuClose = () => {
    setExportMenuAnchorEl(null);
  };
  
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
      size: 400,
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
      filterFn: (row, columnId, filterValue) => {
        // Si no hay valor de filtro, mostrar todas las filas
        if (!filterValue) return true;
        
        const rowValue = row.original.time;
        if (!rowValue) return false;
        
        try {
          // Convertir el filtro a minúsculas para hacerlo insensible a mayúsculas/minúsculas
          const filterText = String(filterValue).toLowerCase().trim();
          
          // Usar el valor completo (fecha y hora) para la comparación
          const fullValue = rowValue.toLowerCase();
          
          // Verificar si la fecha/hora completa contiene el texto del filtro
          return fullValue.includes(filterText);
        } catch (e) {
          console.error('Error al filtrar por fecha/hora:', e);
          return false;
        }
      }
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

  const handleExportRowsToPDF = (rows) => {
    try {
      // Configurar PDF con fuente que soporte UTF-8
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'A4'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Extraer datos para la tabla
      const tableData = rows.map((row) => {
        return columns.map(col => {
          const value = row.original[col.accessorKey] || '';
          if (col.accessorKey === 'time' && typeof value === 'string') {
            // Formatear fecha si es posible
            try {
              const date = new Date(value);
              return date.toISOString().slice(0, 16).replace("T", " ");
            } catch (e) {
              return String(value); 
            }
          }
          return String(value);
        });
      });
      
      const tableHeaders = columns.map(c => c.header);
      const totalTexto = `Total de registros: ${rows.length}`;
      const exportDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  
      // CABECERA personalizada
      const headerHeight = 70;
      doc.setFillColor(19, 19, 19); // Fondo oscuro
      doc.rect(0, 0, pageWidth, headerHeight, 'F');
    
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
    
      doc.text('Fecha de exportación:', 20, 25);
      doc.text('Contacto: soporte@creminox.com', 20, 40);
      doc.text(totalTexto, 20, 55);
    
      doc.setFont('helvetica', 'normal');
      doc.text(exportDate, 130, 25);
      
      // Si deseas agregar un logo, necesitarías importarlo primero
  
      // Configurar autoTable con opciones mejoradas
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
        theme: 'grid',
        margin: { top: headerHeight + 10 },
        styles: { 
          fillColor: [41, 41, 41],
          textColor: [255, 255, 255],
          fontSize: 9,
          overflow: 'linebreak',
          cellPadding: 3
        },
        headStyles: { 
          fillColor: [25, 25, 25],
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold' 
        },
        alternateRowStyles: {
          fillColor: [30, 30, 30],
        },
        tableLineColor: [100, 100, 100],
        tableLineWidth: 0.1,
      });
  
      doc.save("Alertas.pdf");
    } catch (error) {
      console.error("Error al generar PDF:", error);
      // Podrías agregar un toast de error aquí
    }
  };

  const handleExportExcel = (rows, fileName) => {
    try {
      // Preparar los datos para Excel
      const excelData = rows.map(row => {
        const rowData = {};
        
        columns.forEach(column => {
          const key = column.accessorKey;
          let value = row.original[key];
          
          // Formatear la fecha si es la columna de tiempo
          if (key === 'time' && typeof value === 'string') {
            try {
              const date = new Date(value);
              value = date.toISOString().slice(0, 16).replace("T", " ");
            } catch (e) {
              // Si hay un error al formatear la fecha, mantener el valor original
            }
          }
          
          // Usar el header traducido como nombre de columna
          const headerName = column.header;
          rowData[headerName] = value;
        });
        
        return rowData;
      });
      
      // Crear una hoja de cálculo
      const workSheet = XLSX.utils.json_to_sheet(excelData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "Alertas");
      
      // Generar y descargar el archivo
      XLSX.writeFile(workBook, `${fileName}.xlsx`);
      
      toast.success('Éxito', {
        description: 'Excel descargado correctamente',
        position: 'bottom-right'
      });
    } catch (error) {
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Error al generar el Excel',
        position: 'bottom-right'
});
    }
    
    handleExportMenuClose();
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
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#131313 !important',
          }
        },
      },
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
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#131313 !important',
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
    renderEmptyRowsFallback: () => (
      <Box
        sx={{
          textAlign: 'center',
          padding: '2rem',
          color: '#d9d9d9'
        }}
      >
        {t('min.noExistenDatosParaLaFechaIndicada')}
      </Box>
    ),
    enableSorting: true,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    layoutMode: "grid",
    initialState: {
      density: 'spacious',
      pagination: {
        pageSize: 10, // Asegúrate de que este valor coincida con el valor inicial del estado
      },
      showColumnFilters: true,
    },

    // Estilo para la cabecera de la tabla
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#131313",
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
        backgroundColor: "#131313",
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
        backgroundColor: '#131313 !important',
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
            id="export-button"
            aria-controls={exportMenuOpen ? 'export-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={exportMenuOpen ? 'true' : undefined}
            onClick={handleExportMenuClick}
            startIcon={<FileDownloadIcon />}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#761122",
              width: "319px", // Ancho fijo que coincida con el menú
              '&:hover': {
                backgroundColor: '#761122',
              },
              paddingLeft: "16px" // Espacio para que no esté pegado al borde
            }}
          >
            {t('mayus.exportar')}
          </Button>
          
          <Menu
            id="export-menu"
            anchorEl={exportMenuAnchorEl}
            open={exportMenuOpen}
            onClose={handleExportMenuClose}
            MenuListProps={{
              'aria-labelledby': 'export-button',
            }}
          >
            <MenuItem onClick={() => handleExportRowsToPDF(sortedItems.map(item => ({ original: item })))}>
              {t('mayus.exptodaspdf')}
            </MenuItem>
            <MenuItem onClick={() => handleExportRowsToPDF(table.getRowModel().rows)}>
              {t('mayus.expvisiblespdf')}
            </MenuItem>
            <MenuItem onClick={() => handleExportExcel(sortedItems.map(item => ({ original: item })), "Todas_Alertas")}>
              {t('mayus.exptodasexcel')}
            </MenuItem>
            <MenuItem onClick={() => handleExportExcel(table.getRowModel().rows, "Alertas_Visibles")}>
              {t('mayus.expvisiblesexcel')}
            </MenuItem>
          </Menu>
        </Box>

        {/* Título de la tabla */}
        <Box sx={{
          gridColumn: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'none',
          justifyContent: 'center',
          marginLeft: '185px'
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
    <div className="w-full bg-[#131313] rounded-[15px] p-[20px] mx-[10px] my-[10px] mt-[123px]">
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
