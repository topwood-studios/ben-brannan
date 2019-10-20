import React from "react";
import styled from "styled-components";
import { colors } from "../utils/theme";

export default props => (
  <ProgressBar {...props}>
    <Progress />
  </ProgressBar>
);

const ProgressBar = styled.div`
  width: 100%;
`;

const Progress = styled.span`
  background: ${colors.grey};
  color: ${colors.black};
  padding: 5px;
  width: 0;
  animation: loader 8s ease infinite;
  position: absolute;

  @keyframes loader {
    0% {
      width: 0;
    }

    20% {
      width: 10%;
    }

    25% {
      width: 24%;
    }

    43% {
      width: 41%;
    }

    56% {
      width: 50%;
    }

    66% {
      width: 52%;
    }

    71% {
      width: 60%;
    }

    75% {
      width: 76%;
    }

    94% {
      width: 86%;
    }

    100% {
      width: 100%;
    }
  }
`;
