import React from 'react';
import Link from 'next/link';
import { styled } from '@linaria/react';

import IconButton from '../../components/icon-button';
import logoImage from '../../assets/brand/logo.png';

export interface IDashboardAppBar {
  title?: string;
}

export default function DashboardAppbar({ title }: IDashboardAppBar) {
  return (
    <Container>
      <Link href="/">
        <LogoImage src={logoImage} />
      </Link>
      {title && <Title>{title}</Title>}
      <Toolbar>
        <IconButton
          style={{
            marginRight: 17,
          }}
        >
          <IconImage src="/assets/icons/mdi_ios_share.svg" />
        </IconButton>
        <IconButton>
          <IconImage src="/assets/icons/mdi_play_arrow.svg" />
        </IconButton>
        <ProfileImage src="/assets/examples/profile.png" />
      </Toolbar>
    </Container>
  );
}

const Container = styled.header`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const LogoImage = styled.img`
  width: 27.68px;
  height: 28px;
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: white;
  letter-spacing: 0.3px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 24px;
  height: 24px;
  user-select: none;
  -webkit-user-drag: none;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 32px;
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
`;
