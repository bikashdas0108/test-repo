import { useState } from "react";
import Stepper from "./stepper";

import "./multiStepForm.css";

const STEPS = ["Personal Info", "Contact Details", "Confirmation"];

const renderForm = ({ currentStep, formData, errors, onFormDataChange }) => {
  switch (currentStep) {
    case 0:
      return (
        <div className="form-step">
          <h2>Personal Info</h2>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => onFormDataChange("firstName", e.target.value)}
          />
          {errors.firstName && (
            <span className="error">{errors.firstName}</span>
          )}
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => onFormDataChange("lastName", e.target.value)}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      );
    case 1:
      return (
        <div className="form-step">
          <h2>Contact Details</h2>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => onFormDataChange("email", e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => onFormDataChange("phone", e.target.value)}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
      );
    case 2:
      return (
        <div className="form-step">
          <h2>Confirmation</h2>
          <p>Please review your information before submitting.</p>
          <ul>
            <li>First Name: {formData.firstName}</li>
            <li>Last Name: {formData.lastName}</li>
            <li>Email: {formData.email}</li>
            <li>Phone: {formData.phone}</li>
          </ul>
        </div>
      );
    default:
      return null;
  }
};

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleFormDataChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
  };

  const validate = (data, step) => {
    const newErrors = {};
    switch (step) {
      case 0:
        if (firstName.trim() === "")
          newErrors.firstName = "First name is required";
        if (lastName.trim() === "")
          newErrors.lastName = "Last name is required";
        break;
      case 1:
        if (email.trim() === "") newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email))
          newErrors.email = "Email is invalid";
        if (phone.trim() === "") newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(phone))
          newErrors.phone = "Phone number is invalid";
        break;
      default:
        break;
    }
  };

  const handleNextClick = () => {
    if (!validate(formData, currentStep)) return;
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="form">
      <h1>Multi Step Form</h1>
      <Stepper steps={STEPS} activeIndex={currentStep} />
      {renderForm({
        currentStep,
        formData,
        errors,
        onFormDataChange: handleFormDataChange,
      })}
      <div className="footer">
        {currentStep > 0 && (
          <button onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
        )}
        {currentStep < STEPS.length - 1 ? (
          <button onClick={handleNextClick}>Next</button>
        ) : (
          <button onClick={() => alert("Form submitted!")}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;

// define steps
// define UI

// components
//  - Form container
//    - Stepper
//    - Form renderer
//    - Footer
//     - Next
//     - Back
//  - input forms
//    - input fields

// state management
//  - current step
//  - form data
//  - errors

// functions
//  - validation functions
//  - API calls
//  - navigation functions
