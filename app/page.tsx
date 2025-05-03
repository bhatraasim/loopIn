'use client'
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import Card_sm from "./components/Card-sm";
import Feed from "./components/Feed";
import VideoUploadForm from "./components/VideoUpload";
import PeopleYouMightKnow from "./components/PeopleYouMightKnow";

// Add this CSS to your global.css or a new stylesheet
const darkModeStyles = `
  /* Add these to your globals.css */
  :root {
    --bg-image: url('/bg-main.png');
  }
  
  .dark {
    --bg-image: none;
  }
`;

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Failed to get videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      {/* Inject CSS */}
      <style jsx global>{darkModeStyles}</style>
      
      <div 
        className="bg-base-100 dark:bg-black min-h-screen"
        style={{
          backgroundImage: 'var(--bg-image)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-8 my-10">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <VideoUploadForm />
              <Feed videos={videos} />
            </div>
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6 sticky top-8">
              <Card_sm 
                cardTitle="Buy premium" 
                para={
                  <span>
                    People viewed your profile in the last 7 days:{" "}
                    <strong>217</strong>
                  </span>
                }
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