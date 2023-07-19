import Image from "next/image";
import Link from "next/link";
import TypeWriterEffect from "react-typewriter-effect";

export default function InfoTool({ description, logo, link }) {
  return (
    <div className="flex h-full md:h-5/6 md:p-5 ml-0 md:justify-start justify-center items-center md:absolute">
      <div className="flex flex-col space-y-6 mx-10 ">
        <Image
          src={`/images/logo/${logo}.png`}
          width={200}
          height={200}
          draggable={false}
          alt=""
        ></Image>
        <p className="md:w-[32rem] md:text-sm text-xs md:block hidden">
          <TypeWriterEffect
            startDelay={100}
            cursorColor="white"
            text={description}
            typeSpeed={20}
          />
        </p>
        <Link href={"/"} className="md:block hidden">
          <div className="w-28 text-center text-sm bg-white text-black rounded-full px-5 py-1 duration-500">
            Ver mas
          </div>
        </Link>
      </div>
    </div>
  );
}
