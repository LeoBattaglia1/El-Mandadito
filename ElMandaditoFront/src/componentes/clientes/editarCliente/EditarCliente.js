import React, { useState, useEffect } from "react";
import "./editarCliente.css";

const EditarCliente = ({ handleBack, selectedCliente }) => {
  const [cliente, setCliente] = useState({
    Nombre: "",
    Telefono: "",
    Direccion: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [colorMensaje, setColorMensaje] = useState("green");

  useEffect(() => {
    setCliente({
      Nombre: selectedCliente.Nombre || "",
      Telefono: selectedCliente.Telefono || "",
      Direccion: selectedCliente.Direccion || "",
    });
  }, [selectedCliente]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar si el nuevo nombre ya existe en otro cliente
      const responseClientes = await fetch("http://localhost:3000/clientes");
      const dataClientes = await responseClientes.json();

      const nombreRepetido = dataClientes.some(
        (c) =>
          c.ClienteID !== selectedCliente.ClienteID &&
          c.Nombre.trim().toLowerCase() === cliente.Nombre.trim().toLowerCase()
      );

      if (nombreRepetido) {
        setColorMensaje("red");
        setMensaje("Ese cliente ya existe.");
        setTimeout(() => setMensaje(null), 2000);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/clientes/${selectedCliente.ClienteID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cliente),
        }
      );

      if (!response.ok) {
        console.error(
          `Error de red: ${response.status} - ${response.statusText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setColorMensaje("green");
      setMensaje("Cliente actualizado correctamente.");
      setTimeout(() => {
        setMensaje(null);
        handleBack();
      }, 2000);
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  };

  return (
    <div className="editar-cliente-container2">
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre y Apellido:
          <input
            type="text"
            name="Nombre"
            value={cliente.Nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Teléfono:
          <input
            type="text"
            name="Telefono"
            value={cliente.Telefono}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Dirección:
          <input
            type="text"
            name="Direccion"
            value={cliente.Direccion}
            onChange={handleChange}
          />
        </label>

        {mensaje && (
          <div
            style={{
              color: colorMensaje,
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            {mensaje}
          </div>
        )}

        <br />
        <div className="button-container">
          <button type="button" onClick={handleBack}>
            Volver
          </button>
          <button type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditarCliente;
