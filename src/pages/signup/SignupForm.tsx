import React from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        // Display error message below the input fields
        console.error('Register failed');
        return;
      }

      const _data = await response.json();

      // After successful registration, save the token and user data in localStorage
      localStorage.setItem('authToken', _data.auth_token);
      localStorage.setItem('userData', JSON.stringify(_data.user));

      navigate('/');
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            type="text"
            name="name"
            id="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {errors.name && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            {...register('email', { required: true })}
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {errors.email && <span className="text-red-500">This field is required</span>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            {...register('password', { required: true })}
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
          />
          {errors.password && <span className="text-red-500">This field is required</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Register
        </button>

        <div className="mt-4 text-center">
          <Link to="/">Back to Home</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
