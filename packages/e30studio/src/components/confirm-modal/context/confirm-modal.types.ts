import React from 'react'

export type ConfirmOptions = {
  title: React.ReactNode
  message: React.ReactNode
  okLabelOrComponent?: React.ReactNode
  cancelLabelOrComponent?: React.ReactNode
}

export type ConfirmModalContext = {
  confirm: (options: ConfirmOptions) => Promise<void>
}
