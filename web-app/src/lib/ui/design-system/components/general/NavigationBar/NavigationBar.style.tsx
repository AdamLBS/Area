import styled from 'styled-components';

export const NavBarContainer = styled.div`
  display: flex;
  padding: 20px 20px 10px 20px;
  flex-direction: column;
  gap: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

export const DarkContainer = styled.div`
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 7px;
  background: #7c3aed;
`;
