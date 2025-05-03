"use client"
import React, { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { apiClient } from '@/lib/api-client'
import { IUser } from '@/models/User'

function getInitials(email: string | undefined) {
  if (!email) return ""
  return email
    .split("@")[0]
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function PeopleYouMightKnow() {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await apiClient.getUsers()
        setUsers(fetchedUsers)
      } catch (err) {
        console.error('Error fetching users:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="card bg-base-100 shadow-md p-5 w-96 mt-20">
      <h2 className="text-lg font-semibold mb-3 text-base-content">People you might know</h2>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-base-300 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-base-300 rounded w-3/4" />
                <div className="h-3 bg-base-300 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-error">Error loading users</p>
      ) : users.length === 0 ? (
        <p className="text-base-content/60">No users found</p>
      ) : (
        users.slice(4, 7).map((user) => (
          <div key={user._id?.toString()} className="flex items-center justify-between border-b border-base-300 py-3 last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2A7F68]  flex items-center justify-center text-lg font-semibold text-white">
                {getInitials(user.email)}
              </div>
              <div>
                <p className="font-semibold text-base-content">{user.email.split('@')[0]}</p>
                <p className="text-sm text-base-content/60">Member since</p>
                <p className="text-sm text-base-content">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button className="btn btn-sm btn-outline btn-primary">
              <UserPlus size={16} /> Connect
            </button>
          </div>
        ))
      )}

      <div className="text-center mt-4">
        <Link href="/network" className="text-[#2A7F68]  hover:underline">
          View all recommendations →
        </Link>
      </div>
    </div>
  )
}

export default PeopleYouMightKnow
