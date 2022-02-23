import React, { useCallback } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import fetcher from '@utils/fetcher';

const Workspace: React.FC = ({ children }) => {
  // const { isLoading, error, data } = useQuery('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));
  const queryClient = useQueryClient();

  const onClickLogOut = useCallback(() => {
    axios
      .post('http://localhost:4000/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => queryClient.setQueryData('user', () => null));
  }, [queryClient]);

  return (
    <>
      <button onClick={onClickLogOut}>로그아웃</button>
      {children}
    </>
  );
};

export default Workspace;
