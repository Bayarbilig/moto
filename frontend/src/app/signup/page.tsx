"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";


type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

const SignupPage = () => {
  const { t } = useTranslation("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof Errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("errors.name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("errors.email_invalid");
    }

    if (!formData.password) {
      newErrors.password = t("errors.password_required");
    } else if (formData.password.length < 6) {
      newErrors.password = t("errors.password_short");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/api/users/signup", formData);
      localStorage.setItem("token", response.data.token);
      toast.success(t("success"));
      router.push("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("error_generic");
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
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 p-8 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          {t("title")}
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("placeholders.name")}
                className={`w-full p-2 rounded bg-transparent text-white border ${
                  errors.name ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-1">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("placeholders.email")}
                className={`w-full p-2 rounded bg-transparent text-white border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1">
                {t("password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("placeholders.password")}
                className={`w-full p-2 rounded bg-transparent text-white border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
