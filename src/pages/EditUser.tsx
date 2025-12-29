import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../services/api';
import type { User } from '../types/user';
import UserForm from '../components/UserForm';

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await getUserById(Number(id));
      setUser(data.data);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'User not found');
      setLoading(false);
    }
  };

  const handleSubmit = async (userData: User) => {
    setSubmitting(true);
    setError('');

    try {
      await updateUser(Number(id), userData);
      alert('✅ User updated successfully!');
      navigate('/users');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit User</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              {error}
            </div>
          )}

          {user && (
            <UserForm
              initialData={user}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/users')}
              loading={submitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;