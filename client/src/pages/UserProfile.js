import React, { useState, useEffect } from 'react';
import UserDetails from '../components/UserDetails';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
        const userData = {
            firstName: 'Jack',
            lastName: 'Griffin',
            email: 'JG@gmail.com',
            phoneNumber: '7777 777 777',
            updatedAt: '2024-04-10T12:30:00Z',
            _id: '111111',
            token: 'your-auth-token-here'
        };
        setUser(userData);
        };

        fetchUserData();
    }, []);

    const handleDelete = async () => {
        if (!userAuth || !user) {
          return;
        }
    
        const response = await fetch(`/api/adminRoutes/${user._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` },
        });
    
        if (response.ok) {
          const deletedUser = await response.json();
          dispatch({ type: 'DELETE_USER', payload: deletedUser });
          // Optionally update state or show a success message
          alert('User deleted successfully!');
        } else {
          // Handle error response
          alert('Failed to delete user.');
        }
      };

    return (
        <div>
        <h1>User Profile</h1>
        {user ? (
            <UserDetails user={user} onDelete={handleDelete} />
        ) : (
            <p>Loading...</p>
        )}
            
        </div>
    );
};

export default UserProfile;
