import { useEffect, useState } from 'react'

const useApp = () => {
  const instagramPostList = Array.from({ length: 6 }, () => {
    return {}
  }) //Número de publicaciones de Instagram

  const formList = Array.from({ length: 4 }, () => {
    return {}
  }) //Número de formularios que se pueden publicar.

  const [instagramPost, setInstagramPost] = useState(instagramPostList)
  const [publishedForm, setPublishedForm] = useState(formList)
  const [activities, setActivities] = useState([])
  const [checkedExperiences, setCheckedExperiences] = useState([])
  const [homeData, setHomeData] = useState({
    sectionText: '',
    imageHome: '',
    titleHome: '',
    experiences: [],
    selectedExperiences: [],
  })

  useEffect(() => {
    const fetchPublishedForms = async () => {
      try {
        fetch(import.meta.env.VITE_API_URL + '/get-all-published-forms')
          .then((response) => response.json())
          .then((data) => {
            setPublishedForm(data.forms)
          })
          .catch((error) => {
            console.error('Error al obtener los formularios publicados:', error)
          })
      } catch (error) {
        console.error('Ha ocurrido un error:', error)
      }
    }
    fetchPublishedForms()
  }, [])

  useEffect(() => {
    const fetchInstagramPost = async () => {
      const url = `${import.meta.env.VITE_API_URL}/get-all-instagram-posts`

      try {
        const response = await fetch(url)

        if (response.ok) {
          const res = await response.json()
          setInstagramPost(res.posts)
        } else {
          const errorData = await response.json()
          const errorMessage = errorData.error || response.statusText
          throw new Error(errorMessage)
        }
      } catch (error) {
        console.error('Ha ocurrido un error:', error)
      }
    }
    fetchInstagramPost()
  }, [])

  return {
    instagramPostList,
    formList,
    instagramPost,
    setInstagramPost,
    publishedForm,
    setPublishedForm,
    activities,
    setActivities,
    checkedExperiences,
    setCheckedExperiences,
    homeData,
    setHomeData,
  }
}
export default useApp
