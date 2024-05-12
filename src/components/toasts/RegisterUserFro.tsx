'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

import SuccessToast from "./SuccessToast";
import ErrorToast from "./ErrorToast";

type FormErrors = {
  message?: string;
};

const RegisterUserFrom = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setErrors({ message: "All fields are required" });
      return;
    }

    try {
      // Perform POST request using Next.js fetch
      const response = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful
        router.push("/login");
        return;
      } else {
        const data = await response.json();
        throw new Error(data.message); // Throw error with message received from server
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrors({ message: "Internal server error" });
    }
  };

    const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = () => {
    setSuccessMessage("Action was successful!");
    setErrorMessage(""); // Reset error message
  };

  const handleError = () => {
    setErrorMessage("An error occurred!");
    setSuccessMessage(""); // Reset success message
  };
    
    
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
      <h2 className="text-xl text-center font-semibold mb-4">
        Register Our Platform
      </h2>

         <button onClick={handleSuccess}>Show Success Toast</button>
      <button onClick={handleError}>Show Error Toast</button>

      {successMessage && <SuccessToast message={successMessage} />}
      {errorMessage && <ErrorToast message={errorMessage} />}
    </div>
 
  );
};

export default RegisterUserFrom;
