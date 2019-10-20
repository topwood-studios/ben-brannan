import React from "react";
import styled from "styled-components";
import { colors } from "../utils/theme";

export default ({ complete = 0, ...rest }) => (
  <ProgressBar {...rest}>
    <Progress complete={complete} />
  </ProgressBar>
);

const ProgressBar = styled.div`
  width: 100%;
`;

const Progress = styled.span`
  background: ${colors.grey};
  color: ${colors.black};
  padding: 5px;
  width: ${({ complete }) => complete}%;
  transition: width 0.5s ease;
  position: absolute;
`;
