"use client";
import { notFound } from "next/navigation";
import View from "./view";
import { toast, Toaster } from "sonner";
import { useEffect, useRef, useState } from "react";
import { usePageStore } from "@/store/page-store";

function getData({ params, setData }: any) {
  const resp = fetch(`./${params.slug}/api?slug=${params.slug}`, {
    cache: "no-cache",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res = ", res);
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

export default function CoursesId({ params }: any) {
  const { changePage } = usePageStore();
  let [data, setData] = useState<any>(null);
  const render = useRef(false);

  useEffect(() => {
    if (render.current === false) {
      getData({ params, setData });
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
