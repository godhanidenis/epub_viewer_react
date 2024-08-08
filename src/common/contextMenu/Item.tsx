import React from "react";
import styled from "styled-components";
// lib
import * as styles from "../../utils/styles/styles";
import palette from "../../utils/styles/palette";

const Item = ({ text, onClick }: Props) => {
  return <Container onClick={onClick}>{text}</Container>;
};

const Container = styled.button`
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
  transition: 0.1s ${styles.transition};
  background-color: rgba(0, 0, 0, 0);
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  border: none;
  &:focus,
  &:hover {
    color: #fff;
    background-color: ${palette.red3};
  }
`;

interface Props {
  text: string;
  onClick: (e?: any) => void;
}

export default Item;
