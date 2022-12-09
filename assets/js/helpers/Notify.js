import Swal from "sweetalert2"

export const showSuccess = (message) =>
    Swal.fire({
        icon: 'success',
        text: message,
    })


export const showError = (message) =>
    Swal.fire({
        icon: 'error',
        text: message,
    })

export const showConfirm = (message) =>
    Swal.fire({
        icon: 'warning',
        text: message,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
    })