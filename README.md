TicketHub

A simple ticketing system built with React and Node.js.

Features
- Login page with form validation
- Dashboard to view and filter tickets
- Ticket details view with conversation thread
- Ticket properties panel (Priority, Status, Assignee)
- Responsive sidebar navigation

Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Icons**: Lucide React

Getting Started

Prerequisites
- Node.js installed

Installation

1.  Clone the repository.
2.  Install Backend Dependencies:
    ```bash
    cd backend
    npm install
    ```
3.  Install Frontend Dependencies:
    ```bash
    cd frontend
    npm install
    ```

How to Run

1.  Start the Backend (runs on port 5000):
    ```bash
    cd backend
    npm run dev
    ```
2.  Start the Frontend (runs on port 5173):
    ```bash
    cd frontend
    npm run dev
    ```
3.  Open `http://localhost:5173` in your browser.

Demo Login
- **Email**: `demo@tickethub.com`
- **Password**: `TicketHub@2026`

Project Structure
- `/backend`: Simple Express server serving `tickets.json` data.
- `/frontend`: React application created with Vite.

Notes
- This is a portfolio project focused on frontend development.
- Data is stored in a JSON file, simulating a real database.
- Authentication uses local storage for simplicity.
