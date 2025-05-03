
import { Camera, Video, Calendar, PersonStanding } from "lucide-react";

const PostBox = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl mx-auto flex flex-col gap-5 ">
      {/* Top Section */}
      <div className="flex items-center space-x-3 p-3 border-b ">
        {/* <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={50}
          height={50}
          className="rounded-full"
        /> */}
        <PersonStanding />
        <div className="w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        placeholder="Whats on your mind ..."
        className="w-full border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 text-lg p-2 mt-6"
      />
    </div>


    </div>
      
      {/* Bottom Section */}
      <div className="flex justify-around p-3 text-gray-600  ">
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <Camera size={20} /> <span>Photo</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <Video size={20} /> <span>Video</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-blue-600">
          <Calendar size={20} /> <span>Event</span>
        </button>
        <button className=" btn bg-[#1C836D] w-25 text-white">
          POST
        </button>
      </div>
    </div>
  );
};

export default PostBox;
