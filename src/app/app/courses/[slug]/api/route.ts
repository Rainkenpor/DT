import { NextRequest, NextResponse } from "next/server";


type ResponseData = {
  status: string;
  Resp:{
    Error: string;
    message: string;
    data: any;
  }
}

export async function GET (req: NextRequest,res: NextResponse<ResponseData>){
  const { searchParams } = new URL(req.url)  
  const slug = searchParams.get('slug')
  const base = process.env.BASE_URL;
  const respuesta = await fetch(`${base}/course/${slug}`, {
    cache: "no-cache",
  });
  return NextResponse.json(await respuesta.json(),{status:respuesta.status});
}
  

export async function PATCH (req: NextRequest,res: NextResponse<ResponseData>){  
  const base = process.env.BASE_URL;
  const data = await req.json()
  const id = data.hasOwnProperty('COURSE_ID') ? data.COURSE_ID : '';
  console.log(`${base}/course/${id}`)
  // console.log(`${base}/course/${data.COURSE_ID}`, data);
  const respuesta = await fetch(`${base}/course/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (respuesta.status !== 200) {
     console.log("Failed to update course");
  }
  
  return NextResponse.json(await respuesta.json(),{status:respuesta.status}); 
}