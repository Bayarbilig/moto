// src/app/admin/tabs/EventTab.tsx
"use client";

import { Event } from "@/app/components/Types";
import EventForm from "../../components/EventForm";
import { EventManager } from "../../components/EventManeger";

interface EventTabProps {
  events: Event[];
  onCreate: (newEvent: Event) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function EventTab({
  events,
  onCreate,
  onDelete,
}: EventTabProps) {
  return (
    <div className="bg-[#1a1a1a] flex gap-12 w-full p-6">
      <EventForm onCreate={onCreate} />
      <EventManager events={events} onDeleteEvent={onDelete} />
    </div>
  );
}
