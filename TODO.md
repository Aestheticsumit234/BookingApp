# Event Booking System Features

### 1. Authentication & Role Management (1 feature pending.)

This section defines the access levels and security for the application:

- **User/Attendee:** Browse available events, view details, and book tickets.
- **Organizer/Admin:** Create new events, manage existing listings, and view attendee/booking lists.

- **Auth Features:** \* Social Login integration (Google/GitHub).
  - Secure sessions using **JWT (JSON Web Tokens)**.
  - "Forgot Password" functionality with email recovery.

---

### 2. Event Management (CRUD)

The core module to handle all event-related data:

- **Create:** Set event title, description, category (Tech, Music, Workshop), date, time, venue/link, and pricing.
- **Image Upload:** Support for uploading event banners or posters (e.g., via **Cloudinary**).
- **Show/Search:** Advanced discovery tools for users:
  - _Sort by Date_
  - _Filter by Category_
  - _Search by Location or Venue_

---

### 3. Booking & Payments

The business logic that powers the transaction flow:

- **Seat Availability:** Real-time tracking to check if seats are available or if the event is "Sold Out."
- **Booking Process:** Single-click booking confirmation that links the ticket to the user’s profile.
- **Payment Integration:** Secure payment processing for paid events using **Razorpay** or **Stripe**.

---

### 4. Advanced Features (USP)

Unique Selling Points that make the project stand out:

- **QR Code Tickets:** Generate a unique QR code upon successful booking for easy entry verification.
- **Email Notifications:** Automated confirmation and reminder emails using **Nodemailer**.
- **Real-time Updates:** Instant notifications via **Socket.io** if an event is cancelled or rescheduled.
- **Ratings & Reviews:** A feedback system for users to rate and review events after they conclude.

- ## Hamne abhi admin kw liye Bookings ka routes nhi kiya hai
