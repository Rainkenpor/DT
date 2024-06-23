"use client";
import { Button, TextField } from "@mui/material";

import { useRouter } from "next/navigation";
import Assignment from "./assignment";

export default function View({ data, update }: any) {
  const router = useRouter();
  const handleBack = () => {
    // Router back
    router.back();
  };

  return (
    <div>
      Id: {data.COURSE_ID}
      <div className="mt-4 flex justify-between gap-2">
        <TextField
          label="Descripción:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.DESCRIPTION}
        ></TextField>

        <TextField
          label="Max. Estudiante:"
          variant="outlined"
          size="small"
          className="w-full mb-3"
          disabled
          value={data.MAX_STUDENTS}
        ></TextField>

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
      <div className="flex justify-end">
        {/* <Button variant="outlined" onClick={handleBack}>
          Regresar
        </Button> */}
        <Assignment data={data} update={update} />
      </div>
    </div>
  );
}
