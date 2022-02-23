import React, { useState, useCallback } from 'react';
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
  ProfileModal,
  LogOutButton,
} from '@layouts/Workspace/style';
import gravatar from 'gravatar';
import Menu from '@components/Menu';

const Channel = loadable(() => import('@pages/Channel'));
const DM = loadable(() => import('@pages/DM'));

const Workspace: React.FC = () => {
  const { isLoading, error, data } = useQuery('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));
  const queryClient = useQueryClient();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onClickLogOut = useCallback(() => {
    axios
      .post('http://localhost:4000/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => queryClient.setQueryData('user', () => null));
  }, [queryClient]);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'mp' })} alt={data.nickname}></ProfileImg>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} onCloseMenu={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(data.nickname, { s: '36px', d: 'mp' })} alt={data.nickname}></img>
                  <div>
                    <span id="profile-name">{data.nickname}</span>
                    <span id="profile-activate">Activate</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onClickLogOut}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
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
