"use client";
import { MessageCircle, X } from 'lucide-react';
import React from 'react';
import AllUsersChat from './AllUsersChat';

function ChatDrawer() {
  return (
    <>
      <div className="drawer drawer-end z-50">
        <input id="chat-drawer" type="checkbox" className="drawer-toggle" />
        
        {/* Chat Button */}
        <div className="drawer-content">
          <label 
            htmlFor="chat-drawer" 
            className="btn fixed bottom-6 right-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg flex items-center gap-2 px-6 py-3 transition-all duration-300 border-none"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat</span>
          </label>
        </div>
        
        {/* Drawer Content */}
        <div className="drawer-side">
          <label htmlFor="chat-drawer" className="drawer-overlay bg-black/40"></label>
          
          <div className="menu p-0 w-full max-w-md min-h-full bg-white text-base-content shadow-xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-700" />
                <h2 className="text-xl font-medium">Messages</h2>
              </div>
              <label htmlFor="chat-drawer" className="btn btn-sm btn-ghost btn-circle">
                <X className="w-5 h-5" />
              </label>
            </div>
            
            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              <AllUsersChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatDrawer;