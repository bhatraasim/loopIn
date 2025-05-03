'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Search, MessageCircle, Send, X } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { IUser } from '@/models/User';
import { initSocket } from '@/lib/socket';
import { Socket } from 'socket.io-client';
import { Session } from 'inspector/promises';
import { useSession } from 'next-auth/react';

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
    const { data: session } = useSession();
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<{ sender: string, text: string, timestamp: Date }[]>([]);
    const socketRef = useRef<Socket | null >(null);


     // Initialize socket connection
     useEffect(() => {
        if (socketRef.current) {
            socketRef.current = initSocket();
          }

       //handle the private message 
       if(socketRef.current){
       socketRef.current.on('private-message',(data)=>{
        if (selectedUser && data ) {
            if (data.fromUserId === selectedUser._id) {
                setChatMessages(prev => [
                    ...prev,
                    {
                        //@ts-ignore
                        sender:selectedUser._id.toString()  ,
                        text:data.message,
                        timestamp: new Date()
                    }
                ])
            }else {
                // Handle notifications for messages from other users
                // You could implement a notification system here
            }
        }
       })
    }
    
        return () => {
            if(socketRef.current){
                socketRef.current.off('private-message');
            }
        };
    
       

     }, [selectedUser])
     

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

    const handleOpenChat = (user: IUser) => {
        setSelectedUser(user);
        // Here you would typically fetch previous chat messages with this user
        // For now, we'll just use an empty array
        setChatMessages([]);
    };

    const handleCloseChat = () => {
        setSelectedUser(null);
    };

    const handleSendMessage = () => {
        if (!message.trim() || !selectedUser) return;
        
        // Add message to chat
        const newMessage = {
            sender: 'me', // You'd typically use the current user's ID here
            text: message,
            timestamp: new Date()
        };
        
        setChatMessages([...chatMessages, newMessage]);
        setMessage('');
        

        // Send message via socket
        socketRef.current?.emit('private-message',{
            toUserId:selectedUser._id,
            message:message,
            fromUserId: session?.user.id

        })

        // Clear input
        setMessage('');

        //TODO: You could also save the message to your database via API
        // apiClient.saveMessage(session.user.id, selectedUser._id, message);
    };

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
                        className="block w-full p-4 ps-10 text-sm rounded-xl bg-gray-50 focus:ring-emerald-600 shadow-sm"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Users List */}
                <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4"></h2>
                    
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
                                    className="flex items-center justify-between py-4 px-2 rounded-lg transition-colors hover:bg-gray-200 duration-200 cursor-pointer"
                                    onClick={() => handleOpenChat(user)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br bg-teal-700 flex items-center justify-center text-base font-medium text-white shadow-md">
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenChat(user);
                                        }}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Dialog */}
            {selectedUser && (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-start justify-start p-4  z-50">
                    <div className="bg-gray-100 rounded-xl w-full max-w-lg h-4/5 flex flex-col shadow-xl ">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-medium">
                                    {getInitials(selectedUser.email)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        {selectedUser.email.split('@')[0]}
                                    </h3>
                                    <p className="text-xs text-gray-500">{selectedUser.email}</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleCloseChat}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {chatMessages.length === 0 ? (
                                <div className="h-full flex items-center justify-center">
                                    <p className="text-gray-400 text-center">
                                        No messages yet.<br />
                                        Start a conversation with {selectedUser.email.split('@')[0]}!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {chatMessages.map((msg, index) => (
                                        <div 
                                            key={index} 
                                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div 
                                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                                    msg.sender === 'me' 
                                                        ? 'bg-emerald-600 text-white rounded-tr-none' 
                                                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                                                }`}
                                            >
                                                <p>{msg.text}</p>
                                                <p className={`text-xs ${msg.sender === 'me' ? 'text-emerald-100' : 'text-gray-500'} text-right mt-1`}>
                                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        {/* Chat Input */}
                        <div className="px-4 py-3 border-t">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="flex-1 p-3 rounded-lg bg-gray-50 focus:ring-emerald-600"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button 
                                    className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                    onClick={handleSendMessage}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}