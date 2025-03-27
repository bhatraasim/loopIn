'use client';
import React, { useEffect, useState } from 'react';
import { UserPlus, Search, Users } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { IUser } from '@/models/User';

function getInitials(email: string | undefined) {
    if (!email) return "";
    return email
        .split("@")[0]
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

export default function AllUsers() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredUsers = users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8  mt-50">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-600">Error loading users: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <Users className="w-8 h-8 text-[#2A7F68]" />
                    <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2A7F68] focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No users found</p>
                    {searchQuery && (
                        <p className="text-gray-400 mt-2">Try adjusting your search</p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div
                            key={user._id?.toString()}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#2A7F68] flex items-center justify-center text-2xl font-semibold text-white">
                                    {getInitials(user.email)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">
                                        {user.email.split('@')[0]}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Member since {new Date(user.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="flex items-center gap-2 px-4 py-2 bg-[#2A7F68] text-white rounded-lg hover:bg-[#1C836D] transition-colors duration-300">
                                    <UserPlus className="w-4 h-4" />
                                    <span>Connect</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
