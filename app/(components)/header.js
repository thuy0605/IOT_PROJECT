import Image from "next/image";
import Logo from "../(image)/logo.jpeg";
import Time from "../(components)/time";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className=" flex m-30 px-10 pt-10 w-full">
          <Image src={Logo} width={100} height={100} alt="this is logo" />
          <div className="pl-10 pt-10">
            <Time />
          </div>
        </div>
        <div className=" flex items-end mr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            dataSlot="icon"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
            />
          </svg>

          <a href="/api/auth/login" className="text-xl ml-1">
            Login
          </a>
        </div>
      </div>

      <div>
        <h1 className="flex justify-center text-4xl font-bold border-b-2 border-gray-700 shadow-xl">
          Humidity - Temperature - Co2
        </h1>
      </div>
    </div>
  );
}
