import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Toaster, toast } from "sonner";
import React from "react";
import AssignmentSelect from "./assignment_select";

function getStudents(id: number, setStudents: any) {
  const resp: any = fetch(`./${id}/api?students=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.Resp.data);
      setStudents(data.Resp.data);
    });
}

/**
 * Componente de asignación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.data - Datos de la asignación.
 * @param {Function} props.update - Función para actualizar los datos de la asignación.
 * @returns {JSX.Element} El componente de asignación.
 */
export default function Assignment({ data, update }: any) {
  const [name, setName] = React.useState(data.NAME || "");
  const [students, setStudents] = React.useState<any[]>([]);
  const [studentsSelected, setStudentsSelected] = React.useState<any[]>([]);
  const [description, setDescription] = React.useState(data.DESCRIPTION || "");
  const [maxStudents, setMaxStudents] = React.useState(data.MAX_STUDENTS || "");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getStudents(data.COURSE_ID, setStudents);
    setOpen(true);
  };
  const handleClose = () => {
    setName(data.NAME);
    setDescription(data.DESCRIPTION);
    setMaxStudents(data.MAX_STUDENTS);
    setOpen(false);
  };
  const handleSubmit = async () => {
    const resp: any = await fetch(`./${data.COURSE_ID}/api?assign=true`, {
      method: "PATCH",
      body: JSON.stringify({
        COURSE_ID: data.COURSE_ID,
        STUDENTS: studentsSelected.map((s) => s.STUDENT_ID),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await resp.json();
    if (!response.Resp) return toast.error("Error al guardar cambios");
    if (response.Resp.Error)
      return toast.error("Error: " + response.Resp.Error, {
        description: response.Resp.message,
      });
    update();
    handleClose();
    toast.success(response.Resp.message);
  };

  const setSelect = (students: any) => {
    setStudentsSelected(students);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 670,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Toaster />
      <Button
        variant="outlined"
        size="small"
        color="success"
        onClick={handleOpen}
      >
        <span className="mdi mdi-clipboard-account-outline text-2xl mr-2"></span>{" "}
        Asignar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Asignación
          </Typography>
          <Divider />
          <br />
          <AssignmentSelect
            students={students}
            setSelect={setSelect}
          ></AssignmentSelect>
          <Divider />
          <div className="flex justify-between mt-2">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
