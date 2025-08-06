# Apollonia Dental Practice - Employee Management System

A comprehensive CRUD web application for managing employees and departments at Apollonia Dental Practice. Built with Node.js, Express, MongoDB, and a modern web interface.

## Features

- **Employee Management**: Create, read, update, and delete employee records
- **Department Management**: Manage departments with assigned managers
- **Modern UI**: Responsive design with a professional dental practice theme
- **Search Functionality**: Search employees and departments
- **Real-time Updates**: Dynamic data updates without page refresh
- **RESTful API**: Complete REST API for all CRUD operations

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Containerization**: Docker & Docker Compose
- **UI Framework**: Custom CSS with Font Awesome icons

## Project Structure

```
apollonia-dental-employee-management/
├── app/
│   ├── controllers/
│   │   ├── employee.controller.js
│   │   └── department.controller.js
│   ├── models/
│   │   ├── employee.model.js
│   │   ├── department.model.js
│   │   └── index.js
│   └── routes/
│       ├── employee.routes.js
│       └── department.routes.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Database Schema

### Employee Model
- `employeeId` (String, unique): Employee identification number
- `firstName` (String): Employee's first name
- `lastName` (String): Employee's last name
- `email` (String, unique): Employee's email address
- `phone` (String): Employee's phone number
- `position` (String): Employee's job position
- `department` (ObjectId, ref: Department): Associated department
- `hireDate` (Date): Date of hire
- `salary` (Number): Employee's salary
- `isActive` (Boolean): Employment status

### Department Model
- `departmentCode` (String, unique): Department code
- `name` (String, unique): Department name
- `description` (String): Department description
- `manager` (ObjectId, ref: Employee): Department manager
- `location` (String): Department location
- `isActive` (Boolean): Department status

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/active` - Get active employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `DELETE /api/employees` - Delete all employees

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/active` - Get active departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department
- `DELETE /api/departments` - Delete all departments

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Docker & Docker Compose (optional)

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd apollonia-dental-employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Web UI: http://localhost:8080
   - API: http://localhost:8080/api

### Option 2: Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Web UI: http://localhost:8080
   - API: http://localhost:8080/api

## Usage

### Web Interface
1. Open your browser and navigate to `http://localhost:8080`
2. Use the tabs to switch between Employees and Departments
3. Click "Add Employee" or "Add Department" to create new records
4. Use the search functionality to filter records
5. Click the edit or delete buttons to modify records

### API Usage
The application provides a RESTful API for programmatic access:

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Create a new employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@apollonia.com",
    "phone": "555-0123",
    "position": "Dentist",
    "department": "department_id_here",
    "salary": 75000
  }'
```

## Development

### Running in Development Mode
```bash
npm run dev
```

This will start the server with nodemon for automatic restarts on file changes.

### Adding New Features
1. Create new models in `app/models/`
2. Add controllers in `app/controllers/`
3. Define routes in `app/routes/`
4. Update the frontend JavaScript as needed

## Docker Commands

```bash
# Build the application
docker build -t apollonia-dental .

# Run with Docker Compose
docker-compose up

# Run in background
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/apollonia_dental`)
- `PORT`: Server port (default: `8080`)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the Apollonia Dental Practice development team.

---

**Note**: This application is designed specifically for Apollonia Dental Practice and includes features tailored to dental practice management needs. 