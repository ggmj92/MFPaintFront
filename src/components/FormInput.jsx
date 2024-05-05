import React from 'react';
import Form from 'react-bootstrap/Form';

function FormInput({ controlId, label, type, value, onChange, placeholder, name }) {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </Form.Group>
  );
}

export default FormInput;
