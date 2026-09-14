import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ConfirmDelete from "./components/ConfirmDelete";
import { sampleEvents } from "./data/events";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventFormPage from "./pages/EventFormPage";
import EventDetails from "./pages/EventDetails";

const storageKey = "campus-events-desk-records";

function loadEvents() {
  try {
    const savedEvents = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(savedEvents) ? savedEvents : sampleEvents;
  } catch {
    return sampleEvents;
  }
}

function nextId(events) {
  const largestNumber = events.reduce((largest, event) => {
    return Math.max(largest, Number(event.id.split("-")[1]) || 0);
  }, 0);

  return `EVT-${String(largestNumber + 1).padStart(3, "0")}`;
}

export default function App() {
  const [events, setEvents] = useState(loadEvents);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [afterDelete, setAfterDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(events));
  }, [events]);

  function addEvent(values) {
    setEvents((current) => [...current, { ...values, id: nextId(current) }]);
  }

  function updateEvent(id, values) {
    setEvents((current) =>
      current.map((event) =>
        event.id === id ? { ...event, ...values, id } : event,
      ),
    );
  }

  function requestDelete(event, callback) {
    setEventToDelete(event);
    setAfterDelete(() => callback ?? null);
  }

  function cancelDelete() {
    setEventToDelete(null);
    setAfterDelete(null);
  }

  function deleteEvent() {
    setEvents((current) =>
      current.filter((event) => event.id !== eventToDelete.id),
    );
    const callback = afterDelete;
    cancelDelete();
    callback?.();
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard events={events} />} />
        <Route
          path="/events"
          element={<Events events={events} onDelete={requestDelete} />}
        />
        <Route
          path="/events/new"
          element={
            <EventFormPage
              events={events}
              onAdd={addEvent}
              onUpdate={updateEvent}
            />
          }
        />
        <Route
          path="/events/:id"
          element={<EventDetails events={events} onDelete={requestDelete} />}
        />
        <Route
          path="/events/:id/edit"
          element={
            <EventFormPage
              events={events}
              onAdd={addEvent}
              onUpdate={updateEvent}
            />
          }
        />
        <Route path="*" element={<Dashboard events={events} />} />
      </Routes>
      {eventToDelete && (
        <ConfirmDelete
          eventName={eventToDelete.name}
          onConfirm={deleteEvent}
          onCancel={cancelDelete}
        />
      )}
    </Layout>
  );
}
