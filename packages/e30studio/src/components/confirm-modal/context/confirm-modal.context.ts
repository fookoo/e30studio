import React from 'react'
import { ConfirmModalContext } from './confirm-modal.types'

export const confirmModalContext = React.createContext<ConfirmModalContext>({
  confirm: () => Promise.resolve()
})

export const useConfirm = () => React.useContext(confirmModalContext)
