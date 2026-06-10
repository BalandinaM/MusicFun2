import { toast } from 'sonner'

export const successToast = (message: string) => {
  toast.success(message, {
    duration: 5000,
    position: 'top-right',
  })
}
