import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Toaster, toast } from "sonner";
import React from "react";

/**
 * Componente de vista de edición.
 *
 * @param label - Etiqueta del botón de apertura del modal (opcional, por defecto "Editar").
 * @param data - Datos del curso a editar.
 * @param update - Función para actualizar la lista de cursos después de guardar los cambios.
 * @returns El componente de vista de edición.
 */
export default function EditView({ label = "Editar", data, update }: any) {
  const [name, setName] = React.useState(data.NAME);
  const [description, setDescription] = React.useState(data.DESCRIPTION);
  const [maxStudents, setMaxStudents] = React.useState(data.MAX_STUDENTS);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName(data.NAME);
    setDescription(data.DESCRIPTION);
    setMaxStudents(data.MAX_STUDENTS);
    setOpen(false);
  };
  const handleSubmit = async () => {
    const resp: any = await fetch(`./courses/api`, {
      method: "POST",
      body: JSON.stringify({
        NAME: name,
        DESCRIPTION: description,
        MAX_STUDENTS: maxStudents,
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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Toaster />
      <Button variant="outlined" onClick={handleOpen}>
        {label}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {label}
          </Typography>
          <div
            id="modal-modal-description"
            className="mt-4 flex flex-col gap-5 mb-6"
          >
            <TextField
              label="Nombre"
              variant="outlined"
              size="small"
              className="w-full mb-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <TextField
              label="Descripción"
              variant="outlined"
              size="small"
              multiline
              className="w-full mb-6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <TextField
              label="Max. Estudiantes"
              variant="outlined"
              size="small"
              type="number"
              className="w-full mb-6"
              value={maxStudents}
              onChange={(e) => setMaxStudents(e.target.value)}
            ></TextField>
          </div>
          <div id="modal-modal-description" className="flex justify-between">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Guardar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
