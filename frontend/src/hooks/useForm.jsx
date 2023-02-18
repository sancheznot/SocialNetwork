import React from "react";
import { useState } from "react";

export const useForm = (initialOBJ = {}) => {
  const [form, setForm] = useState(initialOBJ);

  const changed = ({ target }) => {
    // Get information from the input
    const { name, value } = target;
    // Update the state
    setForm({ ...form, [name]: value });
  };
  const clearForm = () => {
    setForm({});
  };

  return {
    form,
    changed,
    clearForm,
  };
};
