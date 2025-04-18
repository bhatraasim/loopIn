"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { Loader2, Upload, Video, AlertCircle } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

interface FileUploadProps {
    onSuccess: (res: IKUploadResponse) => void
    onProgress?: (progress: number) => void
    fileType: "image" | "video"
}

export default function FileUpload({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onError = (err: { message: string }) => {
        console.log("Error", err);
        setError(err.message)
        setUploading(false)
    };

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false)
        setError(null)
        onSuccess(response)
    };

    const handleProgress = (evt: ProgressEvent) => {
        if (evt.lengthComputable && onProgress) {
            const percentComplete = (evt.loaded / evt.total) * 100
            onProgress(Math.round(percentComplete))
        }
        setUploading(true)
        setError(null)
    };

    const handleStartUpload = () => {
        setUploading(true)
        setError(null)
    };

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a video file")
                return false
            }
            if (file.size > 100 * 1024 * 1024) {
                setError("Video must be less than 100MB")
                return false
            }
        } else {
            const validTypes = ["image/png", "image/jpeg", "image/webp"]
            if (!validTypes.includes(file.type)) {
                setError("Please upload a valid file (PNG, JPEG, WEBP)")
                return false
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("Image must be less than 5MB")
                return false
            }
        }
        return true
    }

    return (
        <div className="space-y-3">
            <div className="relative">
                <IKUpload
                    fileName={fileType === "video" ? "video" : "image"}
                    useUniqueFileName={true}
                    validateFile={validateFile}
                    onError={onError}
                    onSuccess={handleSuccess}
                    onUploadProgress={handleProgress}
                    onUploadStart={handleStartUpload}
                    folder={fileType === "video" ? "/video" : "/image"}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    {uploading ? (
                        <div className="flex items-center gap-2 text-primary">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="font-medium">Uploading video...</span>
                        </div>
                    ) : (
                        <>
                            <Video className="w-8 h-8 text-primary mb-2" />
                            <div className="text-center">
                                <p className="font-medium text-gray-700">Add a video to share</p>
                                <p className="text-sm text-gray-500 mt-1">or drag and drop a file</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 text-error bg-error/5 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}
        </div>
    );
}