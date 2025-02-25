# Cryptocurrency Trading Platform

A full-stack cryptocurrency trading platform built using the MERN stack (MongoDB, Express.js, React, Node.js) that integrates with cryptocurrency APIs to provide real-time market data and trading capabilities.

## Overview

This project demonstrates a complete cryptocurrency trading system featuring user authentication, an admin dashboard, real-time market data, and wallet management. The platform allows users to track cryptocurrency prices, manage their portfolios, and simulate trading operations.

## Features

- **User Authentication**: Secure login and signup functionality with role-based access
- **Real-Time Market Data**: Integration with cryptocurrency APIs for current prices and historical data
- **Wallet Management**: Track holdings and transaction history
- **Admin Controls**: Administrative interface for platform management
- **Interactive Charts**: Visual representation of cryptocurrency price history
- **Responsive Design**: Mobile-friendly interface built with React and SCSS

## Technology Stack

### Frontend
- React.js for UI components
- Context API for state management
- Custom hooks for data fetching and business logic
- SCSS for styling
- Chart components for data visualization

### Backend
- Node.js & Express.js
- MongoDB for database
- JWT for authentication
- RESTful API architecture
- Controller-based structure

## Installation and Setup

1. Make two separate terminals

2. In the first terminal, navigate to the server directory:
   ```
   cd server
   ```

3. Start the backend server:
   ```
   node server.js
   ```

4. In the second terminal, navigate to the client directory:
   ```
   cd client
   ```

5. Install dependencies (if you haven't already):
   ```
   npm install
   ```

6. Start the React application:
   ```
   npm start
   ```

7. Navigate to `http://localhost:3000` in your browser to view the application

## Project Structure

```
.
├── client                          # React frontend
│   ├── public                      # Static files
│   └── src
│       ├── components              # Reusable UI components
│       │   ├── AddNewCoin.js       # Component for adding new cryptocurrencies
│       │   ├── AdminControls.js    # Admin panel components
│       │   ├── CoinDetails.js      # Detailed view of a specific coin
│       │   ├── GetCoinChart.js     # Chart visualization for coin prices
│       │   ├── GetCoinHistory.js   # Historical data components
│       │   ├── GetCoin.js          # Individual coin display
│       │   ├── GetCoins.js         # List of available coins
│       │   ├── NavigationBar.js    # Site navigation
│       │   ├── SignUpUser.js       # User registration
│       │   ├── UserDetails.js      # User profile display
│       │   └── Wallet.js           # Wallet management component
│       ├── context                 # React Context providers
│       │   ├── AdminContext.js     # Admin state management
│       │   └── AuthenticationContext.js # Auth state management
│       ├── hooks                   # Custom React hooks
│       │   ├── useAddNewCoin.js    # Hook for adding cryptocurrencies
│       │   ├── useAdminContext.js  # Hook for admin operations
│       │   ├── useAllCoins.js      # Hook for fetching all coins
│       │   ├── useAuthenticationContext.js # Auth hook
│       │   ├── useCoinHistory.js   # Historical data hook
│       │   ├── useCoin.js          # Single coin data hook
│       │   ├── useLogin.js         # Login functionality
│       │   ├── useLogout.js        # Logout functionality
│       │   └── useSignUp.js        # Registration hook
│       ├── media                   # Images and assets
│       └── pages                   # Page components
│           ├── Account.js          # User account page
│           ├── AdminControls.js    # Admin dashboard
│           ├── Home.js             # Landing page
│           ├── Login.js            # Login page
│           ├── Markets.js          # Cryptocurrency market overview
│           ├── SignUp.js           # Registration page
│           ├── Support.js          # Support/help page
│           └── WalletPage.js       # User wallet page
│
└── server                          # Express backend
    ├── controllers                 # Route controllers
    │   ├── adminController.js      # Admin functionality
    │   ├── coinController.js       # Cryptocurrency operations
    │   ├── userController.js       # User management
    │   └── walletController.js     # Wallet operations
    ├── middleware                  # Custom middleware
    │   └── requireAuth.js          # Authentication middleware
    ├── models                      # MongoDB models
    │   ├── coinModel.js            # Cryptocurrency schema
    │   ├── userModel.js            # User schema
    │   └── walletModel.js          # Wallet schema
    ├── routes                      # API routes
    │   ├── admin.js                # Admin routes
    │   ├── coin.js                 # Cryptocurrency routes
    │   ├── user.js                 # User routes
    │   └── wallet.js               # Wallet routes
    └── server.js                   # Main server file
```

## Key Implementation Details

### Authentication System
- JWT-based authentication for secure user sessions
- User registration and login functionality
- Admin and regular user role distinction

### Cryptocurrency Market Data
- Real-time coin price fetching
- Historical price data visualization with charts
- Support for multiple cryptocurrencies

### Wallet System
- User wallet creation and management
- Transaction history tracking
- Balance display and updates

### Admin Features
- Platform management capabilities
- Adding new cryptocurrencies to the system
- User management functions

## Learning Outcomes

This project demonstrates:
- Full-stack development with the MERN stack
- Implementation of secure authentication flows
- State management using React Context API
- Custom hook creation for reusable logic
- Working with real-time financial data
- Creating an intuitive UI for financial operations
- Building a scalable and modular application architecture
