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
  WorkspaceButton,
  AddButton,
} from '@layouts/Workspace/style';
import gravatar from 'gravatar';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/style';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Channel = loadable(() => import('@pages/Channel'));
const DM = loadable(() => import('@pages/DM'));

const Workspace: React.FC = () => {
  const {
    isLoading,
    error,
    data: userData,
  } = useQuery<IUser>('user', () => fetcher({ url: 'http://localhost:4000/api/users' }));
  const queryClient = useQueryClient();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkSpace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewWUrl] = useInput('');

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

  const toggleModal = useCallback(() => setShowWorkspaceModal((prev) => !prev), []);

  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace.trim() || !newUrl.trim()) return;

      axios
        .post(
          'http://localhost:4000/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          toast.success('워크스페이스 생성!', { autoClose: 3000, position: toast.POSITION.BOTTOM_CENTER });
          setShowWorkspaceModal(false);
          setNewWorkSpace('');
          setNewWUrl('');
        })
        .catch((error) => {
          toast.error(error.response?.data, { position: 'bottom-center' });
        });
    },
    [newWorkspace, newUrl],
  );

  if (isLoading) return <div>Loading...</div>;
  if (!userData) return <div>error</div>;

  return (
    <>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userData.nickname, { s: '28px', d: 'mp' })}
              alt={userData.nickname}
            ></ProfileImg>
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} onCloseMenu={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, { s: '36px', d: 'mp' })} alt={userData.nickname}></img>
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
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
        <Workspaces>
          {userData.Workspaces.map((ws: any) => (
            <Link key={ws.id} to={'/workspace/${}/channel/일반'}>
              <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          ))}
          <AddButton onClick={toggleModal}>+</AddButton>
        </Workspaces>
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
      <Modal show={showCreateWorkspaceModal} toggleModal={toggleModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>워크스페이스 url</span>
            <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
    </>
  );
};

export default Workspace;
