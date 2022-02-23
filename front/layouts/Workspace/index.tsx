import React, { useCallback } from 'react';
import axios from 'axios';
import loadable from '@loadable/component';
import { useQuery, useQueryClient } from 'react-query';
import { Routes, Route, Navigate } from 'react-router-dom';
import fetcher from '@utils/fetcher';
import {
  Header,
  RightMenu,
  ProfileImg,
  WorkspaceWrapper,
  Workspaces,
  Channels,
  Chats,
  WorkspaceName,
  MenuScroll,
} from '@layouts/Workspace/style';
import gravatar from 'gravatar';

const Channel = loadable(() => import('@pages/Channel'));
const DM = loadable(() => import('@pages/DM'));

const Workspace: React.FC = () => {
  const { isLoading, error, data } = useQuery('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));
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
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'mp' })} alt={data.nickname}></ProfileImg>
          </span>
        </RightMenu>
      </Header>
      <button onClick={onClickLogOut}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path="/channel" element={<Channel />} />
            <Route path="/dm" element={<DM />} />
            <Route path="/*" element={<Navigate to="/channel" />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
    </>
  );
};

export default Workspace;
