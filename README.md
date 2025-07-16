# Flight Reservation System

A full-stack flight reservation system with a Spring Boot backend (PostgreSQL, Docker, Kubernetes, Swagger) and a React (Vite) frontend.

---

## Features

- **Backend:**
  - RESTful API for managing flight tickets and companies
  - Search tickets by address, destination, and kickoff
  - PostgreSQL database
  - Swagger/OpenAPI documentation
  - Docker and Kubernetes deployment
- **Frontend:**
  - React (Vite) app for ticket management
  - Create, list, and search tickets
  - Company selection for ticket creation

---

## Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Docker & Kubernetes (for containerized deployment)

---

## Backend Setup

1. **Configure Database:**

   - Create a PostgreSQL database and user matching `src/main/resources/application.properties`.
   - Example:
     ```sql
     CREATE DATABASE flight_reservation;
     CREATE USER teghalight_reservation WITH PASSWORD 'password';
     GRANT ALL PRIVILEGES ON DATABASE flight_reservation TO teghalight_reservation;
     ```

2. **Run Backend Locally:**

   ```sh
   ./mvnw spring-boot:run
   # or
   mvn spring-boot:run
   ```

3. **API Docs:**
   - Visit `http://localhost:8080/swagger-ui.html` or `/swagger-ui/index.html` for Swagger UI.

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Run frontend:**
   ```sh
   npm run dev
   ```
   - App runs at `http://localhost:5173/`
   - Ensure backend API is running and accessible.

---

## Docker & Kubernetes

- **Docker:**
  - Build and run backend container:
    ```sh
    docker build -t flight-reservation-backend .
    docker run -p 8080:8080 flight-reservation-backend
    ```
- **Kubernetes:**
  - Manifests are in the `k8s/` directory for backend and database.
  - Deploy with:
    ```sh
    kubectl apply -f k8s/
    ```

---

## Project Structure

```
flight-reservation-backend/
├── src/                # Spring Boot backend
├── frontend/           # React frontend
├── k8s/                # Kubernetes manifests
├── Dockerfile          # Backend Dockerfile
├── README.md           # This file
└── ...
```

---

## Common Issues

- **Database connection errors:** Ensure DB credentials in `application.properties` match your PostgreSQL setup.
- **CORS errors:** Make sure backend allows requests from frontend origin.
- **Kubernetes:** Check pod logs and service endpoints if something doesn’t work.

---

## License

MIT
