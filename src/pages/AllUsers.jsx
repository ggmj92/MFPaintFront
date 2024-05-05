import { useEffect, useState } from 'react';
import { getAuth, deleteUser as deleteAuthUser } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';

const AllUsers = ({ authUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const firestore = getFirestore();
      const usersSnapshot = await getDocs(collection(firestore, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));
      usersData.forEach(user => {
      });
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: true
      });
      fetchUsers();
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  const revokeAdmin = async (userId) => {
    try {
      const firestore = getFirestore();
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: false
      });
      fetchUsers();
    } catch (error) {
      console.error('Error revoking admin status:', error);
    }
  };

  const deleteUser = async (userId, email) => {
    try {
      // Delete user from Firebase Authentication
      const auth = getAuth();
      await deleteAuthUser(auth, email);

      // Delete user from MongoDB
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Delete user document from Firestore
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', userId);
        await deleteDoc(userRef);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1>User List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.isAdmin? 'Admin' : 'Regular User'}</td>
                  <td>
                    {user.isAdmin && (
                      <>
                        <Button variant="primary" onClick={() => makeAdmin(user.id)}>Make Admin</Button>
                        <Button variant="danger" onClick={() => revokeAdmin(user.id)}>Revoke Admin</Button>
                        <Button variant="danger" onClick={() => deleteUser(user.id, user.email)}>Delete User</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AllUsers;











