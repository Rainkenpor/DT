import {
  Box,
  Button,
  Chip,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Status({ label = "Editar", data, toast, update }: any) {
  const [status, setStatus] = React.useState(data.STATUS_ID);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setStatus(data.STATUS_ID);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const resp: any = await fetch(`./${data.COURSE_ID}/api?status=true`, {
      method: "PATCH",
      body: JSON.stringify({
        COURSE_ID: data.COURSE_ID,
        STUDENT_ID: data.STUDENT_ID,
        STATUS_ID: status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    handleClose();

    const response = await resp.json();
    if (!response.Resp) return toast.error("Error al guardar cambios");
    if (response.Resp.Error)
      return toast.error("Error: " + response.Resp.Error, {
        description: response.Resp.message,
      });
    update();
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
    <>
      <Chip label={data.STATUS.NAME} variant="outlined" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cambiar de Estado
          </Typography>
          <div
            id="modal-modal-description"
            className="mt-4 flex flex-col gap-5 mb-6"
          >
            <TextField
              label="Nombres:"
              variant="outlined"
              size="small"
              className="w-full mb-6"
              value={data.FIRST_NAME}
              disabled
            ></TextField>
            <TextField
              label="Apellidos:"
              variant="outlined"
              size="small"
              multiline
              className="w-full mb-6"
              value={data.LAST_NAME}
              disabled
            ></TextField>
            <Select
              label="Estado:"
              variant="outlined"
              size="small"
              className="w-full mb-6"
              id="demo-simple-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={3}>Pendiente</MenuItem>
              <MenuItem value={4}>Aprobado</MenuItem>
              <MenuItem value={5}>Rechazado</MenuItem>
            </Select>
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
    </>
  );
}
