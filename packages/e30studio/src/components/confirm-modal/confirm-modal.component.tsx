import styled from '@emotion/styled'
import React, { useCallback, useEffect } from 'react'
import { ConfirmOptions } from './context/confirm-modal.types'

const ConfirmModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
  backdrop-filter: blur(2px);
`
const ConfirmModalContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`

export type ConfirmModalProps = ConfirmOptions & {
  closeWhenClickOutside?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  closeWhenClickOutside = true,
  okLabelOrComponent = 'Confirm',
  cancelLabelOrComponent = 'Cancel'
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])

  const handleContainerClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  return (
    <ConfirmModalWrapper
      className="confirm-modal-wrapper"
      onClick={closeWhenClickOutside ? onCancel : undefined}
    >
      <ConfirmModalContainer className="confirm-modal-container" onClick={handleContainerClick}>
        <header className="confirm-modal-header">{title}</header>
        <article className="confirm-modal-content">{message}</article>
        <footer className="confirm-modal-actions">
          <button className="confirm-modal-actions-cancel" type="reset" onClick={onCancel}>
            {cancelLabelOrComponent}
          </button>
          <button className="confirm-modal-actions-confirm" type="submit" onClick={onConfirm}>
            {okLabelOrComponent}
          </button>
        </footer>
      </ConfirmModalContainer>
    </ConfirmModalWrapper>
  )
}
