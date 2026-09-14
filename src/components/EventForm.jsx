import { CalendarDays, Clock3, MapPin, UsersRound } from "lucide-react";
import { useState } from "react";

const emptyEvent = {
  name: "",
  description: "",
  date: "",
  time: "",
  venue: "",
  organizer: "",
  capacity: "",
  status: "Upcoming",
};

const requiredFields = ["name", "date", "time", "venue", "organizer"];

export default function EventForm({ initialEvent, onSave, onCancel }) {
  const [values, setValues] = useState(initialEvent ?? emptyEvent);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function getErrors() {
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!values[field]?.trim()) nextErrors[field] = "Required";
    });

    if (!values.capacity || Number(values.capacity) < 1) {
      nextErrors.capacity = "Enter 1 or more";
    }

    return nextErrors;
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = getErrors();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSave({ ...values, capacity: Number(values.capacity) });
    }
  }

  function fieldError(name) {
    return errors[name] && <span className="field-error">{errors[name]}</span>;
  }

  return (
    <form className="event-form" onSubmit={submit} noValidate>
      <fieldset>
        <legend>Event</legend>
        <label className="field full">
          Name
          <input
            name="name"
            value={values.name}
            onChange={updateField}
            aria-invalid={Boolean(errors.name)}
          />
          {fieldError("name")}
        </label>
        <label className="field full">
          Details <span className="optional">Optional</span>
          <textarea
            name="description"
            value={values.description}
            onChange={updateField}
            rows="4"
            placeholder="A short description"
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>When & where</legend>
        <div className="form-grid">
          <label className="field icon-field">
            <span>
              <CalendarDays size={15} aria-hidden="true" /> Date
            </span>
            <input
              name="date"
              type="date"
              value={values.date}
              onChange={updateField}
              aria-invalid={Boolean(errors.date)}
            />
            {fieldError("date")}
          </label>
          <label className="field icon-field">
            <span>
              <Clock3 size={15} aria-hidden="true" /> Time
            </span>
            <input
              name="time"
              type="time"
              value={values.time}
              onChange={updateField}
              aria-invalid={Boolean(errors.time)}
            />
            {fieldError("time")}
          </label>
          <label className="field full icon-field">
            <span>
              <MapPin size={15} aria-hidden="true" /> Venue
            </span>
            <input
              name="venue"
              value={values.venue}
              onChange={updateField}
              aria-invalid={Boolean(errors.venue)}
            />
            {fieldError("venue")}
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Manage</legend>
        <div className="form-grid">
          <label className="field">
            Organizer
            <input
              name="organizer"
              value={values.organizer}
              onChange={updateField}
              aria-invalid={Boolean(errors.organizer)}
            />
            {fieldError("organizer")}
          </label>
          <label className="field icon-field">
            <span>
              <UsersRound size={15} aria-hidden="true" /> Capacity
            </span>
            <input
              name="capacity"
              type="number"
              min="1"
              value={values.capacity}
              onChange={updateField}
              aria-invalid={Boolean(errors.capacity)}
            />
            {fieldError("capacity")}
          </label>
          <label className="field">
            Status
            <select name="status" value={values.status} onChange={updateField}>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </label>
        </div>
      </fieldset>

      <div className="form-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button className="button button-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
