import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CaptchaComponent = ({
    handleSubmit,
    buttonClassName,
    captchaInputClassName,
    validateForm
}) => {
    const [captchaSvg, setCaptchaSvg] = useState('')
    const [captchaInput, setCaptchaInput] = useState('')

    const validateCaptcha = import.meta.env.VITE_API_URL + '/validate-captcha'
    const generateCaptcha = import.meta.env.VITE_API_URL + '/generate-captcha'

    

    const fetchCaptcha = async () => {
        try {
            const response = await fetch(generateCaptcha, {
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.text()
            setCaptchaSvg(data)
        } catch (error) {
            console.error('Error fetching CAPTCHA:', error)
            toast.error("Error en la validación captcha")
        }
    }

    useEffect(() => {
        fetchCaptcha()
    }, [])

    const handleCaptchaInput = (e) => {
        setCaptchaInput(e.target.value)
    }

    const handleCaptchaValidation = async () => {
        try {
            // Check for required fields before starting CAPTCHA validation
            if (validateForm){
                if (!validateForm()) {
                    toast.error("Por favor, completa todos los campos requeridos.");
                    return;  // Stop further execution if form validation fails
                };
            }
    
            toast.loading('Validando formulario...');
            const response = await fetch(validateCaptcha, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    captcha: captchaInput,
                }),
                credentials: 'include',
            });
    
            if (!response.ok) {
                toast.dismiss();
                console.log('CAPTCHA INVÁLIDO');
                throw new Error('Network response was not ok');
                
            }
    
            const data = await response.json();
    
            if (data.success) {
                toast.dismiss();
                toast.loading('Enviando, no cierre la página...')
                handleSubmit();
                setCaptchaInput('');
            } else {
                toast.dismiss();
                toast.error('Captcha incorrecto. Inténtalo de nuevo');
                setCaptchaInput('');
                fetchCaptcha();
            }
        } catch (error) {
            toast.dismiss();
    
            // Revisa si el error se debe a la falta de campos
            if (error.message.includes('Missing required fields')) {
                toast.error('Por favor, completa todos los campos requeridos.');
            } else {
                // Mensaje de error general
                toast.error('Error en el código captcha. Inténtalo de nuevo.');
            }
    
            console.log('Ha ocurrido un error', error);
            setCaptchaInput('');
            fetchCaptcha();
        }
    };

    return (
        <div className='captcha-main'>
            <div
                className='captcha-img'
                dangerouslySetInnerHTML={{ __html: captchaSvg }}
            />
            <input
                type='text'
                value={captchaInput}
                onChange={handleCaptchaInput}
                placeholder='Introduce el CAPTCHA'
                className={captchaInputClassName}
            />
            <button
                className={buttonClassName}
                onClick={(e) => {
                    e.preventDefault()
                    handleCaptchaValidation()
                }}
            >
                Enviar
            </button>
        </div>
    )
}

export default CaptchaComponent
