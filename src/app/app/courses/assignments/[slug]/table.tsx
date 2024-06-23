"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";
import Link from "next/link";
import Status from "./status";

/**
 * Componente de tabla para mostrar datos de cursos.
 *
 * @param data Los datos de los cursos a mostrar en la tabla.
 * @param active Indica si la tabla está activa o no. Por defecto, es verdadero.
 * @param update Una función opcional para actualizar el estado de un curso. Si no se proporciona, se mostrará la opción "Activar" en lugar de "Deshabilitar".
 * @returns El componente de tabla.
 */
export default function Table({
  data,
  active = true,
  toast,
  update = null,
}: any) {
  const columns: GridColDef[] = [
    { field: "STUDENT_ID", headerName: "ID", width: 70 },
    { field: "FIRST_NAME", headerName: "Nombre", width: 130 },
    { field: "LAST_NAME", headerName: "Apellidos", width: 130 },
    { field: "EMAIL", headerName: "Correo Electrónico", width: 280 },
    { field: "PHONE", headerName: "Teléfono", width: 130 },
    {
      field: "status",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (
        <Status data={params.row} update={update} toast={toast}></Status>
      ),
    },
    {
      field: "fieldName",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="text"
            size="small"
            style={{ marginRight: "10px" }}
            component={Link}
            href={`../../students/${params.row.STUDENT_ID}`}
          >
            <span className="mdi mdi-magnify text-2xl"></span>
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataGrid
        density="compact"
        autoHeight
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
