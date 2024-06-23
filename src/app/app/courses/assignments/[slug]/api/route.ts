import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
  status: string;
  Resp: {
    Error: string;
    message: string;
    data: any;
  };
};

export async function GET(req: NextRequest, res: NextResponse<ResponseData>) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const students = searchParams.get("students");
  const assign = searchParams.get("assign");
  const base = process.env.BASE_URL;

  if (slug) {
    const respuesta = await fetch(`${base}/api/v1/course/${slug}`, {
      cache: "no-cache",
    });
    return NextResponse.json(await respuesta.json(), {
      status: respuesta.status,
    });
  }
  if (students) {
    const respuesta = await fetch(`${base}/api/v1/student`, {
      cache: "no-cache",
    });
    if (respuesta.status === 204)
      return NextResponse.json(
        {
          status: "Success",
          Resp: {
            Error: "",
            message: "No data",
            data: [],
          },
        },
        { status: 200 }
      );

    return NextResponse.json(await respuesta.json(), {
      status: respuesta.status,
    });
  }
  if (assign) {
    console.log("assign = ", assign);
    const respuesta = await fetch(`${base}/api/v1/course_student/${assign}`, {
      cache: "no-cache",
    });
    // console.log("respuesta = ", respuesta);
    if (respuesta.status === 204)
      return NextResponse.json(
        {
          status: "Success",
          Resp: {
            Error: "",
            message: "No data",
            data: [],
          },
        },
        { status: 200 }
      );

    return NextResponse.json(await respuesta.json(), {
      status: respuesta.status,
    });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse<ResponseData>) {
  const { searchParams } = new URL(req.url);
  const assign = searchParams.get("assign");
  const status = searchParams.get("status");
  const base = process.env.BASE_URL;

  console.log("assign ----------------------->", assign);

  if (assign) {
    const data = await req.json();
    const id = data.hasOwnProperty("COURSE_ID") ? data.COURSE_ID : "";
    const respuesta = await fetch(`${base}/api/v1/course_student/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respuesta.status !== 201) {
      console.log("Failed to update course");
    }
    return NextResponse.json(await respuesta.json(), {
      status: respuesta.status,
    });
  }
  if (status) {
    const data = await req.json();
    const id = data.hasOwnProperty("COURSE_ID") ? data.COURSE_ID : "";
    const studentId = data.hasOwnProperty("STUDENT_ID") ? data.STUDENT_ID : "";
    console.log("studentId = ", id, studentId);
    const respuesta = await fetch(
      `${base}/api/v1/course_student/${id}/${studentId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (respuesta.status !== 201) {
      console.log("Failed to update course");
    }
    return NextResponse.json(await respuesta.json(), {
      status: respuesta.status,
    });
  }
}
