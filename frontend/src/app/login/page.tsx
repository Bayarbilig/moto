"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "next-i18next";
import { usePathname, useSearchParams } from "next/navigation";

type TokenPayload = {
  role: string;
};

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // get current locale from path, e.g. "/en/login"
  const currentLocale = pathname?.split("/")[1] || "en";

  const { t } = useTranslation("login");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Change language by routing to same page with new locale prefix
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    // Rebuild path with new locale, keep the rest of the path and query params
    const restOfPath = pathname?.split("/").slice(2).join("/") || "";
    const query = searchParams?.toString();
    const newPath = `/${selectedLang}/${restOfPath}${query ? "?" + query : ""}`;
    router.push(newPath);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("emailInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("passwordRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setLoginError("");

    try {
      const response = await api.post("/api/users/login", formData);
      const { token } = response.data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode<TokenPayload>(token);

      toast.success(t("loginSuccess"));

      if (decoded.role === "admin") {
        router.push(`/${currentLocale}/admin`);
      } else {
        router.push(`/${currentLocale}/`);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("loginFailed");
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/honda.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 p-8 rounded-lg shadow-lg backdrop-blur-md z-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("title")}
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1" htmlFor="email">
            {t("emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t("emailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-transparent text-white border ${
              errors.email ? "border-red-500" : "border-gray-700"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="password">
            {t("passwordLabel")}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 rounded bg-transparent text-white border ${
              errors.password ? "border-red-500" : "border-gray-700"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className={`bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? t("loggingIn") : t("loginButton")}
        </button>

        {loginError && (
          <p className="text-red-500 mt-4 text-center font-semibold">
            {loginError}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
