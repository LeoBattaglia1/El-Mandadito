import React, { useState } from "react";
import "./agregarMercaderia.css"; // Importa el archivo de estilos

const AgregarMercaderia = ({ handleBackMercaderia }) => {
  const [mercaderia, setMercaderia] = useState({
    codigo: "",
    Nombre: "",
    Precio: "",
    stock: "", // Mantener vacío al principio
  });

  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validamos que el valor sea un número entero positivo o vacío
    if (name === "stock" && value !== "" && !/^\d+$/.test(value)) {
      return; // No actualizamos si no es un número entero positivo
    }

    setMercaderia({
      ...mercaderia,
      [name]: value, // Si es un valor válido, se actualiza
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const verificar = await fetch("http://localhost:3000/mercaderia");
      const lista = await verificar.json();
      const existe = lista.some(
        (item) => item.codigo.toString() === mercaderia.codigo.toString()
      );

      if (existe) {
        setMensaje("❌ El código ya existe");
        setTipoMensaje("error");
        setTimeout(() => setMensaje(null), 3000);
        return;
      }

      // Asegurarse de enviar stock como 0 si está vacío
      const mercaderiaConStock = {
        ...mercaderia,
        stock:
          mercaderia.stock === undefined ||
          mercaderia.stock === "" ||
          isNaN(mercaderia.stock)
            ? 0
            : parseInt(mercaderia.stock),
      };

      const response = await fetch("http://localhost:3000/mercaderia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mercaderiaConStock),
      });

      if (!response.ok) {
        console.error(
          `Error de red: ${response.status} - ${response.statusText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMercaderia({
        codigo: "",
        Nombre: "",
        Precio: "",
        stock: "", // Para que el input quede vacío
      });

      setMensaje("✅ Producto agregado exitosamente");
      setTipoMensaje("exito");
      setTimeout(() => setMensaje(null), 2000);
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  };

  return (
    <div className="agregar-mercaderia-container2">
      <h2>Agregar Mercadería</h2>

      {mensaje && (
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "15px",
            color: tipoMensaje === "exito" ? "green" : "red",
          }}
        >
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Código:
          <input
            type="text"
            name="codigo"
            value={mercaderia.codigo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={mercaderia.Nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Precio:
          <input
            type="number"
            name="Precio"
            value={mercaderia.Precio}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={mercaderia.stock}
            onChange={handleChange}
            min="0"
            step="1"
            placeholder="0"
          />
        </label>

        <br />

        <div className="button-container">
          <button type="button" onClick={handleBackMercaderia}>
            Volver
          </button>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarMercaderia;
