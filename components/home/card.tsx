import Image from "next/image";

export default function Card({ image, title, color }: any) {
  return (
    <button
      className={`flex justify-center items-center md:h-full h-36 md:w-full ${color} rounded-lg text-2xl hover:text-3xl duration-300`}
    >
      <Image src={`${image}`} width={100} height={100} alt=""></Image>
      <div className="absolute font-custom">{title}</div>
    </button>
  );
}
