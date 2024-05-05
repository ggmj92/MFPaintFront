import React, { useState } from 'react';
import FetchUsers from '../components/FetchUsers';
import Button from 'react-bootstrap/Button';

function MakeAdminButton() {
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleMakeAdminClick = (user) => {
    setSelectedUserId(user._id);
    setShowModal(true);
  };

  const handleConfirmClick = async () => {
    try {
      const response = await fetch(`/updateuser/${selectedUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user in MongoDB');
      }

      const updatedUser = await response.json();
      setUsers(updatedUser);
      setSuccessMessage(`User ${updatedUser.username} has been made an admin.`);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to make user an admin.');
    }
  };

  if (user.length === 0) {
    return <Button variant="info" onClick={handleMakeAdminClick}>Make Admin</Button>
  }

  return (
    <>
    <FetchUsers setUsers={setUsers}>
      <button disabled={!selectedUserId} onClick={() => handleMakeAdminClick(selectedUserId)}>Make Admin</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to make this user an admin?</p>
            <button onClick={handleConfirmClick}>Confirm</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      </FetchUsers>
    </>
  );
}

export default MakeAdminButton;