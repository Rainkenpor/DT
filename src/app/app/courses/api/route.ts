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
  const status = searchParams.get('status')
  const students = searchParams.get('students')
  const base = process.env.BASE_URL;
  

  if (status) {
    const respuesta = await fetch(`${base}/course?status=${status}`, {
      cache: "no-cache",
    });
    if (respuesta.status === 204) return NextResponse.json({
      status: 'Success',
      Resp:{
        Error: '',
        message: 'No data',
        data: []
      }
    },{status:200});
    
    return NextResponse.json(await respuesta.json(),{status:respuesta.status});
  }
  if (students) {
    const respuesta = await fetch(`${base}/student`, {
      cache: "no-cache",
    });
    if (respuesta.status === 204) return NextResponse.json({
      status: 'Success',
      Resp:{
        Error: '',
        message: 'No data',
        data: []
      }
    },{status:200});
    
    return NextResponse.json(await respuesta.json(),{status:respuesta.status});
  }
}


export async function POST (req: NextRequest,res: NextResponse<ResponseData>){  
  const base = process.env.BASE_URL;
  const data = await req.json()
  const respuesta = await fetch(`${base}/course`, {
    method: "POST",
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

export async function PATCH (req: NextRequest,res: NextResponse<ResponseData>){  
  const { searchParams } = new URL(req.url)  
  const assign = searchParams.get('assign')
  const base = process.env.BASE_URL;

  console.log('assign ----------------------->',assign)

  if (!assign){
    const data = await req.json()
    const id = data.hasOwnProperty('COURSE_ID') ? data.COURSE_ID : '';
    const respuesta = await fetch(`${base}/course/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respuesta.status !== 201) {
      console.log("Failed to update course");
    }
    return NextResponse.json(await respuesta.json(),{status:respuesta.status}); 
  }else{
    const data = await req.json()
    const id = data.hasOwnProperty('COURSE_ID') ? data.COURSE_ID : '';
    const respuesta = await fetch(`${base}/course_student/${id}`, { 
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respuesta.status !== 201) {
      console.log("Failed to update course");
    }
    return NextResponse.json(await respuesta.json(),{status:respuesta.status}); 
  }
}