export default function Header({title, message} : {title: string, message: string}) {
  return (
    <>
        <div className="w-full h-[26rem] bg-gradient-to-tr from-purple-500 from-[15%] via-sky-600 to-sky-400 flex flex-col justify-center items-center space-y-6">
          <div className="text-5xl font-bold text-white">{title}</div>
          <div className="w-6/12 text-xl font-thin text-center text-white">{message}</div>
        </div>
    </>
  )
}
