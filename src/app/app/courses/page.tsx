"use client";
import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import Table from "./table";
import New from "./new";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

/**
 * Obtiene los datos de los cursos.
 *
 * @param {Object} options - Las opciones de configuración.
 * @param {Function} options.setData - La función para establecer los datos obtenidos.
 * @param {string} options.status - El estado de los cursos a obtener.
 * @returns {Promise} - Una promesa que se resuelve con los datos obtenidos.
 */
function getData({ setData, status }: any) {
  const resp = fetch(`./courses/api?status=${status}`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.Resp) return toast.error("Error al cargar datos");
      if (res.Resp.Error) {
        setData([]);
        return toast.error(`Error: ${res.Resp.Error}`, {
          description: res.Resp.message,
        });
      }
      console.log("res.Resp.data = ", res.Resp.data);
      setData(
        res.Resp.data.map((item: any) => ({
          ...item,
          id: item.COURSE_ID,
        }))
      );
    })
    .catch((err) => {
      return toast.error("Error al cargar datos");
    });
  return resp;
}

/**
 * Actualiza los datos de un curso.
 *
 * @param {Object} options - Las opciones de actualización.
 * @param {string} options.id - El ID del curso a actualizar.
 * @param {string} options.status - El nuevo estado del curso.
 * @param {Function} options.callback - La función de devolución de llamada para manejar la respuesta.
 * @returns {Promise<any>} - Una promesa que se resuelve con los datos actualizados del curso.
 */
function updateData({ id, status, callback }: any) {
  const resp = fetch(`./courses/api`, {
    method: "PATCH",
    body: JSON.stringify({ COURSE_ID: id, STATUS_ID: status }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.Resp) return toast.error("Error al cargar datos");
      if (res.Resp.Error)
        return toast.error(`Error: ${res.Resp.Error}`, {
          description: res.Resp.message,
        });
      callback(res.Resp.data);
    })
    .catch((err) => {
      console.log("err = ", err);
      return toast.error("Error al cargar datos");
    });
  return resp;
}

/**
 * Componente que muestra una página de cursos.
 *
 * @returns El componente de la página de cursos.
 */
export default function Courses() {
  const [courseDataActive, setCourseDataActive] = useState<any>(null);
  const [courseDataInactive, setCourseDataInactive] = useState<any>(null);
  const render = useRef(false);
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (render.current === false) {
      getData({ setData: setCourseDataActive, status: 1 });
      getData({ setData: setCourseDataInactive, status: 2 });
    }
    render.current = true;
  }, []);

  const update = () => {
    getData({ setData: setCourseDataActive, status: 1 });
    getData({ setData: setCourseDataInactive, status: 2 });
  };

  const updateStatus = (id: number, status: number) => {
    updateData({ id, status, callback: update });
  };

  const updateAssignment = (id: number, status: number) => {
    // updateData({ id, status, callback: update });
    console.log("id = ", id);
    console.log("status = ", status);
  };

  return (
    <div>
      {courseDataActive ? (
        <>
          <Toaster />
          <div className="flex justify-end mb-4">
            <New
              label="Nuevo Curso"
              data={courseDataActive}
              update={update}
            ></New>
          </div>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Cursos Activos" value="1" />
                <Tab label="Cursos Inactivos" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Table
                data={courseDataActive}
                updateAssignment={updateAssignment}
                updateStatus={updateStatus}
              ></Table>
            </TabPanel>
            <TabPanel value="2">
              <Table
                data={courseDataInactive}
                active={false}
                updateStatus={updateStatus}
              ></Table>
            </TabPanel>
          </TabContext>
        </>
      ) : (
        <>
          <Toaster />
          Loading...
        </>
      )}
    </div>
  );
}
