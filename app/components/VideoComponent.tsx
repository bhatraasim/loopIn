"use client"
import { IVideo } from "@/models/Video";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { Bookmark, MessageSquareDiff, ThumbsUp } from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface VideoComponentProps {
  video: IVideo;
}

function getInitials(email: string | undefined) {
  if (!email) return ""
  return email
    .split("@")[0]
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function getUsernameFromEmail(email: string | undefined) {
  if (!email) return "";
  return email.split("@")[0];
}


export default function VideoComponent({ video }: VideoComponentProps) {

  const [commentOpen, setCommentOpen] = useState(false)
  const [liked, setLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)

 
  useEffect(() => {
    const fetchInitialLikeStatus = async () => {
      try {
        const data = await apiClient.Like(video._id?.toString() || "");
        setLiked(data.liked);
        setLikeCount(Number(data.likeCount)); // Update likeCount
      } catch (error) {
        console.error("Error fetching initial like status:", error);
      }
    };

    fetchInitialLikeStatus();
  }, [video._id]);
  

  const toggleLike = async () => {
    try {
      const data = await apiClient.Like(video._id?.toString() || "")
      setLiked(data.liked)
      setLikeCount(Number(data.likeCount));
    } catch (error: unknown) {
      console.error("Error liking video:", error);
    }
  }


  const initials = getInitials(video.email);
  const username = getUsernameFromEmail(video.email);

  return (
    // <Link href={`/video/${video._id}`} className="block">
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300 m-5 p-5">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-[#2A7F68] flex items-center justify-center text-white font-bold">
            {initials}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium ">{username}</h3>
          <p className="text-sm text-gray-500">{video.email}</p>
        </div>
      </div>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <video
          src={video.videoUrl}
          controls
          className="w-full h-full object-cover rounded-lg"
          playsInline
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{video.title}</h2>
        <p className="text-gray-600 mt-2">{video.description}</p>
      </div>
      <hr className="my-3" />
      <div className=" flex items-center justify-between font-bold mt-3 mx-5">
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200 ">
          <button onClick={toggleLike} className="flex items-center gap-1"> 
            {liked ? "Liked" : "Like"} <ThumbsUp color={liked ? "red" : "black"}/>  {likeCount}
          </button>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200">
          <button className="flex items-center gap-4" onClick={() => setCommentOpen(!commentOpen)}>
            Comment <MessageSquareDiff />
          </button>
        
        </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200 ">Save <Bookmark /></div>
      </div>
      {commentOpen && video._id && (
        <div className=" fel justify-center ">
          <Comment videoId={video._id?.toString() || ""} />
        </div>
      )}
    </div>
    // </Link>
  );
}
