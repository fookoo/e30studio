import { confirmModalContext } from './confirm-modal.context'
import React, { useCallback, useState, useRef, useMemo } from 'react'
import { ConfirmModal } from '../confirm-modal.component'
import { ConfirmOptions } from './confirm-modal.types'

type ConfirmModalProviderProps = {
  confirmModalComponent?: React.ComponentType<ConfirmOptions>
  children: React.ReactNode
}

export const ConfirmModalProvider: React.FC<ConfirmModalProviderProps> = ({
  confirmModalComponent: ModalComponent = ConfirmModal,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({
    title: '',
    message: ''
  })

  const promiseRef = useRef<{
    resolve: () => void
    reject: () => void
  } | null>(null)

  const confirm = useCallback((opts: ConfirmOptions) => {
    promiseRef.current?.reject()

    setOptions(opts)
    setIsOpen(true)

    return new Promise<void>((resolve, reject) => {
      promiseRef.current = { resolve, reject }
    })
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    promiseRef.current = null
  }, [])

  const handleConfirm = useCallback(() => {
    promiseRef.current?.resolve()
    close()
  }, [close])

  const handleCancel = useCallback(() => {
    promiseRef.current?.reject()
    close()
  }, [close])

  const value = useMemo(() => ({ confirm }), [confirm])

  return (
    <confirmModalContext.Provider value={value}>
      {children}
      {isOpen && <ModalComponent {...options} onConfirm={handleConfirm} onCancel={handleCancel} />}
    </confirmModalContext.Provider>
  )
}
