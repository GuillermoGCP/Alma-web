import "./ActivityFilter.css";
import { useState, useEffect } from 'react'
import { SelectInput } from "./SelectInput";
import DateFilter from "./DateFilter";
// import parseReceivedDate from "../../services/parseRecievedDate";
import { compareISO } from "../../services/api";
import { SearchInput } from "./SearchInput";

function ActivityFilter({ activities, setFilteredActivites }) {

  // Variables de React de los filtros (en useState)
  const [typeEvent, setTypeEvent] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");

  // Tipos de entrada según membresía
  const categoryEvents = [

    { label: "Entrada libre", value: "free" },
    { label: "Exclusivo Socios", value: "member" }
  ];

  //? Control en desarrollo =============================================

  useEffect(() => {
    let msg = 'Filtro actual: '
    if(typeEvent) msg = msg + "" + typeEvent + ","
    if(locationFilter) msg = msg + "" + locationFilter + ","
    if(eventDateStart) msg = msg + "" + eventDateStart + ","
    if(eventDateEnd) msg = msg + "" + eventDateEnd + ","
    // console.log(msg);
  
  },[typeEvent, eventDateStart, eventDateEnd])

  // ? ==================================================================

  useEffect(() => {
    let updatedActivities = activities
    // updatedActivities es una variable a la que se le aplican los filtros que se escogan
    // Una vez aplicados los filtros, se devuelve el array de actividades filtrado
    

    // * FILTRADO POR TIPO DE ACCESO

    if (typeEvent) {
      updatedActivities =  updatedActivities.filter(activity => activity.access === typeEvent) 
    } 

    // * FILTRADO POR LOCALIZACIÓN DEL EVENTO
    if (locationFilter) {
      updatedActivities = updatedActivities.filter(activity => {
        // Comprueba si un lugar existe e incluye los caracteres 
        return activity.location && activity.location.toLowerCase().includes(locationFilter.toLowerCase());
      });
    }

    //* LÓGICA DE COMPARACIÓN DE FECHAS
    if (eventDateStart) {
      updatedActivities = updatedActivities.filter(activity => {

        // Adecuar fechas al formato ISO
        const fromDate =`${eventDateStart}T00:00:00`;
        const eventStart = activity.start.dateTime;
        
        return compareISO(fromDate, eventStart) <= 0;
      }
      )
    }
    if (eventDateEnd) {
      updatedActivities = updatedActivities.filter(activity => {

        // Adecuar fechas al formato ISO
        const limitDate = `${eventDateEnd}T00:00:00`;
        const eventEnd= activity.end.dateTime;
        
        return compareISO(limitDate, eventEnd) > 0;
      }
      )
    }
    
    // console.log(updatedActivities);
    setFilteredActivites(updatedActivities);

  }, [typeEvent, locationFilter, eventDateStart, eventDateEnd, activities, setFilteredActivites]);

  //? ===================================================================

  return (
    <div className="filter-container">
      <SelectInput 
       className={"filter filter-type"}
       setStatus={setTypeEvent}
       text={"Tipo"}
       defaultLabel={"Todos los tipos"}
       eventType={"typeEvent"}
       options={categoryEvents}
       onChange={(e) => setTypeEvent(e.target.value)}
      />
      <SearchInput 
      className={"filter filter-type"}
      setStatus={setLocationFilter}
      text={"Localidad"}
      defaultLabel={"Todas las localidades"}
      eventType={"locationFilter"}
      onChange={(e) => setLocationFilter(e.target.value)} 
      />
      <DateFilter
        label="Desde" 
        date={eventDateStart} 
        setDate={setEventDateStart} 
      />
      <DateFilter
         label="Hasta" 
         date={eventDateEnd} 
         setDate={setEventDateEnd} 
       />
      
    </div>
  );
}

export default ActivityFilter;
