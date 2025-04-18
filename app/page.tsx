"use client"
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import Card_sm from "./components/Card-sm";
import Feed from "./components/Feed";
import VideoUploadForm from "./components/VideoUpload";
import PeopleYouMightKnow from "./components/PeopleYouMightKnow";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([])

    const { data:session , status } = useSession({
      required:true,
      onUnauthenticated() {
        window.location.href = "/login"
      },
    })
    const router = useRouter()


    useEffect(() => {
      const fetchVideos = async () => {
        try {
          const data = await apiClient.getVideos()
          setVideos(data)
        } catch (error) {
          console.error("Failed to get videos:", error)
        }
      }
      
  
      fetchVideos()
    }, [])
    
    
    //   if (status === "unauthenticated") {
    //     router.replace("/login");
    //   }
  
    // // Show loading state while checking authentication
    // if (status === "loading") {
    //   return <div>Loading...</div>;
    // }
    

  
  return (
  <>
  
  
  <div className="bg-[url('/bg-main.png')] bg-cover bg-center bg-fixed min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 my-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-8">
            {/* Upload Form */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <VideoUploadForm />
            </div>

            {/* Feed */}
            <div className="space-y-6">
              <Feed videos={videos} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 sticky top-8">
            <Card_sm 
              cardTitle="Buy premium" 
              para={<span>People viewed your profile in the last 7 days: <strong>217</strong></span>} 
              btn_text="Premium" 
            />
            <PeopleYouMightKnow />
            
          </div>
        </div>
      </div>
    </div>
  </>
    
  );
}
