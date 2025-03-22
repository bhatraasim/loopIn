import { IVideo } from '@/models/Video'
import React from 'react'
import VideoComponent from './VideoComponent'

interface IVideoFeed {
    videos?: IVideo[]; // Optional to prevent undefined errors
}

function Feed({ videos = [] }: IVideoFeed) { // Default to empty array
  return (
    <div className=''>
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoComponent key={video._id?.toString()} video={video} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-base-content/70">No videos found</p>
          </div>
        )}
    </div>
  )
}

export default Feed;
