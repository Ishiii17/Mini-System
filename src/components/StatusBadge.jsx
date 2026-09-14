export default function StatusBadge({ status }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>
      <span aria-hidden="true" />
      {status}
    </span>
  );
}
