import { AlertTriangle } from "lucide-react";

export default function ConfirmDelete({ eventName, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="warning-icon" aria-hidden="true">
          <AlertTriangle size={20} />
        </div>
        <h2 id="delete-title">Delete this event?</h2>
        <p>
          <strong>{eventName}</strong> will be permanently removed.
        </p>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            type="button"
            onClick={onCancel}
          >
            Keep
          </button>
          <button
            className="button button-danger"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}
