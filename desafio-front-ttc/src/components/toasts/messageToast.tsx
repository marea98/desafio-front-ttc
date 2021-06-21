import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const SuccessToast = (message: string) =>
  Toast.fire({
    icon: 'success',
    title: message,
  });

const FailToast = (message: string) =>
  Toast.fire({
    icon: 'error',
    title: message,
  });

export { SuccessToast, FailToast };
