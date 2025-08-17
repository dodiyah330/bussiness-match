# BusinessMatch - Business Marketplace Platform

A modern Bumble-like platform connecting business buyers and sellers with streamlined acquisition workflows.

## Features

- **Bumble-like Interface**: Sellers can swipe through buyer profiles
- **Smart Matching**: AI-powered matching algorithm
- **User Authentication**: JWT-based authentication system
- **Profile Management**: Comprehensive buyer and seller profiles
- **Real-time Updates**: Live status updates for matches
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, PostgreSQL
- **Authentication**: JWT, bcryptjs
- **Database**: PostgreSQL with Neon
- **Styling**: Tailwind CSS v3

## Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- npm or yarn

## Database Setup

1. **Create Database**: Set up a PostgreSQL database (Neon recommended)
2. **Apply Schema**: Run the database schema to create tables:

```bash
psql "YOUR_DATABASE_URL" -f server/schema.sql
```

3. **Seed Data**: Populate the database with test data:

```bash
npm run seed
```

## Environment Configuration

1. **Copy Environment Template**:
```bash
cp env.example .env
```

2. **Update Environment Variables**:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## Getting Started

1. **Install Dependencies**:
```bash
npm install
```

2. **Start Backend Server**:
```bash
npm run dev:server
```

3. **Start Frontend Development Server**:
```bash
npm run dev
```

4. **Access the Application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Test Accounts

After running `npm run seed`, you can use these test accounts:

### Buyers
- **John Smith**: john.smith@example.com / password123
- **Sarah Johnson**: sarah.johnson@example.com / password123
- **Michael Chen**: michael.chen@example.com / password123
- **Emily Davis**: emily.davis@example.com / password123
- **David Wilson**: david.wilson@example.com / password123

### Sellers
- **Robert Brown**: robert.brown@techstartup.com / password123
- **Lisa Garcia**: lisa.garcia@restaurant.com / password123
- **James Miller**: james.miller@manufacturing.com / password123
- **Anna Rodriguez**: anna.rodriguez@consulting.com / password123
- **Thomas Lee**: thomas.lee@retail.com / password123

## Project Structure

```
business-marketplace/
├── src/
│   └── app/
│       ├── buyers/           # Buyer profiles page
│       ├── dashboard/        # Main dashboard
│       ├── login/           # Login page
│       ├── register/        # Registration page
│       └── onboarding/      # Onboarding flows
├── server/
│   ├── index.js            # Express server
│   ├── schema.sql          # Database schema
│   └── seed-data.js        # Test data seeder
├── public/
│   └── images/             # Static images
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profiles
- `POST /api/profile` - Create/update profile
- `GET /api/profile/:id` - Get profile by ID

### Health Check
- `GET /api/health` - Server health status

## User Flow

1. **Registration**: Users register as buyer or seller
2. **Onboarding**: Complete profile setup with preferences
3. **Matching**: Sellers browse and accept/reject buyer profiles
4. **Dashboard**: View matches and manage connections

## Design Features

- **Modern UI**: Clean, professional design with gradients
- **Responsive**: Works on desktop, tablet, and mobile
- **Animations**: Smooth transitions with Framer Motion
- **Profile Images**: Color-coded initials for visual appeal
- **Status Indicators**: Clear accept/reject/pending states

## Testing

The application includes comprehensive test data with realistic business profiles:

- **5 Buyer Profiles**: Different investment ranges and industries
- **5 Seller Profiles**: Various business types and sizes
- **Realistic Data**: Actual business scenarios and preferences

## Development Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:server` - Start backend development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Populate database with test data

## Customization

- **Profile Images**: Add real photos to `/public/images/profiles/`
- **Industries**: Modify industry options in the seed data
- **Investment Ranges**: Adjust ranges in the database schema
- **UI Colors**: Customize Tailwind CSS theme

## Deployment

1. **Build the Application**:
```bash
npm run build
```

2. **Set Production Environment**:
```env
NODE_ENV=production
```

3. **Deploy to Your Platform**:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- Neon (Database)

## License

This project is created for educational and demonstration purposes.

---

**BusinessMatch** - Where Business Matches Happen!
