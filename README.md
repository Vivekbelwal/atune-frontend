# ATune Frontend

A highly scalable React application with modern architecture.

## Features

- **Modern Stack**: Built with React 19, Redux Toolkit, TypeScript, and Tailwind CSS
- **Scalable Architecture**: Organized with a scalable folder structure and modular components
- **State Management**: Redux Toolkit with RTK Query for efficient state management and API integration
- **Routing**: React Router v7 for declarative routing
- **Type Safety**: TypeScript for type checking and better developer experience
- **Styling**: Tailwind CSS for utility-first styling
- **Code Quality**: ESLint and Prettier for code linting and formatting
- **Authentication**: JWT-based authentication with protected routes
- **Responsive Design**: Mobile-first approach for all screen sizes

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable components
│   ├── common/       # Common components (Button, Input, etc.)
│   └── dashboard/    # Dashboard-specific components
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components
│   ├── auth/         # Authentication pages
│   └── dashboard/    # Dashboard pages
├── routes/           # Routing configuration
├── services/         # API services
├── store/            # Redux store
│   └── slices/       # Redux slices
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main App component
├── index.css         # Global styles
├── main.tsx          # Entry point
└── vite-env.d.ts     # Vite environment types
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/atune-frontend.git
   cd atune-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready app
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=https://api.example.com
```

## Deployment

To deploy the application:

1. Build the production-ready app:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. The build output will be in the `dist` directory, which can be deployed to any static hosting service.

## Best Practices

- **Component Structure**: Follow a consistent component structure with proper separation of concerns
- **State Management**: Use Redux for global state and React hooks for local state
- **API Integration**: Use RTK Query for data fetching and caching
- **Error Handling**: Implement proper error handling for API requests and user interactions
- **Performance**: Optimize performance with memoization, code splitting, and lazy loading
- **Accessibility**: Ensure the application is accessible to all users
- **Testing**: Write tests for critical components and functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.
