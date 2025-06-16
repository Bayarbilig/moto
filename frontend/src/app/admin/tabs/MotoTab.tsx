"use client";

import React from "react";
import BrandManager from "@/app/components/BrandManeger";
import AccessoryManager from "@/app/components/AccessoryManeger";
import { BikeManager } from "@/app/components/BikeManeger";
import { EquipmentManager } from "@/app/components/EquipmentManeger";
import { Accessory, Bike, Brand, Equipment } from "@/app/components/Types";

interface MotoTabProps {
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
  onDeleteEquipment: (id: string) => void; // or Promise<void>
}

export default function MotoTab({
  brands,
  bikes,
  accessories,
  equipment,
  onCreateBrand,
  onDeleteBrand,
  onCreateAccessory,
  onDeleteAccessory,
  onCreateBike,
  onDeleteBike,
  onUpdateBike,
  onCreateEquipment,
  onDeleteEquipment,
}: MotoTabProps) {
  // Normalize equipment brand name
  const normalizedEquipment = equipment.map((eq) => ({
    ...eq,
    brand: typeof eq.brand === "string" ? eq.brand : eq.brand?.name || "",
  }));

  // Normalize bike brand in case it's a populated object instead of just string id
  const normalizedBikes = bikes.map((bike) => ({
    ...bike,
    brand: typeof bike.brand === "string" ? bike.brand : bike.brand?._id || "",
  }));

  return (
    <div className="grid gap-32 w-full px-8 md:px-32">
      <div className="grid gap-20">
        <BrandManager
          brands={brands}
          onCreateBrand={onCreateBrand}
          onDeleteBrand={onDeleteBrand}
        />
        <AccessoryManager
          accessories={accessories}
          onCreateAccessory={onCreateAccessory}
          onDeleteAccessory={onDeleteAccessory}
        />
      </div>
      <div className="grid w-full gap-12">
        <BikeManager
          brands={brands}
          bikes={normalizedBikes}
          onCreateBike={onCreateBike}
          onDeleteBike={onDeleteBike}
          onUpdateBike={onUpdateBike}
        />
        <EquipmentManager
          equipment={normalizedEquipment}
          onCreateEquipment={onCreateEquipment}
          onDeleteEquipment={onDeleteEquipment}
        />
      </div>
    </div>
  );
}
