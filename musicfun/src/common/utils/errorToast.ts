import { toast } from 'sonner'

export const errorToast = (message: string, error?: unknown) => {
  toast.error(message, {
    duration: 5000, // длительность показа (мс)
    position: 'top-right', // позиция
    // richColors: true,      // можно включить цветные иконки (зависит от глобальной настройки Toaster)
  })

  if (error) {
    console.error(`${message}\n`, error)
  }
}
