# Task Management System

## 🔧 Prerequisites

Before running this application, ensure you have the following installed:

### Required Software

- **.NET 8 SDK** (8.0.0)

  - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
  - Verify installation: `dotnet --version`

- **Node.js** (18.0 or later)

  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskManagement
```

### 2. Backend Setup

#### Navigate to Backend Directory

```bash
cd Backend
```

#### Install Dependencies

```bash
dotnet restore
```

#### Configure Database (Optional)

The application uses SQLite by default. The database file `tasks.db` will be created automatically in the Backend directory on first run.

#### Run the Backend

```bash
dotnet run
```

**Backend will be available at:**

- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

### 3. Frontend Setup

#### Navigate to Frontend Directory (new terminal)

```bash
cd Frontend
```

#### Install Dependencies

```bash
npm install
```

#### Create Environment File

Create a `.env.local` file in the Frontend directory:

```bash
# Frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Run the Frontend

```bash
npm run dev
```

**Frontend will be available at:**

- Application: `http://localhost:3000`

### 4. Access the Application

1. Open your browser and go to `http://localhost:3000`
2. You should see the Task Management interface

## 🌐 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/tasks`             | Get all tasks                 |
| POST   | `/tasks`             | Create a new task             |
| PATCH  | `/tasks/{id}/toggle` | Toggle task completion status |
| DELETE | `/tasks/{id}`        | Delete a task                 |

## ⚙️ Configuration

### CORS Configuration

The backend is configured to accept requests from the frontend. CORS settings are in:

#### Backend CORS Settings

File: `Backend/appsettings.Development.json`

```json
{
  "Cors": {
    "AllowedOrigins": "http://localhost:3000"
  }
}
```

#### To Change CORS Settings:

1. **Single Origin**: Update the `AllowedOrigins` value
2. **Multiple Origins**: Use comma-separated values
   ```json
   {
     "Cors": {
       "AllowedOrigins": "http://localhost:3000,http://localhost:3001,https://yourdomain.com"
     }
   }
   ```

### Database Configuration

#### Connection String

File: `Backend/appsettings.Development.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=tasks.db"
  }
}
```
