'use client';
import React, { useEffect, useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
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

export default function AllUsersChat() {
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
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                </div>
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <p className="text-red-600">Error loading users: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full p-4 ps-10 text-sm rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-emerald-600 shadow-sm"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Users List */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contacts</h2>
                    
                    {filteredUsers.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-500 text-lg">No users found</p>
                            {searchQuery && (
                                <p className="text-gray-400 mt-2">Try adjusting your search</p>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user._id?.toString()}
                                    className="flex items-center justify-between py-4 px-2  rounded-lg transition-colors hover:bg-gray-200 duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-base font-medium text-white shadow-md">
                                            {getInitials(user.email)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {user.email.split('@')[0]}
                                            </h3>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        className="p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors duration-200 flex items-center justify-center"
                                        aria-label="Message user"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}