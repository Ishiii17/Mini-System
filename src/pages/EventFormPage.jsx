import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function EventFormPage({ events, onAdd, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const existingEvent = id ? events.find((event) => event.id === id) : null;

  if (isEditing && !existingEvent) {
    return (
      <section className="not-found">
        <h1>Event not found</h1>
        <p>This record may have been deleted.</p>
        <Link className="button button-primary" to="/events">
          Back to events
        </Link>
      </section>
    );
  }

  function save(values) {
    if (isEditing) onUpdate(id, values);
    else onAdd(values);

    navigate("/events");
  }

  return (
    <>
      <section className="form-heading">
        <Link to="/events" className="back-link">
          <ArrowLeft size={16} /> Events
        </Link>
        <p className="eyebrow">{isEditing ? "EDIT RECORD" : "NEW RECORD"}</p>
        <h1>{isEditing ? "Refine the details." : "Make it happen."}</h1>
      </section>
      <section className="form-panel">
        <EventForm
          initialEvent={existingEvent}
          onSave={save}
          onCancel={() => navigate(isEditing ? `/events/${id}` : "/events")}
        />
      </section>
    </>
  );
}
