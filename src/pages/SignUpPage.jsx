import { Link } from "react-router-dom/cjs/react-router-dom.min";
import signupPic from "../assets/loginandsignup/signup.jpg";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function SignUp() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("customer");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role_id: "customer",
    },
  });

  const password = watch("password");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/roles");
        setRoles(response.data);
        // Varsayılan olarak customer rolünü seç
        const customerRole = response.data.find(
          (role) => role.code === "customer",
        );
        if (customerRole) {
          setValue("role_id", customerRole.code);
          setSelectedRole(customerRole.code);
        }
      } catch (error) {
        console.error("Roller yüklenirken hata oluştu:", error);
      }
    };
    fetchRoles();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/signup", data);
      console.log("Kayıt başarılı:", response.data);
      // Başarılı kayıt sonrası yönlendirme veya bilgilendirme yapılabilir
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
      // Hata durumunda kullanıcıya bilgi verilebilir
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
          <div className="h-fit w-full max-w-md space-y-6 rounded-3xl bg-white p-8 shadow-md">
            <h2 className="text-center text-2xl font-bold text-secondary">
              Sign Up
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "İsim alanı zorunludur",
                    minLength: {
                      value: 3,
                      message: "İsim en az 3 karakter olmalıdır",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                  placeholder="Your Full Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                      value: 8,
                      message: "Şifre en az 8 karakter olmalıdır",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir",
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Şifre tekrarı zorunludur",
                    validate: (value) =>
                      value === password || "Şifreler eşleşmiyor",
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                  placeholder="Confirm Your Password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  {...register("role_id")}
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setValue("role_id", e.target.value);
                  }}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.code}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRole === "store" && (
                <>
                  <div>
                    <label
                      htmlFor="storeName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Store Name
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
                      placeholder="Store Name"
                    />
                    {errors.store_name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.store_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="storePhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Store Phone
                    </label>
                    <input
                      type="tel"
                      id="storePhone"
                      {...register("store_phone", {
                        required: "Telefon numarası zorunludur",
                        pattern: {
                          value: /^(\+90|0)?[0-9]{10}$/,
                          message:
                            "Geçerli bir Türkiye telefon numarası giriniz",
                        },
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-secondary"
                      placeholder="+90 XXX XXX XX XX"
                    />
                    {errors.store_phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.store_phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="taxId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tax ID
                    </label>
                    <input
                      type="text"
                      id="taxId"
                      {...register("tax_no", {
                        required: "Vergi numarası zorunludur",
                        pattern: {
                          value: /^T\d{4}V\d{6}$/,
                          message:
                            "Geçerli bir vergi numarası giriniz (TXXXXVXXXXXX formatında)",
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
                      Bank Account (IBAN)
                    </label>
                    <input
                      type="text"
                      id="bankAccount"
                      {...register("bank_account", {
                        required: "IBAN zorunludur",
                        pattern: {
                          value:
                            /^TR[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/,
                          message: "Geçerli bir IBAN numarası giriniz",
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

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-primary py-2 text-white focus:outline-none focus:ring focus:ring-secondary"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-sm font-bold text-primary hover:underline"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
