import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[type]

  return (
    <div className={`${bgColor} text-white p-4 rounded-md shadow-md flex justify-between items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <X size={18} />
      </button>
    </div>
  )
}

export interface ToasterProps {
  message: string
  type: ToastType
}

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToasterProps[]>([])

  const addToast = (toast: ToasterProps) => {
    setToasts((prevToasts) => [...prevToasts, toast])
  }

  const removeToast = (index: number) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(index)}
        />
      ))}
    </div>
  )
}

export const useToaster = () => {
  const [, setToasts] = useState<ToasterProps[]>([])

  const showToast = (message: string, type: ToastType) => {
    setToasts((prevToasts) => [...prevToasts, { message, type }])
  }

  return { showToast }
}

    