import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Header() {
    const {data:session} = useSession();
    const handleSignOut = async ()=>{
        try {
            signOut()
        } catch (error) {
            
        }
    }
  return (

    
    <div>
      
    </div>
  )
}

export default Header
