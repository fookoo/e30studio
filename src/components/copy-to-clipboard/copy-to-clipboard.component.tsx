import React, { useCallback } from 'react'

interface Props {
  value: string
  icon?: React.ReactNode
  onCopied?: () => void
}

export const CopyToClipboard: React.FC<Props> = ({ value, icon, onCopied }) => {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(value).then(onCopied)
  }, [value, onCopied])

  return (
    <span className="container" onClick={handleCopy}>
      <span className="value">{value}</span>
      {icon && <span className="icon">{icon}</span>}
    </span>
  )
}
