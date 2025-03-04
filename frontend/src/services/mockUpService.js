export function createMockupData(activities){
    // ! ========   Mockup para testeo   =============================================
    // console.log(fetchedActivities);
    activities[4] = {
        access: "member",
        start: "Jueves, 30 de Noviembre de 2024, 12:00"
      }
  
      activities[5]= {
        access: "member",
        location: "Novo Mesoiro 76, A Coruña",
        start: "Miércoles, 10 de Septiembre de 2025, 12:00"
      }
      activities[7].access = "member"
      activities[10] = {
        location: "Novo Mesoiro 76, A Coruña",
        start:"Lunes, 10 de Marzo de 2024, 13:00"
      }
      //! ======================================================
    
    return activities;
}