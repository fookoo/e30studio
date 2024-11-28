import { css } from '@emotion/react'

export const SlideFromRight = css`
  @keyframes slideFromRight {
    0% {
      transform: translateX(130%);
    }
    100% {
      transform: translateX(0);
    }
  }

  transform: translateX(130%);

  animation-name: slideFromRight;
  animation-duration: 350ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

export const SlideFromLeft = css`
  @keyframes slideFromLeft {
    0% {
      transform: translateX(-130%);
    }
    100% {
      transform: translateX(0);
    }
  }

  transform: translateX(-130%);

  animation-name: slideFromLeft;
  animation-duration: 350ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`
