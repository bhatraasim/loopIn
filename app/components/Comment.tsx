"use client"
import { apiClient } from '@/lib/api-client'
import { connectToDatabase } from '@/lib/db'
import { IComment } from '@/models/Comment'
import React, { useEffect, useState } from 'react'

export default function Comment({ videoId }: { videoId: string }) {
    const [input, setInput] = useState("")
    const [comments, setComments] = useState<IComment[]>([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        const fetchComments = async (videoId: string) => {
            try {

                if (!videoId) {
                    console.error("VideoId is missing or empty");
                    return;
                }
                const data = await apiClient.getComments(videoId);

                setComments(data)
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchComments(videoId)
    }, [videoId])


    const addComment = async () => {
        try {
            if (!input.trim()) return;

            await apiClient.comment(videoId.toString(), input);
            setInput("")


        } catch (error) {
            console.error("Error adding comment", error)
        }
    }





    return (
        <>
            <div className="mx-10 my-2 ">
                <div className="flex items-center ">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        className="border p-2 rounded-xl outline-[#1C836D] "
                        placeholder="Add a comment..."
                    />
                    <button className='mx-5 bg-[#1C836D] text-sm hover:bg-[#3f6b62]  p-2.5 rounded-2xl text-white'
                        onClick={addComment}
                    >
                        Comment
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-8">
                    <p className="text-gray-500 animate-pulse">Loading comments...</p>
                </div>
            ) : (
                <div className="max-w-lg mx-auto space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="flex items-center bg-white shadow-sm border border-gray-200 rounded-2xl p-4 transition hover:shadow-md"
                            >
                                <p className="text-gray-800 text-sm leading-relaxed mx-5">{comment.text}</p>
                                <p className="text-[0.75rem] text-gray-400 mt-2 text-right italic">
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No comments yet. Be the first to share your thoughts ✨</p>
                        </div>
                    )}
                </div>
            )}


        </>
    )
}