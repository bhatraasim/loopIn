import { Bell } from 'lucide-react'
import React from 'react'

function BellNotification() {
  return (

    <div className="dropdown dropdown-end ">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost btn-circle hover:bg-base-300 transition-all "
      >
        <Bell size={20} />
      </div>
      <ul 
        tabIndex={0} 
        className="dropdown-content menu bg-base-100 rounded-lg shadow-xl w-64 p-4 mt-2 border border-base-300"
      >
        <li>
        </li>
        <li>
        </li>
        <li>
            <div className="flex justify-center items-center">
                No Notifications
            </div>
        </li>
        <li>
          
        </li>
        <li>
          
        </li>
      </ul>
      
    </div>
  )
}

export default BellNotification
