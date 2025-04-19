import React, { useState } from "react";
import "./agregarCliente.css";

const AgregarCliente = ({ handleBack }) => {
  const [cliente, setCliente] = useState({
    Nombre: "",
    Telefono: "",
    Direccion: "",
  });

  const [mensaje, setMensaje] = useState(null);
  const [colorMensaje, setColorMensaje] = useState("green");

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Verificar si ya existe un cliente con el mismo nombre
      const responseExistente = await fetch("http://localhost:3000/clientes");
      const dataClientes = await responseExistente.json();

      const clienteExiste = dataClientes.some(
        (c) =>
          c.Nombre.trim().toLowerCase() === cliente.Nombre.trim().toLowerCase()
      );

      if (clienteExiste) {
        setColorMensaje("red");
        setMensaje("Ese cliente ya existe.");
        setTimeout(() => setMensaje(null), 2000);
        return;
      }

      // Si no existe, agregar el cliente
      const response = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        console.error(
          `Error de red: ${response.status} - ${response.statusText}`
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setColorMensaje("green");
      setMensaje("Cliente ingresado correctamente.");
      setCliente({
        Nombre: "",
        Telefono: "",
        Direccion: "",
      });

      setTimeout(() => {
        setMensaje(null);
        handleBack();
      }, 2000);
    } catch (error) {
      console.error("Error durante la solicitud:", error);
    }
  };

  return (
    <div className="agregar-cliente-container2">
      <h2>Agregar Cliente</h2>

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

        <div className="button-container">
          <button type="button" onClick={handleBack}>
            Volver
          </button>
          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarCliente;
