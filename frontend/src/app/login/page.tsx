"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "next-i18next";

type TokenPayload = {
  role: string;
};
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { t } = useTranslation("common");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = t("email_attention");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("email_required");
    }

    if (!formData.password) {
      newErrors.password = t("password_attention");
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
      // if (typeof window === "undefined") return;
      localStorage.setItem("token", token);
      const decoded = jwtDecode<TokenPayload>(token);

      toast.success(t("loginsucces"));

      if (decoded.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "500";
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 p-8 rounded-lg shadow-lg backdrop-blur-md z-50">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t("login")}
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">{t("mail")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("email_attention")}
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
          <label className="block text-white mb-1">{t("password")}</label>
          <input
            type="password"
            name="password"
            placeholder={t("password_attention")}
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
          {isSubmitting ? t("wait") : t("login")}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
