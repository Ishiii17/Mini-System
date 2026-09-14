import { ListFilter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EventTable from "../components/EventTable";

export default function Events({ events, onDelete }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const filteredEvents = useMemo(
    () =>
      events
        .filter((event) => {
          const searchableText = [event.name, event.venue, event.organizer]
            .join(" ")
            .toLowerCase();
          return (
            searchableText.includes(query.toLowerCase()) &&
            (status === "All" || event.status === status)
          );
        })
        .sort((first, second) => first.date.localeCompare(second.date)),
    [events, query, status],
  );

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">ARCHIVE / EVENTS</p>
          <h1>Event index.</h1>
        </div>
        <Link className="button button-primary" to="/events/new">
          <Plus size={17} /> New event
        </Link>
      </section>

      <section className="panel events-panel">
        <div className="filters">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search events</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
            />
          </label>
          <label className="select-field">
            <ListFilter size={17} aria-hidden="true" />
            <span className="sr-only">Filter by status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>All</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </label>
        </div>
        <p className="record-count">
          {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"}
        </p>
        <EventTable events={filteredEvents} onDelete={onDelete} />
      </section>
    </>
  );
}
