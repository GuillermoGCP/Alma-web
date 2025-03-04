export default function parseReceivedDate(dateString) {
    const months = {
      Enero: "01",
      Febrero: "02",
      Marzo: "03",
      Abril: "04",
      Mayo: "05",
      Junio: "06",
      Julio: "07",
      Agosto: "08",
      Septiembre: "09",
      Octubre: "10",
      Noviembre: "11",
      Diciembre: "12",
    };
  
    // Extraer la fecha
    const parts = dateString.split(", ");
    const [dayPart, datePart] = parts[1].split(" de ");
    const [day, monthText, year] = datePart.split(" ");
  
    // Convertir al formato del filtro "YYYY-MM-DD"
    const month = months[monthText];
    const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;

    return new Date(formattedDate);
}
  
  
//! Prueba
const receivedString = "Miércoles, 10 de Septiembre de 2025, 12:00";
const datePickerValue = "2025-09-10"; 
