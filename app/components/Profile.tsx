import { User, LogOut, Settings, PenLine } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import BlurredCard from './ChangePassword';

function Profile() {
  const [showCard, setShowCard] = useState(false)
  const { data: session } = useSession();
  function getUsernameFromEmail(email: string | null | undefined): string {
    if (!email) return ""; // Handle null/undefined case
    return email.split("@")[0];
  }
  function getInitials(name: string | null | undefined): string {
    if (!name) return ""; // Handle null/undefined case
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };


  return (
    <div className="dropdown dropdown-end ">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle hover:bg-base-300 transition-all "
      >
        <User className="text-[#2A7F68] font-extrabold stroke-[3]" />
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content menu bg-base-100 rounded-lg shadow-xl w-64 p-4 mt-2 border border-base-300"
      >
        <li className="flex flex-col items-center border-b pb-2 mb-2">
          <div className="w-14 h-14 rounded-full bg-[#2A7F68] flex items-center justify-center text-white text-2xl font-bold">
            {getInitials(session?.user.email)}
          </div>
          <p className="mt-2 text-lg font-semibold">{getUsernameFromEmail(session?.user.email)}</p>    
          <p className="text-sm text-gray-500">{session?.user.email}</p>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-[#2A7F68] hover:text-white rounded-md p-2 transition-all">
            <User className="w-5 h-5" /> Profile
          </a>
        </li>
        <li>
        <a className="flex items-center gap-2 hover:bg-[#2A7F68] hover:text-white rounded-md p-2 transition-all">
          <button className='flex gap-2 ' onClick={()=>setShowCard(true)}><PenLine /> Change password </button>
        </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-gray-300 hover:text-black rounded-md p-2 transition-all">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-red-400 hover:text-white rounded-md p-2 transition-all">
            <button className='flex' onClick={handleLogout}> <LogOut className="w-5 h-5" /> Log Out</button>
          </a>
        </li>
      </ul>
      {showCard && (
        <BlurredCard
          title="Change passwrod"
          onClose={() => setShowCard(false)}
        />
      )}
    </div>
  );
}

export default Profile;