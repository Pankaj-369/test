import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-lg mx-auto">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-block px-6 py-3 border border-teal-600 dark:border-teal-500 text-teal-600 dark:text-teal-400 font-medium rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;