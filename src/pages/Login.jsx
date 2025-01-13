import loginPic from "../assets/loginandsignup/login.jpg";

export default function Login() {
  return (
    <div className="relative min-h-screen">
      {/* Arka Plan */}
      <div className="absolute inset-0 -z-10">
        <img
          src={loginPic}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Login Formu */}
      <div className="flex min-h-screen items-center justify-center px-4 sm:px-8 md:justify-center lg:justify-end">
        <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md md:mr-0 lg:mr-4 xl:mr-24">
          <h2 className="text-center text-2xl font-bold text-secondary">
            Log In
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your Mail"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Your Password"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-primary py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 flex justify-between">
            <a
              href="#"
              className="text-sm font-bold text-primary hover:underline"
            >
              Forgot Password?
            </a>
            <a
              href="#"
              className="text-sm font-bold text-primary hover:underline"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
