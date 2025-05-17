"use client";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: string }>({
    text: "",
    type: "",
  });
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
      newErrors.name = "Нэр оруулна уу";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Имэйл оруулна уу";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Зөв имэйл оруулна уу";
    }

    if (!formData.password) {
      newErrors.password = "Нууц үг оруулна уу";
    } else if (formData.password.length < 6) {
      newErrors.password = "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await api.post("/api/users/signup", formData);

      setFormData({ name: "", email: "", password: "" });
      const { token } = response.data;

      localStorage.setItem("token", token);
      toast.success("Амжилттай нэвтэрлээ!");
      router.push("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Бүртгэл амжилтгүй боллоо";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen   flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/honda.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a]/80 p-8 rounded-lg shadow-lg backdrop-blur-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Бүртгүүлэх
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Нэр
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                placeholder="Нэр оруулна уу"
                onChange={handleChange}
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
                Имэйл
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Е-майл оруулна уу"
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
                Нууц үг
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                placeholder="Нууц үг оруулна уу"
                onChange={handleChange}
                className={`w-full p-2 rounded bg-transparent text-white border ${
                  errors.password ? "border-red-500" : "border-gray-600"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
