"use client"
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { sign } from "crypto";
import { signOut } from "next-auth/react";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [videos, setVideos] = useState<IVideo[]>([])

  useEffect(() => {
    const fetchVideos = async ()=>{
      try {
        const data = await apiClient.getVideos()
        setVideos(data) 
      } catch (error) {
        console.error("failed to get vedios ")
      }
    }
  }, [])
  
  return (
    <>
   <button onClick={()=>signOut} >logout</button>
    
    </>
  );
}
