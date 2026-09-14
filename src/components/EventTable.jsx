import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function EventTable({ events, onDelete }) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <h2>No matches</h2>
        <p>Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>When</th>
            <th>Where</th>
            <th>By</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>
                <Link className="event-name" to={`/events/${event.id}`}>
                  {event.name}
                </Link>
                <span className="event-id">{event.id}</span>
              </td>
              <td>
                {formatDate(event.date)}
                <span className="time-text">{event.time}</span>
              </td>
              <td>{event.venue}</td>
              <td>{event.organizer}</td>
              <td>
                <StatusBadge status={event.status} />
              </td>
              <td className="actions">
                <Link
                  className="icon-button"
                  to={`/events/${event.id}/edit`}
                  aria-label={`Edit ${event.name}`}
                >
                  <Pencil size={16} />
                </Link>
                <button
                  className="icon-button danger-action"
                  type="button"
                  onClick={() => onDelete(event)}
                  aria-label={`Delete ${event.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
