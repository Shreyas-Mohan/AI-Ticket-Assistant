# 🎫 AI Ticket Assistant

A modern, intelligent ticket management system powered by AI that automatically analyzes tickets, suggests relevant skills, and matches them with the right developers. Built with event-driven architecture using **Inngest** for reliable background processing, this project leverages AI capabilities to streamline project management and task assignment.

## 🚀 Features

### Backend Features (Complete)
- **🤖 AI-Powered Ticket Analysis**: Automatically analyzes ticket content to extract relevant skills and provide helpful insights
- **📋 Smart Ticket Management**: Complete CRUD operations for tickets with status tracking
- **👥 User Management**: Secure authentication with role-based access control (user, moderator, admin)
- **🎯 Intelligent Assignment**: AI suggests the best developers for tickets based on required skills
- **📧 Email Notifications**: Automated email system for ticket updates and assignments
- **⚡ Event-Driven Architecture**: Uses Inngest for reliable background processing
- **🔐 JWT Authentication**: Secure token-based authentication system
- **📊 Priority & Deadline Management**: Organize tickets by priority and track deadlines

### AI Capabilities
- **Smart Skill Extraction**: Automatically identifies required technical skills from ticket descriptions
- **Helpful Notes Generation**: AI provides contextual notes and suggestions for ticket resolution
- **Developer Matching**: Intelligent matching of tickets to developers based on skill sets

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - Fast and minimal web framework
- **MongoDB** with **Mongoose** - NoSQL database for flexible data storage
- **Inngest** - Event-driven background processing and workflows
- **@inngest/agent-kit** - AI agent capabilities for ticket analysis
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing and security
- **Nodemailer** - Email service integration
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server with hot reload
- **dotenv** - Environment variable management

## 📁 Project Structure

```
AI TICKET ASSISTANT/
├── 📄 index.js                    # Main server file
├── 📄 package.json               # Dependencies and scripts
├── 📂 controllers/               # Business logic
│   ├── ticket.js                # Ticket operations
│   └── user.js                  # User operations
├── 📂 models/                   # Database schemas
│   ├── ticket.model.js         # Ticket data model
│   └── user.model.js           # User data model
├── 📂 routes/                   # API endpoints
│   ├── agent.js                # AI agent routes
│   ├── ticket.js               # Ticket API routes
│   └── user.js                 # User API routes
├── 📂 inngest/                  # Event processing
│   ├── client.js               # Inngest client setup
│   └── functions/              # Background functions
│       ├── on-signup.js        # User signup events
│       └── on-ticket-create.js # Ticket creation events
├── 📂 middleware/               # Custom middleware
│   └── auth.js                 # Authentication middleware
├── 📂 utils/                    # Utility functions
│   └── mailer.js               # Email service
└── 📂 ai-assistant-frontend/    # Frontend (In Progress)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shreyas-Mohan/chai-aur-backend.git
   cd "AI TICKET ASSISTANT"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start Inngest development server** (in a separate terminal)
   ```bash
   npm run inngest-dev
   ```

The server will be running at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tickets
- `GET /api/ticket` - Get all tickets
- `POST /api/ticket` - Create new ticket
- `GET /api/ticket/:id` - Get specific ticket
- `PUT /api/ticket/:id` - Update ticket
- `DELETE /api/ticket/:id` - Delete ticket

### Events
- `POST /api/inngest` - Inngest webhook endpoint

## 🔄 Event-Driven Workflows

The system uses Inngest for reliable background processing:

1. **Ticket Creation Flow**:
   - Ticket created → AI analysis → Skill extraction → Developer matching → Email notifications

2. **User Signup Flow**:
   - User registers → Welcome email → Profile setup notifications

## 🎯 AI Features in Detail

- **Automatic Skill Detection**: When a ticket is created, AI analyzes the description and automatically tags relevant programming languages, frameworks, and technical skills
- **Smart Suggestions**: Provides helpful notes and potential solutions based on ticket content
- **Developer Matching**: Matches tickets with developers who have the required skills in their profile

## 🚧 Frontend Status

**⚠️ Frontend is currently under development**

We have a React.js frontend in progress using:
- **React 18** with **Vite**
- **Modern UI Components**
- **Responsive Design**

### 🤝 Looking for Frontend Developers!

We're actively seeking frontend developers to help complete the user interface! If you're interested in contributing.

**How to contribute:**
1. Fork the repository
2. Check out the `ai-assistant-frontend` folder
3. Create a feature branch
4. Submit a pull request

💬 **Get in touch**: Open an issue or reach out if you'd like to contribute to the frontend development!



**⭐ If you find this project helpful, please give it a star on GitHub!**

**🚀 Ready to revolutionize your ticket management? Get started today!**