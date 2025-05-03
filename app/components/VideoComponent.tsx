import Link from "next/link";
import { IVideo } from "@/models/Video";
import Comment from "./Comment";
import { useState } from "react";
import { Bookmark, MessageSquareDiff, ThumbsUp } from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface VideoComponentProps {
  video: IVideo;
}
const comments = [
  {
    id: 1,
    name: "Alice",
    replies: [
      {
        id: 2,
        name: "Bob",
        replies: [],
      },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    replies: [],
  },
];




export default function VideoComponent({ video }: VideoComponentProps) {

  const [commentOpen, setCommentOpen] = useState(false)
  const [commentData, setCommentData] = useState(comments)
  const [liked, setLiked] = useState<Boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(0)

  const toggleLike = async () => {
    try {
      const data = await apiClient.Like(video._id?.toString() || "")
      setLiked(data.liked);
      setLikeCount(Number(data.likeCount));
    } catch (error: any) {
      console.error("Error liking video:", error);
    }
  }
  return (
    // <Link href={`/video/${video._id}`} className="block">
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300 m-5 p-5">
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
            {liked ? "Liked" : "Like"} <ThumbsUp />  <div className="">{likeCount}</div> 
          </button>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200">
          <button className="flex items-center gap-4" onClick={() => setCommentOpen(!commentOpen)}>
            Comment <MessageSquareDiff />
            <div className="">
            </div>
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
