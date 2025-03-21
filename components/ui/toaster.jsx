'use client';

import { useToast } from '@/hooks/use-toast';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast
            key={id}
            variant={variant}
            className={`relative flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300
              ${variant === 'success'
                ? 'bg-green-600 border-green-500 text-white'
                : variant === 'destructive'
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-gray-900 border-gray-700 text-gray-100'}
              border-l-4
              ${variant === 'success' ? 'border-l-green-400' : variant === 'destructive' ? 'border-l-red-400' : 'border-l-gray-500'}`}
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
