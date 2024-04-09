// pages/UserProfile.js

import React, { useState, useEffect } from 'react';
import './UserProfile.scss'; 
import UserDetails from '../components/UserDetails';
import { useAuthenticationContext } from '../hooks/useAuthenticationContext';

const UserProfile = () => {
    const { user, dispatch} = useAuthenticationContext();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user) {
                    const response = await fetch('/api/adminUserRoutes/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });
      
                if (response.ok) {
                  const userData = await response.json(); // Parse response body to JSON
                  setUserData(userData); // Set fetched user data to local state
                } else {
                  console.error('Failed to fetch user data');
                }
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
    
        fetchUserData();
    }, []);
    
    return (
        <div className="user-profile">
            {/* Render UserDetails component with user data if available */}
            {userData ? (
                <UserDetails user={userData} /> // Pass user data as prop to UserDetails component
            ) : (
            <p>Loading user information...</p>
            )}
    </div>
    );
};

export default UserProfile;
