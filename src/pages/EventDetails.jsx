import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function displayDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function EventDetails({ events, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((item) => item.id === id);

  if (!event) {
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

  const details = [
    { label: "Date", value: displayDate(event.date), icon: CalendarDays },
    { label: "Time", value: event.time, icon: Clock3 },
    { label: "Venue", value: event.venue, icon: MapPin },
    { label: "Organizer", value: event.organizer, icon: UserRound },
    { label: "Capacity", value: `${event.capacity} people`, icon: UsersRound },
  ];

  function remove() {
    onDelete(event, () => navigate("/events"));
  }

  return (
    <>
      <Link to="/events" className="back-link">
        <ArrowLeft size={16} /> Events
      </Link>
      <section className="detail-heading">
        <div>
          <p className="eyebrow">EVENT / {event.id}</p>
          <h1>{event.name}</h1>
          <StatusBadge status={event.status} />
        </div>
        <div className="detail-actions">
          <Link className="icon-text-button" to={`/events/${event.id}/edit`}>
            <Pencil size={17} /> Edit
          </Link>
          <button
            className="icon-button danger-action"
            type="button"
            onClick={remove}
            aria-label="Delete event"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </section>
      <section className="detail-grid">
        <article className="panel details-card">
          <h2>Details</h2>
          <dl>
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label}>
                <dt>
                  <Icon size={16} /> {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article className="panel description-card">
          <h2>About</h2>
          <p>{event.description || "No description added."}</p>
        </article>
      </section>
    </>
  );
}
