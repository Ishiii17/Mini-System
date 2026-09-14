import {
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function getDateParts(date) {
  const eventDate = new Date(`${date}T00:00:00`);

  return {
    day: eventDate.getDate(),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      eventDate,
    ),
  };
}

export default function Dashboard({ events }) {
  const upcoming = events
    .filter((event) => event.status === "Upcoming")
    .sort((first, second) => first.date.localeCompare(second.date));

  const summary = [
    { label: "All events", value: events.length, icon: CalendarCheck2 },
    { label: "Upcoming", value: upcoming.length, icon: Clock3 },
    {
      label: "Completed",
      value: events.filter((event) => event.status === "Completed").length,
      icon: CheckCircle2,
    },
  ];

  return (
    <>
      <section className="page-heading dashboard-heading">
        <div>
          <p className="eyebrow">EVENTS DESK / 2026</p>
          <h1>What’s on.</h1>
        </div>
        <Link className="button button-primary" to="/events/new">
          <Plus size={17} /> New event
        </Link>
      </section>

      <section className="summary-grid" aria-label="Event summary">
        {summary.map(({ label, value, icon: Icon }) => (
          <article className="summary-card" key={label}>
            <span className="summary-icon">
              <Icon size={16} />
            </span>
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </section>

      <section className="panel upcoming-panel">
        <div className="panel-heading">
          <h2>Upcoming schedule</h2>
          <Link className="text-link" to="/events">
            All events <ChevronRight size={15} />
          </Link>
        </div>
        {upcoming.length ? (
          <div className="upcoming-list">
            {upcoming.slice(0, 4).map((event) => {
              const date = getDateParts(event.date);

              return (
                <Link
                  to={`/events/${event.id}`}
                  className="upcoming-event"
                  key={event.id}
                >
                  <span className="event-number">
                    0{upcoming.indexOf(event) + 1}
                  </span>
                  <div className="date-block">
                    <strong>{date.day}</strong>
                    <span>{date.month}</span>
                  </div>
                  <div>
                    <h3>{event.name}</h3>
                    <p>
                      {event.time} · {event.venue}
                    </p>
                  </div>
                  <StatusBadge status={event.status} />
                  <ChevronRight
                    className="event-chevron"
                    size={18}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <h2>Nothing scheduled</h2>
            <p>Create an event to begin.</p>
          </div>
        )}
      </section>
    </>
  );
}
