import LoginForm from "./forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-secondary to-secondary/45 p-5">
      <div className="w-full max-w-4xl md:grid md:grid-cols-2 rounded-lg shadow-lg backdrop-blur-md bg-opacity-80 border border-slate-600 z-20 hover:border-primary transition-all duration-500 ease-out transform scale-100">
        {/* Left-side Information Panel */}
        <div className="hidden md:flex justify-center items-center bg-slate-600 bg-opacity-80 text-white p-5 rounded-l-lg transition-all duration-700 ease-out transform translate-x-0 opacity-100">
          <div className="flex flex-col space-y-8 px-5 text-center">
            <h3 className="font-extrabold tracking-wide text-2xl">
              Welcome to <br /> The Achievers Focus
            </h3>
            <p className="tracking-wide font-light italic">
              Achievers Focus empowers educators in their fundamental mission of optimizing student achievements
            </p>
          </div>
        </div>

        {/* Right-side Login Form */}
        <div className="p-5 md:py-10 rounded-r-lg shadow-md transition-all duration-700 ease-out transform translate-x-0 opacity-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
