import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import fetcher from '@utils/fetcher';

const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  const { isLoading, error, data } = useQuery('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));

  if (isLoading) return null;
  if (error) return null;

  if (data) {
    return (
      <Routes>
        <Route path="/" element={<div>로그인 상태</div>} />
        <Route path="*" element={<div>잘못된 접근</div>} />
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
