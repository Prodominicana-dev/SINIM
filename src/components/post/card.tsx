import Post from "@/src/models/post";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card(post: Post) {
  return (
    <>
      <div className="flex flex-col items-center justify-between p-4 space-y-3 rounded-lg shadow-lg w-full h-[30rem]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}/img/${post.pdf}`}
            alt="image"
            className="object-cover w-64 h-72 rounded-lg shadow-md"
          />
          <div className="flex flex-col items-center justify-center w-11/12">
            <div className="text-2xl font-semibold text-center text-black truncate line-clamp-1">
              {post.title}
            </div>
            <div className="text-base font-thin text-center text-black truncate line-clamp-1">
              {post.category}
            </div>
          </div>
        </div>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/data/post/${post.id}/pdf/${post.pdf}`}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
        >
          Descargar
        </a>
      </div>
    </>
  );
}
