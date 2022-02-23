import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  const { isLoading, error, data } = useQuery('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  if (data) {
    return (
      <Routes>
        <Route path="/workspace/*" element={<Workspace />} />
        <Route path="*" element={<Navigate to="/workspace/channel" />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
};

export default App;
