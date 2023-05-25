import { useState } from "react";

const FormContainer = () => {
  const [isFormOpen, setFormOpen] = useState(false);

  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  return (
    <>
      {/* Render the form overlay */}
      {isFormOpen && (
        <div className="form-overlay">{/* Form components and steps */}</div>
      )}
    </>
  );
};

export default FormContainer;
