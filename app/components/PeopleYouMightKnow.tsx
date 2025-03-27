"use client"
import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { IUser } from '@/models/User';

function getInitials(email: string | undefined) {
    if (!email) return ""; // Return empty if email is undefined
    return email
        .split("@")[0]
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

function PeopleYouMightKnow() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await apiClient.getUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-5 w-96 mt-20">
                <h2 className="text-lg font-semibold mb-3">People you might know</h2>
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-5 w-96 mt-20">
                <h2 className="text-lg font-semibold mb-3">People you might know</h2>
                <p className="text-red-500">Error loading users</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-5 w-96 mt-20">
            <h2 className="text-lg font-semibold mb-3">People you might know</h2>
            {users.length === 0 ? (
                <p className="text-gray-500">No users found</p>
            ) : (
                users.slice(4, 7).map((user) => (
                    <div key={user._id?.toString()} className="flex items-center justify-between border-b py-3 last:border-b-0">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#2A7F68] flex items-center justify-center text-lg font-semibold text-white">
                                {getInitials(user.email)}
                            </div>
                            <div>
                                <p className="font-semibold">{user.email.split('@')[0]}</p>
                                <p className="text-sm text-gray-500">Member since </p>
                                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 transition">
                            <UserPlus size={16} /> Connect
                        </button>
                    </div>
                ))
            )}
            <div className="text-center mt-3">
                <Link href="/network" className="text-blue-600 hover:underline">
                    View all recommendations →
                </Link>
            </div>
        </div>
    );
}

export default PeopleYouMightKnow;
