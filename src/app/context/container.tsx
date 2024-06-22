"use client"
import { usePageStore } from "@/store/page-store";


export default function Container({children}: Readonly<{children: React.ReactNode;}>) {
  const {page,icon} = usePageStore()
  return (
    <div className="w-full h-full flex flex-col p-5">
      <h1 className="text-4xl mb-2 font-bold">
        <span className={`mdi ${icon} mr-2 text-white/30`}></span>
        {page}
      </h1>
      <div className="h-[2px] w-full bg-white/30 mb-2"></div>
      <div className=" w-full h-1 basis-full overflow-auto">
      {children}
      </div> 
    </div>
  )
}