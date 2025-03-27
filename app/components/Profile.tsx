import { PersonStanding, User, LogOut, Settings } from 'lucide-react';
import React from 'react';

function Profile() {
  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle hover:bg-base-300 transition-all p-2"
      >
        <PersonStanding className="text-[#2A7F68] w-10 h-10 font-extrabold stroke-[3]" />
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content menu bg-base-100 rounded-lg shadow-xl w-64 p-4 mt-2 border border-base-300"
      >
        <li className="flex flex-col items-center border-b pb-2 mb-2">
          <div className="w-14 h-14 rounded-full bg-[#2A7F68] flex items-center justify-center text-white text-2xl font-bold">
            RB
          </div>
          <p className="mt-2 text-lg font-semibold">Rasim Bhat</p>
          <p className="text-sm text-gray-500">rasim@example.com</p>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-[#2A7F68] hover:text-white rounded-md p-2 transition-all">
            <User className="w-5 h-5" /> Profile
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-gray-300 hover:text-black rounded-md p-2 transition-all">
            <Settings className="w-5 h-5" /> Settings
          </a>
        </li>
        <li>
          <a className="flex items-center gap-2 hover:bg-red-400 hover:text-white rounded-md p-2 transition-all">
            <LogOut className="w-5 h-5" /> Log Out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Profile;