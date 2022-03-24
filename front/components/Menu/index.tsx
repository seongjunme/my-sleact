import React, { CSSProperties } from 'react';
import { CloseModalButton, Container, CreateMenu } from './style';

interface Props {
  style: CSSProperties;
  onCloseMenu: (e: React.MouseEvent<HTMLElement>) => void;
}

const Menu: React.FC<Props> = ({ children, style, onCloseMenu }) => {
  return (
    <>
      <CreateMenu onClick={onCloseMenu} />
      <Container
        style={style}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseModalButton onClick={onCloseMenu}>&times;</CloseModalButton>
        {children}
      </Container>
    </>
  );
};

export default Menu;
