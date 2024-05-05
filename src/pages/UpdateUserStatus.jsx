const updateUserStatus = async (userId, isAdmin) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAdmin }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user status');
    }
    setUsers(users.map(user => user.uid === userId ? { ...user, admin: isAdmin } : user));
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

<button onClick={() => updateUserStatus(user.uid, !user.admin)}>
  {user.admin ? 'Revoke Admin' : 'Make Admin'}
</button>