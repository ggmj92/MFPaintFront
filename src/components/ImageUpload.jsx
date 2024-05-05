import React from 'react';
import Form from 'react-bootstrap/Form';

function ImageUpload({ controlId, label, onChange }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        onChange={onChange}
      />
    </Form.Group>
  );
}

export default ImageUpload;
