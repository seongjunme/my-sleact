import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Header, Input, Form, Label, Button, LinkContainer, Error } from '@pages/SignUp/style';
import { Link } from 'react-router-dom';
import useInput from '@hooks/useInput';

const Login = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      axios.post(
        'http://localhost:4000/api/users/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      ),
    {
      onMutate: () => {
        setLoginError('');
      },
      onError: (err: Error) => {
        setLoginError(err.message);
      },
      onSuccess: () => {
        queryClient.refetchQueries('user');
      },
    },
  );

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loginError, setLoginError] = useState('');

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      mutation.mutate({ email, password });
    },
    [email, password, mutation],
  );

  return (
    <div>
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일 주소</span>
          <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
        </Label>
        <Label>
          <span>비밀번호</span>
          <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
        </Label>
        {loginError && <Error>{loginError}</Error>}
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요? &nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default Login;
