import { useState } from 'react'
import { toast } from "react-toastify";
import { isSuccessToast } from '../utils/toast.js';

const useInstagramForm = (setInstagramPost) => {
    try {
        const [blockquote, setBlockquote] = useState('')
        const [postNumber, setPostNumber] = useState('')

        const handlePostNumberChange = (e) => {
            setPostNumber(e.target.value)
        }
        const handleDeletePost = async (e) => {
            e.preventDefault()
            //Ver si hay un post publicado en esta ranura:
            let isPublish
            const postUrl = `${
                import.meta.env.VITE_API_URL
            }/check-instagram-post/${postNumber}`

            const toastId = toast.loading('Comprobando si hay una publicación...')

            try {
                const response = await fetch(postUrl, {
                    method: 'GET',
                })

                if (response.ok) {
                    const res = await response.json()
                    isPublish = res.isPublished
                    console.log(res.message, isPublish)
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
                toast.update(toastId, { 
                    render: `Error al comprobar la publicación: ${error.message}`, 
                    type: 'error', 
                    isLoading: false, 
                    autoClose: 3000 
                });
            }
            if (!isPublish) {
                isSuccessToast(false, 'No hay publicaciones en esa ranura', toastId)
                return
            }

            //Continuar con la lógica de borrar:
            const confirm = window.confirm(
                `Estás a punto de borrar la publicación ${postNumber}, ¿quieres continuar?`
            )
            if (!confirm) {
                toast.dismiss(toastId);
                return;
            }
            const url = `${
                import.meta.env.VITE_API_URL
            }/unpublish-instagram-post/${postNumber}`

            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                })

                if (response.ok) {
                    const res = await response.json()
                    console.log(res.message)
                    setInstagramPost((prevData) => {
                        const newData = [...prevData]
                        newData[Number(postNumber) - 1] = {}
                        return newData
                    })
                    isSuccessToast(true, 'Publicación borrada correctamente', toastId) 
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                console.error('Ha ocurrido un error:', error)
                isSuccessToast(false, `Ha ocurrido un error: ${error.message}`, toastId)
            }
        }
        const handleSubmit = async (e) => {
            e.preventDefault()

            const url = `${
                import.meta.env.VITE_API_URL
            }/save-instagram-post/${postNumber}`

            const toastId = toast.loading('Guardando publicación...')

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ code: blockquote }),
                })

                if (response.ok) {
                    const res = await response.json()
                    console.log(res.message)
                    isSuccessToast(true, 'Publicación guardada correctamente', toastId)
                } else {
                    const errorData = await response.json()
                    const errorMessage = errorData.error || response.statusText
                    throw new Error(errorMessage)
                }
            } catch (error) {
                isSuccessToast(false, `Ha ocurrido un error: ${error.message}`, toastId)
            }

            setInstagramPost((prevData) => {
                const newData = [...prevData]
                newData[Number(postNumber) - 1] = { code: blockquote }
                return newData
            })

            setBlockquote('')
        }
        return {
            blockquote,
            setBlockquote,
            postNumber,
            setPostNumber,
            handlePostNumberChange,
            handleSubmit,
            handleDeletePost,
        }
    } catch (error) {}
}
export default useInstagramForm
