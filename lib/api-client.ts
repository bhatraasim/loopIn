import { IComment } from "@/models/Comment";
import { ILike } from "@/models/Like";
import { IUser } from "@/models/User";
import { IVideo } from "@/models/Video";

export type VideoFormData = Omit<IVideo, "_id">;
type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
}

class ApiClient {
    private async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response.json();
    }

    // User related API calls
    async getUsers(): Promise<IUser[]> {
        return this.fetch<IUser[]>('/api/users');
    }

    // Video related API calls
    async getVideos(): Promise<IVideo[]> {
        return this.fetch<IVideo[]>('/api/videos');
    }

    async createVideo(data: Omit<IVideo, '_id'>): Promise<IVideo> {
        return this.fetch<IVideo>('/api/videos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getAVideo(id: string) {
        return this.fetch<IVideo>(`api/videos/${id}`);
    }

    async  changePassword(oldPassword:string , newPassword:string): Promise<{message:string}>{
        return this.fetch('/api/users/changePassword' ,{
            method:'POST',
            body: JSON.stringify({ oldPassword, newPassword }),
        })
    }
    async comment(videoId: string , text: string){
        return this.fetch<IComment>('/api/users/comments' , {
            method:'POST',
            body:JSON.stringify({videoId , text})
        })
    }
    async getComments(videoId: string): Promise<IComment[]> {
        return this.fetch<IComment[]>(`/api/users/comments?videoId=${videoId}`,{
            method:'GET'
        });

    }
    async Like(videoId:string ):Promise<{liked:Boolean , likeCount:Number}> {
        return this.fetch<{ liked: boolean; likeCount: number }>('/api/like',{
            method:"POST",
            body:JSON.stringify({videoId})
        })
    }
}

export const apiClient = new ApiClient();