import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import loginPic from "../assets/loginandsignup/login.jpg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyToken } from "../redux/actions/clientActions";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.client);

  // Mouse basılı tutma fonksiyonları
  const handleMouseDown = () => {
    setShowPassword(true);
  };

  const handleMouseUp = () => {
    setShowPassword(false);
  };

  const handleMouseLeave = () => {
    setShowPassword(false);
  };

  // Sayfa yüklendiğinde mevcut token kontrolü
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(verifyToken())
        .then(() => {
          // Token geçerliyse ana sayfaya yönlendir
          history.push("/");
        })
        .catch(() => {
          // Token geçersizse burada kal, hata verme
          console.log("Mevcut token geçersiz");
        });
    }
  }, [dispatch, history]);

  // MEVCUT onSubmit MANTIGI AYNEN KORUNDU - remember me logic dahil
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
            <Link to="/" className="inline-block">
              <img
                src="/kneat-logo2.png"
                alt="kNeat"
                className="h-16 w-auto sm:h-20 md:h-24"
              />
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Şifre alanı zorunludur",
                      minLength: {
                        value: 6,
                        message: "Şifre en az 6 karakter olmalıdır",
                      },
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 pr-10 focus:outline-none focus:ring focus:ring-secondary"
                    placeholder="Your Password"
                  />
                  <button
                    type="button"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform select-none text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.243 4.243L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                </div>
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
