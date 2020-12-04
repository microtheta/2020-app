import * as React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotificationContainer() {
    return <ToastContainer />
}

export function notify(message = '', options = {}) {
    toast(message, options);
}