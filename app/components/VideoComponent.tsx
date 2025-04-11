import Link from "next/link";
import { IVideo } from "@/models/Video";
import Comment from "./Comment";
import { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { Bookmark, MessageSquareDiff, ThumbsUp } from "lucide-react";

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
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200 ">Like <ThumbsUp /> </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200">
          <button className="flex items-center gap-4" onClick={() => setCommentOpen(!commentOpen)}>
            Comment <MessageSquareDiff />
            <div className="">
            </div>
          </button>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-2xl hover:bg-gray-200 ">Save <Bookmark /></div>
      </div>
      {commentOpen && video._id &&  (
  <div className=" fel justify-center ">
      <Comment videoId={video._id?.toString() || "" } />
  </div>
)}
    </div>
    // </Link>
  );
}
