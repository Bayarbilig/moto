// "use client";

// import { api } from "@/lib/axios";
// import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";

// import { Event, Brand, Bike, Accessory, Equipment } from "../components/Types";
// import UsersTab from "../components/UserTab";
// import BrandManager from "../components/BrandManeger";
// import AccessoryManager from "../components/AccessoryManeger";
// import { BikeManager } from "../components/BikeManeger";
// import {
//   EquipmentItem,
//   EquipmentManager,
// } from "../components/EquipmentManeger";
// import EventForm from "../components/EventForm";
// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import { EventManager } from "../components/EventManeger";
// import { CreateService } from "../components/CreateService";
// import { Services } from "../components/Services";

// const AdminPanel = () => {
//   const [activeTab, setActiveTab] = useState("Users");
//   const [userData, setUserData] = useState<any[]>([]);
//   const [brands, setBrands] = useState<Brand[]>([]);
//   const [bikes, setBikes] = useState<Bike[]>([]);
//   const [accessories, setAccessories] = useState<Accessory[]>([]);
//   const [equipment, setEquipment] = useState<Equipment[]>([]);
//   const [events, setEvents] = useState<Event[]>([]);

//   const router = useRouter();

//   interface DecodedToken {
//     role: string;
//   }

//   // Check authentication and admin role
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.replace("/");
//       return;
//     }

//     try {
//       const decoded: DecodedToken = jwtDecode(token);

//       if (decoded.role !== "admin") {
//         router.replace("/");
//       }
//     } catch (err) {
//       console.error("Invalid token", err);
//       router.replace("/");
//     }
//   }, [router]);

//   // Fetch user data
//   const fetchUserData = useCallback(async () => {
//     try {
//       const response = await api.get("/api/register");
//       setUserData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch user data:", error);
//       toast.error("Failed to load user data");
//     }
//   }, []);

//   // Fetch brands
//   const fetchBrands = useCallback(async () => {
//     try {
//       const res = await api.get("/api/brands");
//       setBrands(res.data);
//     } catch (error) {
//       console.error("Failed to fetch brands:", error);
//     }
//   }, []);

//   // Fetch bikes
//   const fetchBikes = useCallback(async () => {
//     try {
//       const res = await api.get("/api/bike/bikes");
//       setBikes(res.data);
//     } catch (error) {
//       console.error("Failed to fetch bikes:", error);
//     }
//   }, []);

//   // Fetch accessories
//   const fetchAccessories = useCallback(async () => {
//     try {
//       const res = await api.get("/api/accessories");
//       setAccessories(res.data);
//     } catch (error) {
//       console.error("Failed to fetch accessories:", error);
//     }
//   }, []);

//   // Fetch events
//   const fetchEvents = useCallback(async () => {
//     try {
//       const res = await api.get("/api/event");
//       setEvents(res.data);
//     } catch (error) {
//       console.error("Failed to fetch events:", error);
//     }
//   }, []);

//   // Fetch equipment
//   const fetchEquipment = useCallback(async () => {
//     try {
//       const res = await api.get("/api/equipment");
//       setEquipment(res.data);
//     } catch (error) {
//       console.error("Failed to fetch equipment:", error);
//     }
//   }, []);

//   // Create brand
//   const handleCreateBrand = async (brandData: any) => {
//     try {
//       await api.post("/api/brands", brandData);
//       toast.success("Brand амжилттай үүслээ");
//       fetchBrands();
//     } catch (error) {
//       toast.error("Failed to create brand");
//       console.error("Failed to create brand:", error);
//     }
//   };

//   // Delete brand
//   const handleDeleteBrand = async (id: any) => {
//     try {
//       await api.delete(`/api/brands/${id}`);
//       setBrands((prev) => prev.filter((brand) => brand._id !== id));
//       toast.success("Амжилттай устлаа");
//     } catch (error) {
//       toast.error("Failed to delete brand");
//       console.error("Failed to delete brand:", error);
//     }
//   };

//   // Create accessory
//   const handleCreateAccessory = async (accessoryData: any) => {
//     try {
//       await api.post("/api/accessories", accessoryData);
//       toast.success("Accessory амжилттай үүслээ");
//       fetchAccessories();
//     } catch (error) {
//       toast.error("Failed to create accessory");
//       console.error("Failed to create accessory:", error);
//     }
//   };

//   // Delete accessory
//   const handleDeleteAccessory = async (id: any) => {
//     try {
//       await api.delete(`/api/accessories/${id}`);
//       setAccessories((prev) => prev.filter((item) => item._id !== id));
//       toast.success("Амжилттай устлаа");
//     } catch (error) {
//       toast.error("Failed to delete accessory");
//       console.error("Failed to delete accessory:", error);
//     }
//   };

//   // Create bike
//   const handleCreateBike = async (bikeData: any): Promise<void> => {
//     try {
//       await api.post("/api/bike/bikes", bikeData);
//       toast.success("Амжилттай үүслээ");
//       fetchBikes();
//     } catch (error) {
//       toast.error("Failed to create bike");
//       console.error("Failed to create bike:", error);
//     }
//   };

//   // Delete bike
//   const handleDeleteBike = async (id: any) => {
//     try {
//       await api.delete(`/api/bike/bikes/${id}`);
//       setBikes((prev) => prev.filter((bike) => bike._id !== id));
//       toast.success("Амжилттай устлаа");
//     } catch (error) {
//       toast.error("Failed to delete bike");
//       console.error("Failed to delete bike:", error);
//     }
//   };
//   const handleUpdateBike = async (id: string, data: Partial<Bike>) => {
//     try {
//       await api.put(`/api/bike/bikes/${id}`, data);
//       setBikes((prev) =>
//         prev.map((bike) => (bike._id === id ? { ...bike, ...data } : bike))
//       );
//       toast.success("Мотоцикл амжилттай шинэчлэгдлээ");
//     } catch (error) {
//       toast.error("Шинэчлэхэд алдаа гарлаа");
//       console.error("Failed to update bike:", error);
//     }
//   };

//   // Create equipment
//   const handleCreateEquipment = async (equipmentData: any) => {
//     try {
//       await api.post("/api/equipment", equipmentData);
//       toast.success("Equipment амжилттай үүслээ");
//       fetchEquipment();
//     } catch (error) {
//       toast.error("Failed to create equipment");
//       console.error("Failed to create equipment:", error);
//     }
//   };

//   // Delete equipment
//   const handleDeleteEquipment = async (id: any) => {
//     try {
//       await api.delete(`/api/equipment/${id}`);
//       setEquipment((prev) => prev.filter((item) => item._id !== id));
//       toast.success("Амжилттай устлаа");
//     } catch (error) {
//       toast.error("Failed to delete equipment");
//       console.error("Failed to delete equipment:", error);
//     }
//   };

//   // Delete event
//   const handleDeleteEvent = async (id: any) => {
//     try {
//       await api.delete(`/api/event/${id}`);
//       setEvents((prev) => prev.filter((item) => item._id !== id));
//       toast.success("Амжилттай устлаа");
//     } catch (error) {
//       toast.error("Failed to delete event");
//       console.error("Failed to delete event:", error);
//     }
//   };

//   // Create event
//   const handleCreateEvent = async (newEvent: Event) => {
//     try {
//       const res = await api.post("/api/event", newEvent);
//       toast.success("Амжилттай үүслээ");
//       setEvents([...events, res.data]);
//     } catch (err) {
//       console.error("Үүсгэхэд алдаа:", err);
//       toast.error("Үүсгэхэд алдаа гарлаа");
//     }
//   };

//   // Initial data loading & refresh user data every 30 seconds
//   useEffect(() => {
//     fetchUserData();
//     fetchBrands();
//     fetchBikes();
//     fetchAccessories();
//     fetchEquipment();
//     fetchEvents();

//     const userDataInterval = setInterval(fetchUserData, 30000);

//     return () => {
//       clearInterval(userDataInterval);
//     };
//   }, [
//     fetchUserData,
//     fetchBrands,
//     fetchEvents,
//     fetchBikes,
//     fetchAccessories,
//     fetchEquipment,
//   ]);
//   const normalizedEquipment: EquipmentItem[] = equipment.map((eq) => ({
//     ...eq,
//     brand: typeof eq.brand === "string" ? eq.brand : eq.brand.name, // if Brand object, extract name
//   }));

//   return (
//     <div className="p-4 py-32 h-fit ">
//       <div className="flex gap-12 py-12 px-32">
//         {["Users", "Moto", "Event", "Time", "Service"].map((tab) => (
//           <p
//             key={tab}
//             className={`cursor-pointer ${
//               activeTab === tab ? "text-[#e15617] underline" : "text-white"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === "Users"
//               ? "Хэрэглэгч"
//               : tab === "Moto"
//                 ? "Мото Үүсгэх"
//                 : tab === "Time"
//                   ? "Үйлчилгээ үүсгэх"
//                   : tab === "Service"
//                     ? "Үйлчилгээ Харах"
//                     : "Эвэнт харах"}
//           </p>
//         ))}
//       </div>

//       {activeTab === "Users" && <UsersTab data={userData} />}

//       {activeTab === "Moto" && (
//         <div className="grid gap-32 w-full px-32">
//           <div className="grid gap-20">
//             <BrandManager
//               brands={brands}
//               onCreateBrand={handleCreateBrand}
//               onDeleteBrand={handleDeleteBrand}
//             />

//             <AccessoryManager
//               accessories={accessories}
//               onCreateAccessory={handleCreateAccessory}
//               onDeleteAccessory={handleDeleteAccessory}
//             />
//           </div>

//           <div className="grid w-full gap-12">
//             <BikeManager
//               brands={brands}
//               bikes={bikes}
//               onCreateBike={handleCreateBike}
//               onDeleteBike={handleDeleteBike}
//               onUpdateBike={handleUpdateBike}

//             />
//             <EquipmentManager
//               equipment={normalizedEquipment}
//               onCreateEquipment={handleCreateEquipment}
//               onDeleteEquipment={handleDeleteEquipment}
//             />
//           </div>
//         </div>
//       )}

//       {activeTab === "Event" && (
//         <div className="px-32">
//           <div className="bg-[#1a1a1a] flex gap-12 w-full p-6 ">
//             <EventForm onCreate={handleCreateEvent} />
//             <EventManager events={events} onDeleteEvent={handleDeleteEvent} />
//           </div>
//         </div>
//       )}

//       {activeTab === "Time" && (
//         <div className="px-32 flex items-start gap-12">
//           <CreateService />
//         </div>
//       )}

//       {activeTab === "Service" && (
//         <div className="px-32 flex items-start gap-12">
//           <Services />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;
// src/app/admin/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import AdminLayout from "./AdminLayout";

import {
  Brand,
  Bike,
  Accessory,
  Equipment,
  Event,
  Entry,
} from "../components/Types";

import { api } from "@/lib/axios";
import { toast } from "react-toastify";

// Dynamically import tabs with SSR disabled
const UsersTab = dynamic(() => import("./tabs/UsersTab"), {
  ssr: false,
}) as React.ComponentType<{ data: Entry[] }>;

const EventTab = dynamic(() => import("./tabs/EventTab"), {
  ssr: false,
}) as React.ComponentType<{
  events: Event[];
  onCreate: (e: Event) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}>;

const MotoTab = dynamic(() => import("./tabs/MotoTab"), {
  ssr: false,
}) as React.ComponentType<{
  brands: Brand[];
  bikes: Bike[];
  accessories: Accessory[];
  equipment: Equipment[];
  onCreateBrand: (data: { name: string; slug: string }) => Promise<void>;
  onDeleteBrand: (id: string) => Promise<void>;
  onCreateAccessory: (data: {
    image: string;
    price: string;
    brand: string;
    name: string;
  }) => Promise<void>;
  onDeleteAccessory: (id: string) => Promise<void>;
  onCreateBike: (data: any) => Promise<void>;
  onDeleteBike: (id: string) => Promise<void>;
  onUpdateBike: (id: string, data: Partial<Bike>) => Promise<void>;
  onCreateEquipment: (data: {
    name: string;
    brand: string;
    price: string;
    image: string;
  }) => Promise<void>;
  onDeleteEquipment: (id: string) => Promise<void>;
}>;

const TimeTab = dynamic(() => import("./tabs/TimeTab"), {
  ssr: false,
});

const ServicesTab = dynamic(() => import("./tabs/ServicesTab"), {
  ssr: false,
});

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Users");

  // Data states
  const [userData, setUserData] = useState<Entry[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch functions (useCallback for stable references)
  const fetchUserData = useCallback(async () => {
    try {
      const res = await api.get("/api/register");
      setUserData(res.data);
    } catch {
      toast.error("Failed to load user data");
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const res = await api.get("/api/brands");
      setBrands(res.data);
    } catch {
      toast.error("Failed to load brands");
    }
  }, []);

  const fetchBikes = useCallback(async () => {
    try {
      const res = await api.get("/api/bike/bikes");
      setBikes(res.data);
    } catch {
      toast.error("Failed to load bikes");
    }
  }, []);

  const fetchAccessories = useCallback(async () => {
    try {
      const res = await api.get("/api/accessories");
      setAccessories(res.data);
    } catch {
      toast.error("Failed to load accessories");
    }
  }, []);

  const fetchEquipment = useCallback(async () => {
    try {
      const res = await api.get("/api/equipment");
      setEquipment(res.data);
    } catch {
      toast.error("Failed to load equipment");
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await api.get("/api/event");
      setEvents(res.data);
    } catch {
      toast.error("Failed to load events");
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchUserData();
    fetchBrands();
    fetchBikes();
    fetchAccessories();
    fetchEquipment();
    fetchEvents();
  }, [
    fetchUserData,
    fetchBrands,
    fetchBikes,
    fetchAccessories,
    fetchEquipment,
    fetchEvents,
  ]);

  // Handlers for Brand
  const handleCreateBrand = async (data: { name: string; slug: string }) => {
    try {
      await api.post("/api/brands", data);
      toast.success("Brand амжилттай үүслээ");
      await fetchBrands();
    } catch {
      toast.error("Failed to create brand");
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      await api.delete(`/api/brands/${id}`);
      setBrands((prev) => prev.filter((b) => b._id !== id));
      toast.success("Амжилттай устлаа");
    } catch {
      toast.error("Failed to delete brand");
    }
  };

  // Handlers for Accessory
  const handleCreateAccessory = async (data: {
    image: string;
    price: string;
    brand: string;
    name: string;
  }) => {
    try {
      await api.post("/api/accessories", data);
      toast.success("Accessory амжилттай үүслээ");
      await fetchAccessories();
    } catch {
      toast.error("Failed to create accessory");
    }
  };

  const handleDeleteAccessory = async (id: string) => {
    try {
      await api.delete(`/api/accessories/${id}`);
      setAccessories((prev) => prev.filter((a) => a._id !== id));
      toast.success("Амжилттай устлаа");
    } catch {
      toast.error("Failed to delete accessory");
    }
  };

  // Handlers for Bike
  const handleCreateBike = async (data: any) => {
    try {
      await api.post("/api/bike/bikes", data);
      toast.success("Bike амжилттай үүслээ");
      await fetchBikes();
    } catch {
      toast.error("Failed to create bike");
    }
  };

  const handleDeleteBike = async (id: string) => {
    try {
      await api.delete(`/api/bike/bikes/${id}`);
      setBikes((prev) => prev.filter((b) => b._id !== id));
      toast.success("Амжилттай устлаа");
    } catch {
      toast.error("Failed to delete bike");
    }
  };

  const handleUpdateBike = async (id: string, data: Partial<Bike>) => {
    try {
      await api.put(`/api/bike/bikes/${id}`, data);
      toast.success("Амжилттай шинэчлэгдлээ");
      await fetchBikes();
    } catch {
      toast.error("Failed to update bike");
    }
  };

  // Handlers for Event
  const handleCreateEvent = async (newEvent: Event) => {
    try {
      const res = await api.post("/api/event", newEvent);
      setEvents((prev) => [...prev, res.data]);
      toast.success("Эвэнт үүслээ");
    } catch {
      toast.error("Эвэнт үүсгэхэд алдаа гарлаа");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await api.delete(`/api/event/${id}`);
      setEvents((prev) => prev.filter((e) => e._id !== id));
      toast.success("Устлаа");
    } catch {
      toast.error("Устгахад алдаа гарлаа");
    }
  };

  // Handlers for Equipment
  const handleCreateEquipment = async (data: {
    name: string;
    brand: string;
    price: string;
    image: string;
  }) => {
    try {
      await api.post("/api/equipment", data);
      toast.success("Equipment амжилттай үүслээ");
      await fetchEquipment();
    } catch {
      toast.error("Failed to create equipment");
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    try {
      await api.delete(`/api/equipment/${id}`);
      setEquipment((prev) => prev.filter((eq) => eq._id !== id));
      toast.success("Амжилттай устлаа");
    } catch {
      toast.error("Failed to delete equipment");
    }
  };

  // Map tabs to their components and props
  const tabComponents: Record<string, React.ReactNode> = {
    Users: <UsersTab data={userData} />,
    Moto: (
      <MotoTab
        brands={brands}
        bikes={bikes}
        accessories={accessories}
        equipment={equipment}
        onCreateBrand={handleCreateBrand}
        onDeleteBrand={handleDeleteBrand}
        onCreateAccessory={handleCreateAccessory}
        onDeleteAccessory={handleDeleteAccessory}
        onCreateBike={handleCreateBike}
        onDeleteBike={handleDeleteBike}
        onUpdateBike={handleUpdateBike}
        onCreateEquipment={handleCreateEquipment}
        onDeleteEquipment={handleDeleteEquipment}
      />
    ),
    Event: (
      <EventTab
        events={events}
        onCreate={handleCreateEvent}
        onDelete={handleDeleteEvent}
      />
    ),
    Time: <TimeTab />,
    Service: <ServicesTab />,
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {tabComponents[activeTab]}
    </AdminLayout>
  );
}
