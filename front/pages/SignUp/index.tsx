import React, { useState, useCallback } from 'react';
import { Form, Label, Input, LinkContainer, Button, Header, Error } from './style';
import useInput from '@hooks/useInput';

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const onChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = event;

      switch (name) {
        case 'password':
          setPassword(value);
          setMismatchError(value !== passwordCheck);
          break;
        case 'password-check':
          setPasswordCheck(value);
          setMismatchError(value !== password);
          break;
        default:
          throw Error;
      }
    },
    [password, passwordCheck],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      console.log(email, nickname, password, passwordCheck);

      if (mismatchError) return;
      console.log('회원가입완료');
    },
    [email, nickname, password, passwordCheck],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check">
          <span>닉네임</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePassword}
            />
          </div>
        </Label>
        {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
};

export default SignUp;
