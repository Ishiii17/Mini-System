# Gather

Gather is a lightweight campus event management system built with React. It provides a simple interface for creating, viewing, editing, searching, filtering, and deleting campus event records.

## Features

- Create, view, edit, and delete event records
- Search events by name, venue, or organizer
- Filter events by status: Upcoming, Completed, or Cancelled
- View upcoming events and summary counts on the dashboard
- Persist event records in browser `localStorage`
- Responsive editorial studio-style interface
- Accessible icon actions and delete confirmation dialog

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Dashboard with event summary and upcoming schedule |
| `/events` | Searchable and filterable event index |
| `/events/new` | Create an event |
| `/events/:id` | View event details |
| `/events/:id/edit` | Edit an event using the shared form |

The Add Event and Edit Event routes use the same form component, making this a four-page frontend system.

## Tech Stack

- React
- React Router DOM
- Vite
- Lucide React icons
- Plain CSS
- Browser `localStorage`

## Getting Started

```bash
git clone https://github.com/Ishiii17/Mini-System.git
cd Mini-System
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
```

## Event Record

Each event includes an ID, name, description, date, time, venue, organizer, capacity, and status.

```js
{
  id: "EVT-001",
  name: "Tech Innovation Fair",
  description: "Student technology showcase.",
  date: "2026-10-05",
  time: "09:00",
  venue: "Main Auditorium",
  organizer: "Computer Society",
  capacity: 200,
  status: "Upcoming"
}
```

## Data Persistence

Gather stores event records locally in the browser. New records, edits, and deletions remain available after refreshing the page in the same browser.

To restore the original sample events, clear the site's local storage in your browser developer tools.
