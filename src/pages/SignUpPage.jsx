import signupPic from "../assets/loginandsignup/signup.jpg";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../redux/actions/roleActions";

//  Ortak validation ve component import'ları
import {
  emailValidationEn,
  passwordValidationEn,
  nameValidation,
  phoneValidation,
  storeNameValidation,
  taxIdValidation,
  ibanValidation,
} from "../utils/validation";
import FormInput from "../components/ui/FormInput";
import PasswordInput from "../components/ui/PasswordInput";
import FormButton from "../components/ui/FormButton";
import { STRINGS } from "../constants/strings";

//  Ortak error handling
import { handleApiError, ErrorContextMessages } from "../utils/errorHandler";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  // Redux'tan rolleri ve loading/error durumlarını al
  const {
    roles,
    loading: rolesLoading,
    error: rolesError,
  } = useSelector((state) => state.role);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "customer",
    },
  });

  useEffect(() => {
    // Redux thunk action'ı ile rolleri çek
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    // Roller yüklendiğinde varsayılan rolü ayarla
    if (roles && roles.length > 0) {
      const customerRole = roles.find((role) => role.code === "customer");
      if (customerRole) {
        setValue("role_id", customerRole.code);
        setSelectedRole(customerRole.code);
      }
    }
  }, [roles, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      let requestData;

      if (data.role_id === "store") {
        requestData = {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: data.role_id,
          store: {
            name: data.store_name,
            phone: data.store_phone,
            tax_no: data.tax_no,
            bank_account: data.bank_account,
          },
        };
      } else {
        requestData = {
          name: data.name,
          email: data.email,
          password: data.password,
          role_id: data.role_id,
        };
      }

      await api.post("/signup", requestData);
      setSuccess(
        "Your account has been successfully created! You can activate your account by clicking the activation link sent to your email address.",
      );

      // 3 saniye sonra yönlendir
      setTimeout(() => {
        history.goBack();
        history.replace(history.location.pathname, {
          warning:
            "Please click the activation link sent to your email to activate your account!",
        });
      }, 3000);
    } catch (error) {
      //  Ortak error handler kullan
      const errorMessage = handleApiError(
        error,
        "SIGNUP",
        ErrorContextMessages.SIGNUP,
      );
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Arka Plan */}
      <div className="absolute inset-0 -z-10">
        <img
          src={signupPic}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mx-3 md:grid md:grid-cols-2">
        {/* SignUp Formu */}
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
              Kayıt Ol
            </h2>

            {rolesError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{rolesError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/*  Name Input - Ortak component kullanıyor */}
              <FormInput
                id="name"
                type="text"
                label="Ad Soyad"
                placeholder="Adınız Soyadınız"
                register={register}
                validation={nameValidation}
                error={errors.name}
                autoComplete="name"
                required
              />

              {/*  Email Input - Ortak component kullanıyor */}
              <FormInput
                id="email"
                type="email"
                label={STRINGS.LOGIN.EMAIL_LABEL}
                placeholder={STRINGS.LOGIN.EMAIL_PLACEHOLDER}
                register={register}
                validation={emailValidationEn}
                error={errors.email}
                autoComplete="email"
                required
              />

              {/*  Password Input - Ortak component kullanıyor */}
              <div>
                <div className="mb-2 text-xs text-gray-600">
                  Şifre en az 8 karakter olmalı; büyük/küçük harf, rakam ve özel
                  karakter içermelidir.
                </div>
                <PasswordInput
                  id="password"
                  label={STRINGS.LOGIN.PASSWORD_LABEL}
                  placeholder={STRINGS.LOGIN.PASSWORD_PLACEHOLDER}
                  register={register}
                  validation={passwordValidationEn}
                  error={errors.password}
                  autoComplete="new-password"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rol
                </label>
                <select
                  id="role"
                  {...register("role_id")}
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setValue("role_id", e.target.value);
                  }}
                  disabled={rolesLoading}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary disabled:bg-gray-100"
                >
                  {rolesLoading ? (
                    <option>Roller yükleniyor...</option>
                  ) : (
                    roles.map((role) => (
                      <option key={role.id} value={role.code}>
                        {role.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {selectedRole === "store" && (
                <>
                  <div>
                    <label
                      htmlFor="storeName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mağaza Adı
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      {...register("store_name", {
                        required: "Mağaza adı zorunludur",
                        minLength: {
                          value: 3,
                          message: "Mağaza adı en az 3 karakter olmalıdır",
                        },
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                      placeholder="Mağaza Adı"
                    />
                    {errors.store_name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.store_name.message}
                      </p>
                    )}
                  </div>

                  {/*  Store Phone Input - Ortak component kullanıyor */}
                  <FormInput
                    id="store_phone"
                    type="tel"
                    label="Mağaza Telefonu"
                    placeholder="+90 XXX XXX XX XX"
                    register={register}
                    validation={phoneValidation}
                    error={errors.store_phone}
                    autoComplete="tel"
                    required
                  />

                  <div>
                    <label
                      htmlFor="taxId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vergi No
                    </label>
                    <input
                      type="text"
                      id="taxId"
                      {...register("tax_no", {
                        required: "Vergi no zorunludur",
                        pattern: {
                          value: /^T\d{4}V\d{6}$/,
                          message:
                            "Geçerli bir Vergi No giriniz (Biçim: TXXXXVXXXXXX)",
                        },
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                      placeholder="TXXXXVXXXXXX"
                    />
                    {errors.tax_no && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.tax_no.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="bankAccount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Banka Hesabı (IBAN)
                    </label>
                    <input
                      type="text"
                      id="bankAccount"
                      {...register("bank_account", {
                        required: "IBAN zorunludur",
                        pattern: {
                          value:
                            /^TR[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/,
                          message: "Geçerli bir IBAN giriniz",
                        },
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                      placeholder="TR__ ____ ____ ____ ____ ____ __"
                    />
                    {errors.bank_account && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.bank_account.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="text-sm text-green-700">{success}</div>
                </div>
              )}

              {/*  Submit Button - Ortak component kullanıyor */}
              <FormButton
                type="submit"
                disabled={success}
                loading={isLoading}
                loadingText="Kayıt yapılıyor..."
                className="mt-4"
                variant="primary"
                size="md"
                fullWidth
              >
                Kayıt Ol
              </FormButton>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Zaten hesabınız var mı? </span>
              <Link
                to="/login"
                className="text-sm font-bold text-primary hover:underline"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
