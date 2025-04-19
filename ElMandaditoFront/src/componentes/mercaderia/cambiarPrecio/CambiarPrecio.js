import React, { useState, useEffect } from "react";
import "./cambiarPrecio.css"; // Asegúrate de tener el archivo de estilos correspondiente

const CambiarPrecio = ({ handleBackMercaderia, selectedMercaderia }) => {
  const [producto, setProducto] = useState({
    codigo: "",
    Nombre: "",
    Precio: 0,
  });

  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    // Se ejecuta cuando cambia el producto seleccionado
    setProducto({
      codigo: selectedMercaderia.codigo || "",
      Nombre: selectedMercaderia.Nombre || "",
      Precio: selectedMercaderia.Precio || 0,
    });
  }, [selectedMercaderia]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/mercaderia/${selectedMercaderia.codigo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Nombre: producto.Nombre,
            Precio: producto.Precio,
          }),
        }
      );

      if (!response.ok) {
        console.error(
          `Error de red: ${response.status} - ${response.statusText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Mostrar mensaje y volver atrás después de 2 segundos
      setAlerta("¡Producto actualizado correctamente!");

      setTimeout(() => {
        setAlerta(null);
        handleBackMercaderia();
      }, 2000);
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  };

  return (
    <div className="cambiar-precio-container">
      <h2>Cambiar {selectedMercaderia.Nombre} </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={producto.Nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Precio nuevo:
          <input
            type="number"
            name="Precio"
            value={producto.Precio}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        {/* Alerta visual debajo de los inputs */}
        {alerta && (
          <div style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>
            {alerta}
          </div>
        )}

        <div className="button-container">
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleBackMercaderia}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default CambiarPrecio;
