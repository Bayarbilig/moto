"use client";

import { Bike } from "../Types";
import BikeCard from "./BikeCard";

export default function BikeGrid({
  bikes,
  onSelect,
}: {
  bikes: Bike[];
  onSelect: (b: Bike) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard key={bike._id} bike={bike} onClick={() => onSelect(bike)} />
      ))}
    </div>
  );
}
