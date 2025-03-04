import { toast } from "react-toastify";

// function promiseToast (promise, messages)  {
//     toast.promise(
//         promise(),
//         {
//             pending: 'Obteniendo datos de Colaboradores...',
//             success: 'Datos obtenidos',
//             error: 'Error de conexión'
//         }
//     )
// }

export const isSuccessToast = (success, message, toastId) => {

    const defaultMsg = success 
    ? "Acción realizada correctamente"
    : "Error en la acción"

    toast.update(toastId, {
        render: message || defaultMsg,
        type: success ? 'success' : 'error',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
    });
}

export default toast;