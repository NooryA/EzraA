# Task Management System

A full-stack task management application built with .NET 8 Web API backend and Next.js 14 TypeScript frontend. This application allows users to create, view, toggle completion status, and delete tasks with real-time updates and modern UI design.

## 🎯 Features

### Core Functionality

- ✅ **Create Tasks**: Add new tasks with title and description
- 📋 **View Tasks**: Display all tasks in an organized list
- ☑️ **Toggle Completion**: Mark tasks as complete/incomplete with a single click
- 🗑️ **Delete Tasks**: Remove tasks permanently with confirmation modal
- 📊 **Task Statistics**: View completion progress and task counts
- 🔍 **Filter & Sort**: Filter by status and sort by date/title

### Enhanced Features

- 🎨 **Modern UI**: Beautiful, responsive design with CSS modules
- 📱 **Mobile Responsive**: Optimized for all device sizes
- ⚡ **Real-time Updates**: Instant UI updates with API synchronization
- 🛠️ **Error Handling**: Comprehensive error handling with user feedback
- ♿ **Accessibility**: ARIA labels and keyboard navigation support
- 🔄 **Loading States**: Visual feedback during API operations
- 🔒 **Type Safety**: Full TypeScript support for enhanced developer experience

## 🏗️ Architecture

### Backend (.NET 8 Web API)

- **Clean Architecture**: Organized with Models, DTOs, Services, and Controllers
- **Entity Framework Core**: SQLite database with Code-First approach
- **RESTful API**: Standard HTTP methods with proper status codes
- **CORS Enabled**: Cross-origin requests configured for frontend
- **Swagger Documentation**: API documentation available at `/swagger`
- **Dependency Injection**: Proper DI container setup

### Frontend (Next.js 14 with TypeScript)

- **Next.js 14**: Latest React framework with modern features
- **TypeScript**: Full type safety across the application
- **Component-Based**: Modular React components with CSS modules
- **API Integration**: Axios for HTTP requests with TypeScript interfaces
- **Responsive Design**: CSS modules with modern responsive layouts
- **SSR Ready**: Server-side rendering capabilities

### Database (SQLite)

- **File-based Database**: No server installation required
- **Entity Framework Core**: Code-First approach with automatic migrations
- **Auto-creation**: Database and tables created automatically on first run

## 🔧 Prerequisites

Before running this application, ensure you have the following installed:

### Required Software

- **.NET 8 SDK** (8.0.0 or later)

  - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
  - Verify installation: `dotnet --version`

- **Node.js** (18.0 or later)

  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

### Optional but Recommended

- **Visual Studio Code** with extensions:
  - C# for Visual Studio Code
  - REST Client (for testing API endpoints)
  - TypeScript and JavaScript Language Features

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
- Swagger UI: `http://localhost:5000/swagger`

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
3. Backend API documentation is available at `http://localhost:5000/swagger`

## 📁 Project Structure

```
TaskManagement/
├── Backend/                           # .NET 8 Web API
│   ├── Controllers/
│   │   └── TasksController.cs         # API endpoints
│   ├── Data/
│   │   └── TaskDbContext.cs           # Database context
│   ├── DTOs/
│   │   ├── CreateTaskDTO.cs           # Data transfer objects
│   │   └── TaskDTO.cs
│   ├── Models/
│   │   └── TaskModel.cs               # Entity models
│   ├── Services/
│   │   ├── ITaskService.cs            # Service interfaces
│   │   └── TaskService.cs             # Business logic
│   ├── Properties/
│   │   └── launchSettings.json        # Launch configuration
│   ├── Program.cs                     # Application entry point
│   ├── appsettings.Development.json   # Development configuration
│   ├── TaskManagementApi.csproj       # Project file
│   └── tasks.db                       # SQLite database (auto-created)
│
├── Frontend/                          # Next.js 14 TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Modal.module.css
│   │   │   ├── TaskForm/
│   │   │   │   ├── TaskForm.tsx
│   │   │   │   └── TaskForm.module.css
│   │   │   ├── TaskItem/
│   │   │   │   ├── TaskItem.tsx
│   │   │   │   └── TaskItem.module.css
│   │   │   └── TaskList/
│   │   │       ├── TaskList.tsx
│   │   │       └── TaskList.module.css
│   │   ├── axios/
│   │   │   ├── config.ts              # Axios configuration
│   │   │   └── taskHelper.ts          # API helper functions
│   │   ├── pages/
│   │   │   ├── _app.tsx               # App component
│   │   │   └── index.tsx              # Home page
│   │   └── styles/
│   │       └── globals.css            # Global styles
│   ├── DTO/
│   │   ├── CreateTaskDTO.ts           # TypeScript interfaces
│   │   └── TaskDTO.ts
│   ├── .env.local                     # Environment variables (create this)
│   ├── next.config.js                 # Next.js configuration
│   ├── package.json                   # Dependencies and scripts
│   └── tsconfig.json                  # TypeScript configuration
│
└── README.md                          # This file
```

## 🌐 API Endpoints

### Base URL: `http://localhost:5000`

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/tasks`             | Get all tasks                 |
| POST   | `/tasks`             | Create a new task             |
| PATCH  | `/tasks/{id}/toggle` | Toggle task completion status |
| DELETE | `/tasks/{id}`        | Delete a task                 |

### Request/Response Examples

#### Create Task

```bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README with setup instructions"
}
```

#### Response

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README with setup instructions",
  "isCompleted": false,
  "createdAt": "12/07/2024 02:30 PM EST",
  "updatedAt": "12/07/2024 02:30 PM EST"
}
```

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

#### CORS Implementation

File: `Backend/Program.cs`

```csharp
// CORS configuration
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Value?.Split(',') ?? new[] { "http://localhost:3000" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});
```

### Frontend API Configuration

#### Environment Variables

Create `Frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### For Production:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
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

#### To Change Database Location:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=C:\\MyApp\\tasks.db"
  }
}
```

## 🔧 Development Scripts

### Backend Commands

```bash
# Navigate to backend
cd Backend

# Restore packages
dotnet restore

# Run development server
dotnet run

# Run with watch (auto-restart on changes)
dotnet watch run

# Build for production
dotnet build

# Run tests (if any)
dotnet test
```

### Frontend Commands

```bash
# Navigate to frontend
cd Frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🔒 Security Considerations

1. **CORS**: Properly configured for development, update for production
2. **Input Validation**: Both client and server-side validation implemented
3. **SQL Injection**: Entity Framework Core provides protection
4. **Error Handling**: Sensitive information not exposed in error messages

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**1. "Port already in use"**

```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process or change port in launchSettings.json
```

**2. "Database connection failed"**

- Ensure SQLite is supported on your system
- Check file permissions in Backend directory
- Delete `tasks.db` and restart to recreate

**3. "CORS errors"**

- Verify `AllowedOrigins` in `appsettings.Development.json`
- Ensure frontend URL matches CORS configuration
- Check that CORS policy is applied correctly

#### Frontend Issues

**1. "API calls failing"**

- Verify backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure no trailing slash in API URL

**2. "Module not found errors"**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. "TypeScript errors"**

```bash
# Run type checking
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Performance Optimization

#### Backend

- Database indexes are automatically created by EF Core
- Consider pagination for large datasets
- Implement caching for frequently accessed data

#### Frontend

- Components use React.memo for optimization
- CSS modules for efficient styling
- Lazy loading for better performance

## 🚀 Deployment

### Backend Deployment

1. **Build the application**:

   ```bash
   dotnet publish -c Release -o ./publish
   ```

2. **Configure production settings**:
   - Update `appsettings.json` with production values
   - Set proper CORS origins
   - Configure production database connection

### Frontend Deployment

1. **Build the application**:

   ```bash
   npm run build
   ```

2. **Configure environment**:
   - Set `NEXT_PUBLIC_API_URL` to production API URL
   - Update any other environment variables

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Real-time updates with SignalR
- [ ] Task sharing and collaboration
- [ ] Mobile app development
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Task templates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the GitHub issues
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

---

**Happy Task Managing! 🎉**
