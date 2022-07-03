import styled from '@emotion/styled'
import { Alert, Stack } from '@mui/material'
import { SlideFromRight } from '../../styled'

export const NotificationsStyled = styled(Stack)`
  position: fixed;
  z-index: 1000;

  top: 10px;
  right: 10px;
`

export const AlertStyled = styled(Alert)`
  position: relative;
  min-width: 260px;

  ${SlideFromRight};
`

export const GroupCountStyled = styled.div`
  position: absolute;

  left: -7px;
  top: -7px;

  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  aspect-ratio: 1 / 1;
  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(196, 33, 33, 1) 0%,
    rgb(204 49 49) 50%,
    rgba(196, 33, 33, 1) 100%
  );
  color: #fff;
  box-shadow: 0 1px 7px 2px rgb(78 60 62 / 50%);
`
