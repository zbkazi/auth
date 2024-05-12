import React, { useState, useEffect } from "react";

function ErrorToast({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 30000); // Change the duration as per your requirement, here it's set to 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <div
            className="flex items-center p-4 text-gray-500 bg-white rounded-lg shadow"
            role="alert"
          >
            <div className="flex items-center justify-center w-8 h-8 mr-2 text-red-500 bg-red-100 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="text-sm font-normal">{message}</div>
            <button
              onClick={() => setVisible(false)}
              className="ml-auto text-gray-400 hover:text-gray-900"
              aria-label="Close"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorToast;
