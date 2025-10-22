import { IComment } from "@/models/Comment";
import { IUser } from "@/models/User";
import { IVideo } from "@/models/Video";

export type VideoFormData = {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
};


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
    console.error(`Fetch error on ${url}: ${response.status} - ${errorText}`);
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

    async createVideo(data: VideoFormData): Promise<IVideo> {
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
    async Like(videoId:string ):Promise<{liked:boolean , likeCount:number}> {
        return this.fetch<{ liked: boolean; likeCount: number }>('/api/like',{
            method:"POST",
            body:JSON.stringify({videoId})
        })
    }
}

export const apiClient = new ApiClient(); 