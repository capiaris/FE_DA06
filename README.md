# Booking System Frontend

A React-based user interface for the Booking System, built with Vite and React Router.

## Tech Stack

- React 18
- Vite
- React Router DOM

## Features

- **Home Page**: Dashboard and navigation menu.
- **Booking Form**: Create new appointments with specific time slot selection (:00 and :30).
- **Schedule Board**: Real-time daily view of all bookings, including visual indicators for slot capacity (max 3 people per slot).

## Project Structure

    client/
    ├── src/
    │   ├── components/      # Shared UI components (e.g., Header)
    │   ├── features/        # Feature-specific components (BookingForm, ScheduleBoard)
    │   ├── layouts/         # Page layouts (MainLayout)
    │   ├── pages/           # Route pages (HomePage, BookingPage, SchedulePage)
    │   ├── services/        # API integration (api.js)
    │   ├── utils/           # Constants and helpers
    │   ├── App.jsx          # App routing configuration
    │   └── main.jsx         # Application entry point
    ├── package.json
    └── vite.config.js

## Setup & Installation

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

## Configuration

By default, the frontend is configured to communicate with the backend API at `http://localhost:3000/api`. If your backend runs on a different port, update the `API_URL` constant in `src/services/api.js`.
