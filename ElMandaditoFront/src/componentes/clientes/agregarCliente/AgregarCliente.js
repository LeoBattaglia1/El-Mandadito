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

    // Validar que todos los campos estén completos
    const { Nombre, Telefono, Direccion } = cliente;

    if (!Nombre.trim() || !Telefono.trim() || !Direccion.trim()) {
      setColorMensaje("red");
      setMensaje("Todos los campos son obligatorios.");
      setTimeout(() => setMensaje(null), 2000);
      return;
    }

    try {
      // Verificar si ya existe el cliente
      const responseExistente = await fetch("http://localhost:3000/clientes");
      const dataClientes = await responseExistente.json();

      const clienteExiste = dataClientes.some(
        (c) => c.Nombre.trim().toLowerCase() === Nombre.trim().toLowerCase()
      );

      if (clienteExiste) {
        setColorMensaje("red");
        setMensaje("Ese cliente ya existe.");
        setTimeout(() => setMensaje(null), 2000);
        return;
      }

      // Si no existe, lo agregamos
      const response = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        setColorMensaje("red");
        setMensaje("No se pudo agregar el cliente.");
        setTimeout(() => setMensaje(null), 2000);
        return;
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
      setColorMensaje("red");
      setMensaje("No se pudo conectar con el servidor.");
      setTimeout(() => setMensaje(null), 2000);
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
