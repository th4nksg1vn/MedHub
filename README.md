# MediHub - Healthcare Management System

A modern healthcare management platform built with Next.js 16, Prisma, and JWT authentication. Manage medical organizations, staff, patients, and their records with a secure, scalable architecture.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT (Access & Refresh Tokens)
- **Styling:** TailwindCSS v4
- **Runtime:** Node.js 20+

## ✨ Features

- 🔐 **JWT Authentication** - Secure token-based auth with refresh tokens
- 🏥 **Multi-Organization Support** - Users can belong to multiple medical facilities
- 👥 **Role-Based Access Control** - Different roles (Doctor, Nurse, Admin, etc.)
- 📋 **Patient Management** - Complete medical records and demographics
- 📄 **Document Management** - Store and track patient documents
- 📊 **Audit Logging** - Comprehensive activity tracking
- 🔄 **Session Management** - Track and manage user sessions
- 🏢 **Organization Types** - Hospitals, Clinics, Pharmacies, Labs, etc.

## 📋 Prerequisites

- Node.js 20 or higher
- PostgreSQL 14 or higher
- npm, yarn, pnpm, or bun

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MedHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/medihub?schema=public"
   
   # JWT Secrets (use strong random strings in production)
   JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters-long"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   
   # Optional: Supabase (if migrating from existing setup)
   SUPABASE_URL=""
   SUPABASE_SERVICE_ROLE_KEY=""
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Create database migration
   npm run db:migrate
   
   # Or push schema directly (development only)
   npm run db:push
   ```

5. **Start the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Create and run database migrations |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:test` | Test Prisma connection |

## 🗄️ Database Schema

### Core Models

- **User** - Authentication and user profiles
- **Organization** - Medical facilities
- **UserOrganization** - User-organization relationships with roles
- **Patient** - Patient records and demographics
- **PatientDocument** - Medical documents and files
- **Service** - Services offered by organizations
- **AuditLog** - Activity audit trail

### Authentication Models

- **RefreshToken** - JWT refresh tokens
- **Session** - Active user sessions
- **PasswordReset** - Password reset tokens

### User Roles

- `SUPER_ADMIN` - System administrator
- `ADMIN` - Organization administrator
- `DOCTOR` - Medical doctor
- `NURSE` - Nurse
- `RECEPTIONIST` - Front desk
- `PHARMACIST` - Pharmacy staff
- `LAB_TECH` - Laboratory technician
- `PATIENT` - Patient

### Organization Types

- `HOSPITAL` - Hospital facility
- `CLINIC` - Clinical practice
- `PHARMACY` - Pharmacy
- `LABORATORY` - Laboratory
- `DIAGNOSTIC_CENTER` - Diagnostic center

For detailed schema documentation, see [prisma/README.md](./prisma/README.md)

## 🔐 Authentication Architecture

### JWT Flow

1. **Login** - User authenticates with email/password
2. **Access Token** - Short-lived JWT (15 minutes)
3. **Refresh Token** - Long-lived token stored in database (7 days)
4. **Token Refresh** - Use refresh token to get new access token
5. **Session Tracking** - Active sessions tracked per device

### API Headers (Current Implementation)

```javascript
// Development only - will be replaced with JWT
headers: {
  'x-external-user-id': 'user-id',
  'x-org-id': 'organization-id'
}
```

**⚠️ Important:** The current API uses header-based auth for development. This will be replaced with proper JWT tokens in production.

## 📁 Project Structure

```
MedHub/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── orgs/            # Organization endpoints
│   │   ├── patients/        # Patient endpoints
│   │   └── staff/           # Staff endpoints
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── lib/                     # Utility libraries
│   ├── prisma.ts           # Prisma client instance
│   ├── supabaseClient.ts   # Supabase client (legacy)
│   └── audit.ts            # Audit logging
├── prisma/                  # Prisma configuration
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── scripts/                 # Utility scripts
│   └── test-prisma.ts      # Prisma connection test
└── public/                  # Static assets
```

## 🚧 Current Status

### ✅ Completed
- Prisma schema design
- Database models (Users, Organizations, Patients, etc.)
- JWT authentication models
- Multi-organization support
- Role-based access control structure

### 🚧 In Progress
- JWT authentication implementation
- Migrating API routes from Supabase to Prisma
- API route updates

### 📝 TODO
- Implement JWT middleware
- Create authentication API routes
- Build user registration/login
- Add password reset functionality
- Create frontend components
- Add comprehensive error handling
- Implement rate limiting
- Add API documentation

## 🛡️ Security Considerations

- [ ] Replace header-based auth with JWT middleware
- [ ] Implement rate limiting on API routes
- [ ] Add input validation (Zod)
- [ ] Implement CSRF protection
- [ ] Add password strength requirements
- [ ] Enable HTTPS in production
- [ ] Implement API key rotation strategy
- [ ] Add security headers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and proprietary.

## 📧 Support

For issues and questions, please open an issue on the repository.

---

Built with ❤️ for the healthcare industry
