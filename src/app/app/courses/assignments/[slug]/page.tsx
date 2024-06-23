"use client";
import { notFound } from "next/navigation";
import View from "./view";
import { toast, Toaster } from "sonner";
import { useEffect, useRef, useState } from "react";
import { usePageStore } from "@/store/page-store";
import Table from "./table";

function getData({ params, setData }: any) {
  const resp = fetch(`./${params.slug}/api?slug=${params.slug}`, {
    cache: "no-cache",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (!res.Resp) return toast.error("Error al cargar datos");
      if (res.Resp.Error)
        return toast.error(`Error: ${res.Resp.Error}`, {
          description: res.Resp.message,
        });

      setData(res.Resp.data);
    })
    .catch((err) => {
      console.log("err = ", err);
      return toast.error("Error al cargar datos");
    });
  return resp;
}

function getDataAssign({ params, setData }: any) {
  const resp = fetch(`./${params.slug}/api?assign=${params.slug}`, {
    cache: "no-cache",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (!res.Resp) return toast.error("Error al cargar datos");
      if (res.Resp.Error)
        return toast.error(`Error: ${res.Resp.Error}`, {
          description: res.Resp.message,
        });
      const data =
        res.Resp.data && res.Resp.data.length > 0
          ? res.Resp.data.map((m: any) => {
              return {
                ...m.DT_STUDENT,
                STATUS: m.DT_STATUS,
                id: m.DT_STUDENT.STUDENT_ID,
              };
              return;
            })
          : [];
      setData(data);
    })
    .catch((err) => {
      console.log("err = ", err);
      return toast.error("Error al cargar datos");
    });
  return resp;
}

export default function CoursesId({ params }: any) {
  const { changePage } = usePageStore();
  let [data, setData] = useState<any>(null);
  let [assign, setAssign] = useState<any>(null);
  const render = useRef(false);

  useEffect(() => {
    if (render.current === false) {
      getData({ params, setData });
      getDataAssign({ params, setData: setAssign });
    }
    render.current = true;
  }, []);

  useEffect(() => {
    if (data) changePage(`Cursos / ${data.NAME}`, "mdi-school");
  }, [data]);

  const update = () => {
    getData({ params, setData });
  };

  return (
    <div>
      {data ? (
        <>
          <Toaster />
          <View data={data} update={update} />
          {assign && assign.length > 0 ? (
            <Table data={assign} />
          ) : (
            <div className="flex justify-center">
              <div className="text-center">
                <p className="text-2xl">No hay estudiantes asignados</p>
              </div>
            </div>
          )}
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
