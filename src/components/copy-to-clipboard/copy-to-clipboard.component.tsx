import React, { useCallback, useEffect, useRef, useState } from 'react'
import { stopPropagation } from '../../helpers'

interface Props {
  value: string
  title?: string
  /**
   * Time in milliseconds to show the copied state.
   */
  copiedTime?: number
  icon?: React.ReactNode
  onCopied?: () => void
}

export const CopyToClipboard: React.FC<Props> = ({
  value,
  title = 'Click to copy',
  icon,
  copiedTime = 1000,
  onCopied,
  ...props
}) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    setCopied(true)
    void navigator.clipboard.writeText(value).then(onCopied)
  }, [value, onCopied])

  useEffect(() => {
    if (copied) {
      timerRef.current = setTimeout(() => setCopied(false), copiedTime)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [copied, copiedTime])

  return (
    <span
      className={`container ${copied ? 'copied' : ''}`}
      title={title}
      onClick={stopPropagation(handleCopy)}
      {...props}
    >
      <span className="value">{value}</span>
      {icon && <span className="icon">{icon}</span>}
    </span>
  )
}
