import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const useExperiences = (
  setHomeData,
  setCharactersRemaining,
  MAX_CHARACTERS
) => {
  const experienceFileInputRef = useRef(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [checkedExperiences, setCheckedExperiences] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageName, setImageName] = useState("");
  const [newExperience, setNewExperience] = useState({
    text: "",
    image: null,
  });

  // Obtener todas las experiencias:
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/get-all-experiences`)
      .then((response) => response.json())
      .then((data) => {        
        setHomeData((prevData) => ({
          ...prevData,
          experiences: data.experiences,
        }));
        setCharactersRemaining(MAX_CHARACTERS - newExperience.text.length);
        // toast.success(data.message)
      })
      .catch((error) => {
        toast.error(error.message), console.log("Ha ocurrido un error", error);
      });
  }, []);

  // Eliminar una experiencia.
  const handleExperienceDelete = async (experienceId, image) => {    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/delete-experience/${experienceId}?image=${encodeURIComponent(image)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHomeData((prevData) => ({
          ...prevData,
          experiences: prevData.experiences.filter(
            (exp) => exp.id !== experienceId
          ),
        }));
        toast.success(data.message);
      }
    } catch (error) {
      //Toast
    }

    setSelectedExperience(null);
  };

  // Editar una experiencia:
  const handleExperienceUpdate = async (updatedExperience, prevImage) => {
    try {
        const formData = new FormData();
        formData.append("text", updatedExperience.text);
        
        if (updatedExperience.image && updatedExperience.image instanceof File) {
            formData.append("image", updatedExperience.image);
        } else {
            console.error('La imagen subida no es de tipo archivo')          
        }        

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/update-experience/${updatedExperience.id}?image=${encodeURIComponent(prevImage)}`,
            {
                method: "PATCH",
                body: formData,
            }
        );

        if (response.ok) {
            const updatedData = await response.json();
            console.log("Datos actualizados:", updatedData);
            setHomeData((prevData) => ({
                ...prevData,
                experiences: prevData.experiences.map((exp) =>
                    exp.id === updatedData.data[0]
                        ? {
                            id: updatedData.data[0],
                            text: updatedData.data[1],
                            image: updatedData.data[2],
                        }
                        : exp
                ),
            }));
            toast.success(updatedData.message);
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message || "Error al actualizar la experiencia.");
    }

    setSelectedExperience(null);
  };

  // Enviar las cuatro experiencias seleccionadas para publicar en la web
  const handleSaveSelection = async () => {
    try {
      const dataToSend = { filteredExperiences: checkedExperiences };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/save-filtered-experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const updatedExperience = await response.json();

        setHomeData((prevData) => ({
          ...prevData,
          selectedExperiences: updatedExperience.data.readyExperiencesTosend,
        }));
        toast.success(updatedExperience.message);
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  // Cambios en el formulario:
  const handleExperienceChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewExperience((prev) => ({ ...prev, image: files[0] }));
      setImageName(files[0].name);
    } else {
      setNewExperience((prev) => ({ ...prev, [name]: value }));
      setCharactersRemaining(MAX_CHARACTERS - value.length);
    }
  };

  // Crear experiencia
  const handleAddExperience = async () => {
    try {
      const formData = new FormData();
      formData.append("text", newExperience.text);
      if (newExperience.image) {
        formData.append("image", newExperience.image);
      } else {
        toast.warn("Por favor, seleccione una imagen");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/save-experience`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const newExperienceData = await response.json();
        console.log(newExperienceData);
        setHomeData((prevData) => ({
          ...prevData,
          experiences: [...prevData.experiences, newExperienceData.data],
        }));
        toast.success(newExperienceData.message);

        setNewExperience({ text: "", image: null });
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(`Ha ocurrido un error: ${error}`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExperience(null);
  };
  const handleCheckboxChange = (experienceId) => {
    if (checkedExperiences.includes(experienceId)) {
      setCheckedExperiences(
        checkedExperiences.filter((id) => id !== experienceId)
      );
    } else {
      if (checkedExperiences.length < 4) {
        setCheckedExperiences([...checkedExperiences, experienceId]);
      } else {
        toast.warn("Solo puedes seleccionar hasta 4 experiencias.");
      }
    }
  };
  return {
    handleExperienceDelete,
    selectedExperience,
    experienceFileInputRef,
    newExperience,
    handleExperienceUpdate,
    handleSaveSelection,
    handleAddExperience,
    closeModal,
    modalOpen,
    checkedExperiences,
    setCheckedExperiences,
    setSelectedExperience,
    setModalOpen,
    handleExperienceChange,
    imageName,
    handleCheckboxChange,
  };
};
export default useExperiences;
