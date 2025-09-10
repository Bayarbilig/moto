"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { BiUpload } from "react-icons/bi";
import { api } from "@/lib/axios";

interface ShowAlert {
  _id: string;
  alertImage: string;
  duration: number;
  is_shown: boolean;
}

export default function AlertTab() {
  const [alerts, setAlerts] = useState<ShowAlert[]>([]);
  const [alertImage, setAlertImage] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isShown, setIsShown] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/showAlert");
      setAlerts(res.data);
      setError("");
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setError("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAlertImage("");
    setDuration("");
    setIsShown(false);
    setEditingId(null);
    setUploading(false);
    setError("");
  };

  const validateForm = (): boolean => {
    if (!alertImage.trim()) {
      setError("Please upload an image");
      return false;
    }

    if (!duration.trim()) {
      setError("Please enter duration");
      return false;
    }

    const durationNum = Number(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      setError("Duration must be a positive number");
      return false;
    }

    if (durationNum > 3600) {
      setError("Duration cannot exceed 3600 seconds (1 hour)");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    const payload = {
      alertImage: alertImage.trim(),
      duration: Number(duration),
      is_shown: isShown,
    };

    try {
      if (editingId) {
        await api.put(`/api/showAlert/${editingId}`, payload);
      } else {
        await api.post("/api/showAlert", payload);
      }
      resetForm();
      await fetchAlerts();
    } catch (error: any) {
      console.error("Failed to save alert:", error);
      setError(error.response?.data?.message || "Failed to save alert");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this alert?")) return;

    setLoading(true);
    try {
      await api.delete(`/api/showAlert/${id}`);
      await fetchAlerts();
      setError("");
    } catch (error: any) {
      console.error("Failed to delete alert:", error);
      setError(error.response?.data?.message || "Failed to delete alert");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (alert: ShowAlert) => {
    setEditingId(alert._id);
    setAlertImage(alert.alertImage);
    setDuration(alert.duration.toString());
    setIsShown(alert.is_shown);
    setError("");
  };

  const handleRemoveImage = () => {
    setAlertImage("");
    setError("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleToggleShow = async (alert: ShowAlert) => {
    const updatedAlert = { ...alert, is_shown: !alert.is_shown };

    try {
      await api.put(`/api/showAlert/${alert._id}`, updatedAlert);
      setAlerts((prev) =>
        prev.map((a) => (a._id === alert._id ? updatedAlert : a))
      );
      setError("");
    } catch (error: any) {
      console.error("Failed to toggle alert visibility:", error);
      setError(error.response?.data?.message || "Failed to update alert");
    }
  };

  return (
    <div className="px-32 py-6 flex flex-col gap-6 min-h-screen">
      {/* Error Display */}
      {error && (
        <div className="bg-red-700 border border-red-600 text-white px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="flex gap-4 items-start flex-wrap">
        <div className="flex items-center gap-2">
          <CldUploadWidget
            uploadPreset="idkmyup"
            onSuccess={(result: any) => {
              if (result?.info?.secure_url) {
                setAlertImage(result.info.secure_url);
                setUploading(false);
                setError("");
              }
            }}
            onError={(error: any) => {
              console.error("Cloudinary upload error:", error);
              setUploading(false);
              setError("Image upload failed. Please try again.");
            }}
            options={{
              maxFileSize: 10000000,
              resourceType: "image",
              clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => {
                  setUploading(true);
                  setError("");
                  open?.();
                }}
                className="flex items-center gap-2 border px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
                disabled={uploading || loading}
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  <>
                    <BiUpload /> Upload Image
                  </>
                )}
              </button>
            )}
          </CldUploadWidget>

          {alertImage && (
            <div className="relative">
              <img
                src={alertImage}
                alt="preview"
                className="w-20 h-20 object-cover border rounded border-gray-700"
                onError={() => setError("Failed to load image preview")}
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transition-colors"
                disabled={loading}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <input
          type="number"
          placeholder="Duration (seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white border-gray-700"
          min="1"
          max="3600"
          disabled={loading}
        />

        <label className="flex items-center gap-2 cursor-pointer text-white">
          <input
            type="checkbox"
            checked={isShown}
            onChange={(e) => setIsShown(e.target.checked)}
            className="cursor-pointer"
            disabled={loading}
          />
          Show Alert
        </label>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 rounded text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              editingId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading || uploading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {editingId ? "Updating..." : "Creating..."}
              </span>
            ) : editingId ? (
              "Update Alert"
            ) : (
              "Create Alert"
            )}
          </button>

          {editingId && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded border border-gray-700 hover:bg-gray-800 text-white transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && !uploading && (
        <div className="flex items-center justify-center py-4 text-white">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {/* Alerts List */}
      <div className="flex flex-col gap-4">
        {alerts.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No alerts created yet. Create your first alert above.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert._id}
              className={`flex items-center gap-4 border p-4 rounded transition-all ${
                alert.is_shown
                  ? "border-green-500 bg-green-900"
                  : "border-gray-700 bg-gray-800"
              }`}
            >
              <img
                src={alert.alertImage}
                alt="alert"
                className="w-20 h-20 object-cover rounded border border-gray-600"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCAyNUM0Ni42Mjc0IDI1IDUyIDMwLjM3MjYgNTIgMzdDNTIgNDMuNjI3NCA0Ni42Mjc0IDQ5IDQwIDQ5QzMzLjM3MjYgNDkgMjggNDMuNjI3NCAyOCAzN0MyOCAzMC4zNzI2IDMzLjM3MjYgMjUgNDAgMjVaIiBzdHJva2U9IiM5Q0E0QUYiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNMzQgMzVMMzggMzlMNDYgMzEiIHN0cm9rZT0iIzlDQTRBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+";
                }}
              />
              <div className="flex flex-col gap-1">
                <div className="font-medium text-white">
                  Duration: {alert.duration}s
                </div>
                <div
                  className={`text-sm ${
                    alert.is_shown
                      ? "text-green-400 font-medium"
                      : "text-gray-300"
                  }`}
                >
                  Status: {alert.is_shown ? "Visible" : "Hidden"}
                </div>
              </div>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => handleEditClick(alert)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(alert._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
