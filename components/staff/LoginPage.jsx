import LoginForm from "./forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-slate-700 to-slate-400 p-5">
      <div className="w-full max-w-4xl md:grid md:grid-cols-2 rounded-lg shadow-xl bg-white bg-opacity-90 border border-gray-500 transition-transform duration-500 transform hover:scale-105">

        {/* Left-side Information Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-slate-800 to-slate-600 text-white p-6 rounded-l-lg text-center">
          <h3 className="text-2xl font-extrabold">Welcome to The Achievers Focus</h3>
          <p className="mt-4 text-lg font-light italic">
            Empowering educators in their mission to optimize student achievements.
          </p>
        </div>

        {/* Right-side Login Form */}
        <div className="p-6 md:py-12 rounded-r-lg shadow-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
