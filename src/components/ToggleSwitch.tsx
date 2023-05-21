import React from "react";
import styled from "@emotion/styled";

interface Props {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

export const ToggleSwitch: React.FC<Props> = ({ toggled = false, setToggled }) => {
  return (
    <>
      <ToggleContainer onClick={ () => setToggled(!toggled) }>
        <div className={`toggle-container ${toggled ? "toggle--checked" : null}`}/>
        <div className={`toggle-circle ${toggled ? "toggle--checked" : null}`}/>
      </ToggleContainer>
    </>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  justify-content: flex-end;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);}
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0,200,102);
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s
  }
`;