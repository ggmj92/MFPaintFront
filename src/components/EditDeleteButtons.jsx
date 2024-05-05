import React from 'react';
import Button from 'react-bootstrap/Button';

const EditDeleteButtons = ({ id, onEditClick, onDeleteClick, type, isAdmin }) => {
  return (
    <>     
      {isAdmin && type === 'artwork' && (
        <>
          <Button variant="info" onClick={() => onEditClick(id)}>EDIT</Button>
          <Button variant="danger" onClick={() => onDeleteClick(id)}>DELETE</Button>
        </>
      )}
      {isAdmin && type === 'artist' && (
        <>
          <Button variant="info" onClick={() => onEditClick(id)}>EDIT</Button>
          <Button variant="danger" onClick={() => onDeleteClick(id)}>DELETE</Button>
        </>
      )}
      {isAdmin && type === 'blog' && (
        <>
          <Button variant="info" onClick={() => onEditClick(id)}>EDIT</Button>
          <Button variant="danger" onClick={() => onDeleteClick(id)}>DELETE</Button>
        </>
      )}
    </>
  );
};

export default EditDeleteButtons;

