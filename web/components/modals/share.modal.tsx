import React from 'react';
import { styled } from '@linaria/react';

import Modal, { IModal } from './atom.modal';

interface IShareModal extends IModal {}

const ShareModal: React.FC<IShareModal> = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Header>
          <Title>Share</Title>
          <Icon src="/assets/icons/mdi_close_round.svg" />
        </Header>
        <InviteWrapper>
          <InviteInput placeholder="Invitation Member Email" />
          <InviteButton>
            <span>+ Invite</span>
          </InviteButton>
        </InviteWrapper>
      </Container>
    </Modal>
  );
};

export default ShareModal;

const Container = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding-bottom: 24px;
  width: 600px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #eeeeee;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  line-height: 1.15;
  color: #000000;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const InviteWrapper = styled.div`
  padding: 24px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InviteInput = styled.input`
  background: #fafafa;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 12px;
  margin-right: 16px;
  flex: 1;

  &::placeholder {
    color: #9f9f9f;
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;

const InviteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #151617;
  border-radius: 6px;
  padding: 12px;
  border: 0;
  cursor: pointer;

  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
`;
