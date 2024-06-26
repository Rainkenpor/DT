"use client";
import { Button, TextField } from "@mui/material";
import Edit from "./edit";
import { useRouter } from "next/navigation";

export default function View({ data, update }: any) {
  const router = useRouter();
  const handleBack = () => {
    // Router back
    router.back();
  };

  return (
    <div>
      Id: {data.STUDENT_ID}
      <div className="mt-4">
        <TextField
          label="Nombres:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.FIRST_NAME}
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          label="Apellidos:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.LAST_NAME}
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          label="Email:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.EMAIL}
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          label="Teléfono:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.PHONE}
        ></TextField>
      </div>
      {/* divider */}
      <div className="bg-gray-200/30 h-[1px] w-full mt-2 mb-2"></div>
      <div className="flex justify-between">
        <Button variant="outlined" onClick={handleBack}>
          Regresar
        </Button>
        <Edit data={data} update={update}></Edit>
      </div>
    </div>
  );
}
