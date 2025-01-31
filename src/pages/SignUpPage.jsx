import signupPic from "../assets/loginandsignup/signup.jpg";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../redux/actions/roleActions";

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
      setError(
        error.response?.data?.message ||
          "An error occurred during registration",
      );
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
              Sign Up
            </h2>

            {rolesError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{rolesError}</div>
              </div>
            )}

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
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
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
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
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
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
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
                    required: "Password confirmation is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
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
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      {...register("store_name", {
                        required: "Store name is required",
                        minLength: {
                          value: 3,
                          message: "Store name must be at least 3 characters",
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
                        required: "Phone number is required",
                        pattern: {
                          value: /^(\+90|0)?[0-9]{10}$/,
                          message: "Please enter a valid phone number",
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
                        required: "Tax ID is required",
                        pattern: {
                          value: /^T\d{4}V\d{6}$/,
                          message:
                            "Please enter a valid Tax ID (Format: TXXXXVXXXXXX)",
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
                        required: "IBAN is required",
                        pattern: {
                          value:
                            /^TR[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{2}$/,
                          message: "Please enter a valid IBAN number",
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

              <button
                type="submit"
                disabled={isLoading || success}
                className="mt-4 w-full rounded-md bg-primary py-2 text-white focus:outline-none focus:ring focus:ring-secondary disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Registering...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
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
