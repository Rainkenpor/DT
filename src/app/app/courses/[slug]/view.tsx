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
      Id: {data.COURSE_ID}
      <div className="mt-4">
        <TextField
          label="Descripción:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.DESCRIPTION}
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          label="Max. Estudiante:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.MAX_STUDENTS}
        ></TextField>
      </div>
      <div className="mt-4">
        <TextField
          label="Estudiantes Registrados:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.NUMBER_OF_STUDENTS}
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
