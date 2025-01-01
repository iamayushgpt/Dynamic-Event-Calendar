# Dynamic Event Calendar Application

## **Summary**

The **Dynamic Event Calendar Application** is a React.js-based web application that allows users to manage events using a modern calendar interface. The app offers features to view, add and delete events, with data saving using `localStorage`. Designed with a clean UI using Tailwind CSS, this application highlights advanced React.js logic while ensuring a responsive user experience across all devices.

### **Key Features**
1. **Calendar View:**
   - Displays a calendar grid for the current month.
   - Allows navigation between months and year using "Previous" and "Next" buttons.
   - Highlights the current day and visually distinguishes selected day tpo display events.
2. **Event Management:**
   - Add events to any date by clicking on the calendar.
   - View events for a selected date in a modal.
   - Delete existing events.
   - Filter events based on search of events name.
3. **Data Persistence:**
   - Stores all events in `localStorage` for persistence of events across sessions.
4. **Event Logic:**
   - Prevents overlapping events for the same date and time range.
   - Filters events by keyword for easy management.
5. **Responsive Design:**
   - Fully responsive layout with Tailwind CSS, ensuring usability across different devices.
6. **Added Bonus Features:**
   - Color coding for events based on categories ( Work, Personal and Others)
   - Export events for a selected month and year as JSON.

---

## **Instructions to Run the App Locally**

Follow these steps to set up and run the project on your local machine:

1. **Prerequisites:**
   - Node.js (v16 or above) and npm installed.
   - A code editor e.g. VS Code for customization and development.

2. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Application:**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` by default (for Vite).

5. **Build for Production (Optional):**
   To generate a production-ready build:
   ```bash
   npm run build
   ```

6. **Test the App:**
   - Navigate to the provided URL in your browser.
   - Interact with the calendar, add events, and test the event management features.

---

## **Deployment Link**

The application is deployed at: **[Dynamic Event Calendar App](https://your-deployment-link.com)**  

---

Let me know if you need any edits or help deploying and using this app!
Thank you!!