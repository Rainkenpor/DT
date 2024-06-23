"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Chip } from "@mui/material";
import Link from "next/link";

/**
 * Componente de tabla para mostrar datos de cursos.
 *
 * @param data Los datos de los cursos a mostrar en la tabla.
 * @param active Indica si la tabla está activa o no. Por defecto, es verdadero.
 * @param updateStatus Una función opcional para actualizar el estado de un curso. Si no se proporciona, se mostrará la opción "Activar" en lugar de "Deshabilitar".
 * @returns El componente de tabla.
 */
export default function Table({
  data,
  active = true,
  updateStatus = null,
}: any) {
  console.log("data = ", data);
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
        <Chip
          label={params.row.STATUS.NAME}
          component="a"
          href="#basic-chip"
          variant="outlined"
          clickable
        />
      ),
    },
    {
      field: "fieldName",
      headerName: "Acciones",
      width: 200,
      renderCell: (params) => (
        <div>
          {active ? (
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

              {/* <Button
                variant="text"
                size="small"
                color="error"
                onClick={() => {
                  updateStatus(params.row.STUDENT_ID, 2);
                }}
              >
                <span className="mdi mdi-circle-off-outline text-2xl"></span>
              </Button> */}
            </div>
          ) : (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                updateStatus(params.row.STUDENT_ID, 1);
              }}
            >
              <span className="mdi mdi-checkbox-marked-circle-outline text-2xl"></span>
            </Button>
          )}
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
