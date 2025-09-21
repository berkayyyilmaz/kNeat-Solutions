import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import loginPic from "../assets/loginandsignup/login.jpg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  verifyToken,
  setupAutoTokenRefresh,
} from "../redux/actions/clientActions";
import SecureStorage from "../utils/secureStorage";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

//  Ortak validation ve component import'ları
import { emailValidation, passwordValidation } from "../utils/validation";
import FormInput from "../components/ui/FormInput";
import PasswordInput from "../components/ui/PasswordInput";
import FormButton from "../components/ui/FormButton";

//  Ortak error handling
import { handleApiError, ErrorContextMessages } from "../utils/errorHandler";
import { STRINGS } from "../constants/strings";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.client);

  //  Sayfa yüklendiğinde güvenli token kontrolü
  useEffect(() => {
    const token = SecureStorage.getToken();
    if (token) {
      dispatch(verifyToken())
        .then(() => {
          //  Token geçerliyse auto refresh setup yap
          dispatch(setupAutoTokenRefresh());
          // Ana sayfaya yönlendir
          history.push("/");
        })
        .catch(() => {
          // Token geçersizse burada kal, hata verme
        });
    }
  }, [dispatch, history]);

  //  Güvenli Login Submit
  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data));

      //  Login başarılı, auto refresh setup yap
      dispatch(setupAutoTokenRefresh());

      toast.success("Giriş başarılı!");

      //  Önceki sayfaya dön, yoksa ana sayfaya git
      const previousPage = history.length > 2;
      if (previousPage) {
        history.goBack();
      } else {
        history.push("/");
      }
    } catch (error) {
      //  Ortak error handler kullan
      handleApiError(error, "LOGIN", ErrorContextMessages.LOGIN);
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
              <p>{STRINGS.LOGIN.TAGLINE_LINE1}</p>{" "}
              <p>{STRINGS.LOGIN.TAGLINE_LINE2}</p>
            </div>
            <div className="hidden sm:block">{STRINGS.LOGIN.TAGLINE_FULL}</div>
          </div>
          <div className="h-fit w-full max-w-md space-y-6 rounded-sm bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-secondary">
              {STRINGS.LOGIN.TITLE}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/*  Email Input - Ortak component kullanıyor */}
              <FormInput
                id="email"
                type="email"
                label={STRINGS.LOGIN.EMAIL_LABEL}
                placeholder={STRINGS.LOGIN.EMAIL_PLACEHOLDER}
                register={register}
                validation={emailValidation}
                error={errors.email}
                autoComplete="email"
                required
              />
              {/*  Password Input - Ortak component kullanıyor */}
              <PasswordInput
                id="password"
                label={STRINGS.LOGIN.PASSWORD_LABEL}
                placeholder={STRINGS.LOGIN.PASSWORD_PLACEHOLDER}
                register={register}
                validation={passwordValidation}
                error={errors.password}
                autoComplete="current-password"
                required
              />
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
                  {STRINGS.LOGIN.REMEMBER_ME}
                </label>
              </div>
              {/*  Submit Button - Ortak component kullanıyor */}
              <FormButton
                type="submit"
                className="mt-4"
                variant="primary"
                size="md"
                fullWidth
              >
                {STRINGS.LOGIN.SUBMIT}
              </FormButton>
            </form>
            <div className="mt-4 flex justify-between">
              <a
                href="#"
                className="text-sm font-bold text-primary hover:underline"
              >
                {STRINGS.LOGIN.FORGOT_PASSWORD}
              </a>
              <Link
                to="/signup"
                className="text-sm font-bold text-primary hover:underline"
              >
                {STRINGS.LOGIN.CREATE_ACCOUNT}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
