import React from "react";

const ModalInstructions = () => {
  return (
    <>
      <h3>Instrucciones para editar la sección de libros</h3>
      <p>
        Para crear un <strong>(título)</strong>, asegúrate de que la palabra o frase termine con un <strong>:</strong>
      </p>
      <p>
        Para crear una nueva lista <strong>(elemento de lista)</strong>, realiza un salto de línea presionando <strong>Enter</strong>.
      </p>
      
        <h3>Ejemplo:</h3>
        <p><code>Capítulo 1:</code> (seguido de <strong>Enter</strong> se convertirá en un <strong>título</strong>).</p>
        <p><code>Libro 1 Alma lactancia</code> (seguido de <strong>Enter</strong> creará un nuevo <strong>elemento de lista</strong>).</p>
     
    </>
  );
};

export default ModalInstructions;
