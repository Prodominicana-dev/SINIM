"use client";
export default function Background({ color, video }: any) {
  return (
    <div className="absolute inset-0 z-[-1]">
      <video autoPlay loop muted className="w-full h-screen fixed object-cover">
        <source src={`${video}`} type="video/mp4"></source>
      </video>
      <div className={`fixed inset-0 ${color} object-cover`}></div>
    </div>
  );
}
