"use client";
import React, { useEffect, useState } from "react";

export default function Background({ color, video }: any) {
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    setCurrentVideo(video);
  }, [video]);

  console.log(color, currentVideo);
  return (
    <div className="absolute inset-0 z-[-1]">
      <video
        autoPlay
        loop
        muted
        className="w-full h-screen fixed object-cover"
        src={`${currentVideo}`}
        typeof="video/mp4"
      ></video>
      <div className={`fixed inset-0 ${color} object-cover`}></div>
    </div>
  );
}
