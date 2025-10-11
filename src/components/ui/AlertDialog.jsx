"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/Button"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"

const AlertDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  type = "info", 
  confirmText = "باشه", 
  cancelText = "انصراف", 
  onConfirm, 
  onCancel,
  showCancel = false 
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "error":
        return <XCircle className="h-6 w-6 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />
      default:
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  const getConfirmButtonStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-600 hover:bg-green-700"
      case "error":
        return "bg-red-600 hover:bg-red-700"
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700"
      default:
        return "bg-blue-600 hover:bg-blue-700"
    }
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onOpenChange(false)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-md pt-14">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <DialogTitle className="text-right">{title}</DialogTitle>
          </div>
          {description && (
            <DialogDescription className="text-right">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="flex-row-reverse gap-2">
          <Button
            onClick={handleConfirm}
            className={`${getConfirmButtonStyle()} text-white`}
          >
            {confirmText}
          </Button>
          {showCancel && (
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              {cancelText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Hook for easy usage
export const useAlertDialog = () => {
  const [open, setOpen] = React.useState(false)
  const [config, setConfig] = React.useState({})

  const showAlert = (alertConfig) => {
    setConfig(alertConfig)
    setOpen(true)
  }

  const showSuccess = (title, description, onConfirm) => {
    showAlert({
      title,
      description,
      type: "success",
      onConfirm
    })
  }

  const showError = (title, description, onConfirm) => {
    showAlert({
      title,
      description,
      type: "error",
      onConfirm
    })
  }

  const showWarning = (title, description, onConfirm) => {
    showAlert({
      title,
      description,
      type: "warning",
      onConfirm
    })
  }

  const showConfirm = (title, description, onConfirm, onCancel) => {
    showAlert({
      title,
      description,
      type: "error",
      showCancel: true,
      confirmText: "تأیید",
      cancelText: "انصراف",
      onConfirm,
      onCancel
    })
  }

  const AlertDialogComponent = () => (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
      {...config}
    />
  )

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showConfirm,
    AlertDialogComponent
  }
}

export default AlertDialog
