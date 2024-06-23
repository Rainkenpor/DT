"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
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
  const columns: GridColDef[] = [
    { field: "COURSE_ID", headerName: "ID", width: 70 },
    { field: "NAME", headerName: "Nombre", width: 130 },
    { field: "DESCRIPTION", headerName: "Descripción", width: 280 },
    {
      field: "MAX_STUDENTS",
      headerName: "Max. Estudiantes",
      type: "number",
      width: 130,
    },
    {
      field: "NUMBER_OF_STUDENTS",
      headerName: "No. Estudiantes",
      type: "number",
      width: 130,
    },

    {
      field: "fieldName",
      headerName: "Acciones",
      width: 230,
      renderCell: (params) => (
        <div>
          {active ? (
            <div>
              <Button
                variant="text"
                size="small"
                component={Link}
                href={`./courses/${params.row.COURSE_ID}`}
              >
                <span className="mdi mdi-magnify text-2xl"></span>
              </Button>

              <Button
                variant="text"
                size="small"
                component={Link}
                href={`./courses/assignments/${params.row.COURSE_ID}`}
              >
                <span className="mdi mdi-clipboard-account-outline text-2xl"></span>
              </Button>

              <Button
                variant="text"
                size="small"
                color="error"
                onClick={() => {
                  updateStatus(params.row.COURSE_ID, 2);
                }}
              >
                <span className="mdi mdi-circle-off-outline text-2xl"></span>
              </Button>
            </div>
          ) : (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                updateStatus(params.row.COURSE_ID, 1);
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
