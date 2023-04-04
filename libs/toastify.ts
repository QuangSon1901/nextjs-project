import { toast } from 'react-toastify';

export function toastUpdate(id: any, message: string, type: 'success' | 'info' | 'warning' | 'error' | 'default') {
    toast.update(id, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
        closeOnClick: true,
        draggable: true,
    });
}
