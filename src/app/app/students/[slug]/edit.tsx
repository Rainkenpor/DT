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
  const [firstName, setFirstName] = React.useState(data.FIRST_NAME || "");
  const [lastName, setLastName] = React.useState(data.LAST_NAME || "");
  const [email, setEmail] = React.useState(data.EMAIL || "");
  const [phone, setPhone] = React.useState(data.PHONE || "");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFirstName(data.FIRST_NAME);
    setLastName(data.LAST_NAME);
    setEmail(data.EMAIL);
    setPhone(data.PHONE);
    setOpen(false);
  };

  const validEmail = (email: string) => {
    if (!email || email.length === 0) return true;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validPhone = (phone: string) => {
    if (!phone || phone.length === 0) return true;
    const re = /^[0-9]{8}$/;
    return re.test(phone);
  };

  const handleSubmit = async () => {
    const resp: any = await fetch(`./${data.STUDENT_ID}/api`, {
      method: "PATCH",
      body: JSON.stringify({
        STUDENT_ID: data.STUDENT_ID,
        FIRST_NAME: firstName,
        LAST_NAME: lastName,
        EMAIL: email,
        PHONE: phone,
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
              label="Nombres"
              variant="outlined"
              size="small"
              className="w-full mb-6"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></TextField>
            <TextField
              label="Apellidos"
              variant="outlined"
              size="small"
              multiline
              className="w-full mb-6"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></TextField>
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              size="small"
              type="email"
              className="w-full mb-6"
              error={!validEmail(email)}
              helperText={!validEmail(email) ? "Correo no válido" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              label="Teléfono"
              variant="outlined"
              size="small"
              type="email"
              className="w-full mb-6"
              error={!validPhone(phone)}
              helperText={!validPhone(phone) ? "Teléfono no válido" : ""}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></TextField>
          </div>
          <div id="modal-modal-description" className="flex justify-between">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={
                !validEmail(email) ||
                !validPhone(phone) ||
                !firstName ||
                !lastName ||
                !email ||
                !phone
              }
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
