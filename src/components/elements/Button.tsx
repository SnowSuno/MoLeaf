import React, { type PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { IconComponent } from "../../assets/icons/utils";

interface Props extends PropsWithChildren {
  icon?: IconComponent;
  text: string;
  full?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ icon: Icon, text, onClick }) => {
  return (
    <div onClick={onClick}>
      <Container>
        {Icon ? <Icon size={20} /> : <></>}
        {text}
      </Container>
    </div>
  );
};

const Container = styled.div<{ full?: boolean }>`
  width: ${(props) => (props.full ? "100%" : "auto")};
  color: var(--dark-text);
  background-color: var(--light-gray);
  border-radius: 12px;
  padding: 16px 16px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;

  &:active {
    background-color: var(--gray);
  }
`;
