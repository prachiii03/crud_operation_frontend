import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/api';
import type { User } from '../types/user';
import UserForm from '../components/UserForm';

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (userData: User) => {
    setLoading(true);
    setError('');

    try {
      await createUser(userData);
      alert('✅ User created successfully!');
      navigate('/users');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => navigate('/users')}
          className="text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2"
        >
          <span>←</span> Back to Users
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New User</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          <UserForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/users')}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUser;