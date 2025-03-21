import LoginForm from "./forms/LoginForm";
import { FaUserShield } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6">
      <div className="relative w-full max-w-4xl md:grid md:grid-cols-2 bg-black/10 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden border border-gray-700 transition-transform duration-500 hover:scale-105 hover:border-gray-500">

        {/* Left-side Information Panel */}
        <div className="hidden md:flex flex-col justify-center items-center text-white p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-l-2xl shadow-inner border-r border-gray-700">
          <FaUserShield className="text-5xl text-cyan-400 drop-shadow-md animate-pulse" />
          <h3 className="mt-5 text-2xl font-extrabold tracking-wide text-gray-200">
            Welcome to <br /> The Achievers Focus
          </h3>
          <p className="mt-3 text-lg italic text-gray-400 text-center">
            Empowering educators to optimize student achievements.
          </p>
        </div>

        {/* Right-side Login Form */}
        <div className="p-8 md:py-14 flex flex-col justify-center items-center w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
