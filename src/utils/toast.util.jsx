import React from 'react';
import { toast } from 'react-hot-toast';

const ToastContent = ({ t, message }) => (
    <span className='d-flex gap-8'>
        {message}
        <div>
            <div
                onClick={() => toast.dismiss(t.id)}
                className="toasty-wrap close-button"
                type="button"
            >
                <i className='ph ph-x'></i>
            </div>
        </div>
    </span>
);

const toasty = {
    success: (message, options = {}) => {
        return toast.success(
            (t) => <ToastContent t={t} message={message} />,
            {
                ...options,
                position: 'bottom-right',
                className: 'toasty-wrap success-toasty',
            }
        );
    },
    error: (message, options = {}) => {
        return toast.error(
            (t) => <ToastContent t={t} message={message} />,
            {
                ...options,
                position: 'bottom-right',
                className: 'toasty-wrap error-toasty',
            }
        );
    },
    info: (message, options = {}) => {
        return toast(
            (t) => <ToastContent t={t} message={message} />,
            {
                ...options,
                position: 'bottom-right',
                className: 'toasty-wrap info-toasty',
                icon: '',
            }
        );
    },
    warning: (message, options = {}) => {
        return toast(
            (t) => <ToastContent t={t} message={message} />,
            {
                ...options,
                position: 'bottom-right',
                className: 'toasty-wrap warning-toasty',
                icon: '',
            }
        );
    },
    loading: (message, options = {}) => {
        return toast.loading(
            (t) => <ToastContent t={t} message={message} />,
            {
                ...options,
                position: 'bottom-right',
                className: 'toasty-wrap loading-toasty',
                // icon: '',
            }
        );
    },
    dismiss: (toastId) => {
        toast.dismiss(toastId); // Correct usage
    },
};

export default toasty;
