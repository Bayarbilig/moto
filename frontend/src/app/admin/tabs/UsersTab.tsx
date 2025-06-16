"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";
import UsersTabComponent from "../../components/UserTab";
import { Entry } from "../../components/Types";

export default function UsersTab() {
  const [users, setUsers] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/register");
        setUsers(res.data);
      } catch {
        toast.error("Хэрэглэгч татаж чадсангүй");
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  return <UsersTabComponent data={users} />;
}
