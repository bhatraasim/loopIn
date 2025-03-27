import Link from "next/link";
import { IVideo } from "@/models/Video";

interface VideoComponentProps {
  video: IVideo;
}

export default function VideoComponent({ video }: VideoComponentProps) {
  return (
    <Link href={`/video/${video._id}`} className="block">
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
      </div>
    </Link>
  );
}
