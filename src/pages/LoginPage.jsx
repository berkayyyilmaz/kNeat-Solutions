import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import loginPic from "../assets/loginandsignup/login.jpg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/clientActions";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.client);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data));

      // Remember me seçeneği işaretliyse token'ı localStorage'a kaydet
      if (data.rememberMe && response.token) {
        localStorage.setItem("userToken", response.token);
      }
      // Önceki sayfaya dön, yoksa ana sayfaya git
      const previousPage = history.length > 2;
      if (previousPage) {
        history.goBack();
      } else {
        history.push("/");
      }
    } catch (error) {
      console.error("Giriş sırasında hata oluştu:", error);
      toast.error(
        error.response?.data?.message || "Giriş başarısız, tekrar deneyin!",
        { position: "top-right" },
      );
    }
  };

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
      <div className="mx-3 md:grid md:grid-cols-2">
        {/* Login Formu */}
        <div className="w-full"></div>
        <div className="flex min-h-screen w-full flex-col items-center justify-center md:justify-center">
          <div className="mb-3 w-full text-end text-lightGray sm:w-fit sm:text-center">
            <Link to="/">
              <div className="text-bold text-4xl sm:text-5xl">kNeat</div>
            </Link>
            <div className="block sm:hidden">
              <p>Seamless neat,</p> <p>perfectly knit.</p>
            </div>
            <div className="hidden sm:block">
              Seamless neat, perfectly knit.
            </div>
          </div>
          <div className="h-fit w-full max-w-md space-y-6 rounded-sm bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-secondary">
              Log In
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  {...register("email", {
                    required: "E-posta alanı zorunludur",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Geçerli bir e-posta adresi giriniz",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                  placeholder="Your Mail"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
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
                  {...register("password", {
                    required: "Şifre alanı zorunludur",
                    minLength: {
                      value: 6,
                      message: "Şifre en az 6 karakter olmalıdır",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                  placeholder="Your Password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-secondary"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-primary py-2 text-white focus:outline-none focus:ring focus:ring-secondary"
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
              <Link
                to="/signup"
                className="text-sm font-bold text-primary hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
