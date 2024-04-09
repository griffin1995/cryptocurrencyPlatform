// pages/UserProfile.js

import React, { useState, useEffect } from 'react';
import './UserProfile.scss'; 
import UserDetails from '../components/UserDetails';
import { useAdminContext } from '../hooks/useAdminContext';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';

const UserProfile = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate fetching user data (replace with actual fetch logic)
        const fetchUserData = async () => {
        // Example user data (replace with actual user data retrieval)
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            updatedAt: '2024-04-10T12:30:00Z', // Example timestamp (should be ISO string)
            _id: '123456789', // Example user ID
            token: 'your-auth-token-here', // Example user token
        };
        setUser(userData);
        };

        fetchUserData();
    }, []);

    return (
        <div className="user-profile">
          <div className="user-details">
            {user ? (
              <>
                <h4>{user.firstName} {user.lastName}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              </>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
    );
};

export default UserProfile;
