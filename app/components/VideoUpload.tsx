"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNotification } from "./Notification";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { apiClient } from "@/lib/api-client";
import { Loader2, PersonStanding, Video } from "lucide-react";
import FileUpload from "./FileUpload";

interface VideoFormData {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function VideoUploadForm() {
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { showNotification } = useNotification();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<VideoFormData>({
        defaultValues: {
            title: "",
            description: "",
            videoUrl: "",
            thumbnailUrl: "",
        },
    });

    const handleUploadSuccess = (response: IKUploadResponse) => {
        const videoUrl = response.url;
        const thumbnailUrl = response.thumbnailUrl || response.url;

        setValue("videoUrl", videoUrl.startsWith("http")
            ? videoUrl
            : `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}/${videoUrl}`
        );

        setValue("thumbnailUrl", thumbnailUrl.startsWith("http")
            ? thumbnailUrl
            : `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}/${thumbnailUrl}`
        );

        showNotification("Video uploaded successfully", "success");
    };

    const handleProgress = (progress: number) => {
        setUploadProgress(progress);
    };

    const onSubmit = async (data: VideoFormData) => {
        if (!data.videoUrl) {
            showNotification("Please upload a video first", "error");
            return;
        }

        setLoading(true);
        try {
            await apiClient.createVideo(data);
            showNotification("Video published successfully!", "success");
            setValue("title", "");
            setValue("description", "");
            setValue("videoUrl", "");
            setValue("thumbnailUrl", "");
            setUploadProgress(0);
        } catch (error) {
            showNotification(error instanceof Error ? error.message : "Failed to publish video", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-base-100 rounded-xl p-4 w-max mx-auto shadow">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Header with profile picture and input */}
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-neutral text-neutral-content flex items-center justify-center">
                        <PersonStanding className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="What's on your mind?"
                            className={`input input-bordered w-full rounded-full ${errors.title ? "input-error" : ""
                                }`}
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && (
                            <span className="text-error text-xs mt-1 ml-4">
                                {errors.title.message}
                            </span>
                        )}
                        <input
                            placeholder="Description (optional)"
                            className={`mt-3 input input-bordered w-full rounded-3xl ${errors.description ? "input-error" : ""
                                }`}
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && (
                            <span className="text-error text-xs mt-1 ml-4">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* Upload area */}
                <div className="border border-base-200 rounded-lg p-4 mt-4">
                    <FileUpload
                        fileType="video"
                        onSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                    />
                    {uploadProgress > 0 && (
                        <progress
                            className="progress progress-primary w-full mt-4"
                            value={uploadProgress}
                            max="100"
                        />
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-lg font-medium text-white ${loading || uploadProgress < 100
                            ? "bg-[#1C836D] opacity-90 cursor-not-allowed"
                            : "bg-[#1C836D] hover:opacity-90"
                        }`}
                    disabled={loading || uploadProgress < 100}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Publishing...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>Share Video</span>
                        </div>
                    )}
                </button>
            </form>
        </div>
    );
}
