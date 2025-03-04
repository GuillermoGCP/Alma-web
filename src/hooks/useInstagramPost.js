import { useEffect, useRef } from 'react'

const useInstagramPost = (instagramPost, postNumber) => {
    try {
        const containerRef = useRef(null)
        const scriptRef = useRef(null)

        useEffect(() => {
            // Función para limpiar el script de Instagram
            if (!instagramPost || Object.keys(instagramPost).length === 0) {
                return
            }
            const cleanupScript = () => {
                if (scriptRef.current && containerRef.current) {
                    containerRef.current.removeChild(scriptRef.current)
                    scriptRef.current = null
                }
            }
            if (containerRef.current) {
            if (!window.instgrm) {
                const script = document.createElement('script')
                script.src = 'https://www.instagram.com/embed.js'
                script.async = true
                script.onload = () => {
                    window.instgrm.Embeds.process()
                }
                containerRef.current.appendChild(script)
                scriptRef.current = script
            } else {
                window.instgrm.Embeds.process()
            }}

            return () => {
                cleanupScript()
            }
        }, [instagramPost, postNumber])

        return { containerRef, scriptRef, postNumber }
    } catch (error) {
        console.log(error)
    }
}

export default useInstagramPost
