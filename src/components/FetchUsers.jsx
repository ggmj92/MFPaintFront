import React, { useEffect, useState } from 'react';

const FetchUsers = ({ setUsers }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch('http://localhost:3000/users');
                const usersData = await result.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users: ', error);
            }
        };
        fetchData();
    }, []);

    return null;
};

export default FetchUsers;
