"use client";
import { useEffect, useState } from "react";
import React from "react";

export default function Background({ color, video }: any) {
  const [currentVideo, setCurrentVideo] = useState(video);

  useEffect(() => {
    setCurrentVideo(video);
  }, [video]);
  return (
    <div className="absolute inset-0 z-[-1]">
      <video
        autoPlay
        loop
        muted
        className="w-full h-screen fixed object-cover"
        src={`${currentVideo}`}
      ></video>
      <div className={`fixed inset-0 ${color} object-cover`}></div>
    </div>
  );
}
