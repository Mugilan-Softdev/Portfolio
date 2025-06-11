import React from 'react'

const underDevelopment = () => {
   const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white text-black p-6 rounded-md shadow-lg max-w-sm w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              <FiX />
            </button>
            <div className="flex items-center space-x-2">
              <FiAlertCircle className="text-red-500 text-2xl" />
              <h2 className="text-xl font-bold"> Under Development</h2>
            </div>
            <p className="mt-4 flex items-center space-x-2">
              <span>
                i am currently working that why the portfolio its not complet
              </span>
            </p>
          </div>
        </div>
  )
}

export default underDevelopment;