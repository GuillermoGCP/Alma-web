import useInstagramPost from '../hooks/useInstagramPost'

const InstagramPost = ({ instagramPost, postNumber }) => {
    const { containerRef } = useInstagramPost(instagramPost, postNumber)
    return (
        <div ref={containerRef}>
            {instagramPost[Number(postNumber) - 1].code ? (

                <div className='instagram-post'

                    dangerouslySetInnerHTML={{
                        __html: instagramPost[Number(postNumber) - 1].code,
                    }}
                />

            ): <p className="no-post-message">
            No hay ninguna publicación. Por favor, agrega una con su código de inserción.
        </p>}

        </div>
    )
}

export default InstagramPost
