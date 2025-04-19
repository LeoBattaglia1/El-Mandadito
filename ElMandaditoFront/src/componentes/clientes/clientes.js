import React, { useEffect, useState } from "react";
import "./clientes.css";

const Clientes = ({ handleBackInicio, mostrar, handleSelectCliente }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/clientes");

        if (!response.ok) {
          console.error(
            `Error de red: ${response.status} - ${response.statusText}`
          );
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectFila = (clienteID) => {
    setClienteSeleccionado(clienteID);
    setFilaSeleccionada(clienteID);
  };

  const handleEliminarCliente = async () => {
    const cliente = clientes.find((c) => c.ClienteID === clienteSeleccionado);
    if (!cliente) return;

    console.log("Cliente seleccionado:", cliente);

    const confirmarEliminar = window.confirm(
      `¿Estás seguro de que quieres eliminar a ${cliente.Nombre}?`
    );

    if (!confirmarEliminar) return;

    try {
      // 1. Verificamos si el cliente tiene registros en cliente_mercaderia
      const countResponse = await fetch(
        `http://localhost:3000/cliente_mercaderia/count/${cliente.ClienteID}`
      );
      if (!countResponse.ok)
        throw new Error("Error al verificar registros asociados");

      const { count } = await countResponse.json();
      console.log(
        `Registros asociados a ClienteID ${cliente.ClienteID}: ${count}`
      );

      if (count > 0) {
        alert(
          `No se puede eliminar al cliente ${cliente.Nombre} porque aun no ha regularizado su deuda.`
        );
        return;
      }

      // 2. Si no tiene registros, eliminamos el cliente
      const deleteResponse = await fetch(
        `http://localhost:3000/clientes/${cliente.ClienteID}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!deleteResponse.ok) throw new Error("Error al eliminar el cliente");

      alert(`Se eliminó al cliente ${cliente.Nombre} correctamente.`);

      // 3. Actualizamos el estado eliminando al cliente de la lista
      const nuevosClientes = clientes.filter(
        (c) => c.ClienteID !== cliente.ClienteID
      );
      setClientes(nuevosClientes);
      setClienteSeleccionado(null);
      setFilaSeleccionada(null);
    } catch (error) {
      console.error("Error durante la eliminación:", error);
      alert("Ocurrió un error al intentar eliminar el cliente.");
    }
  };

  return (
    <div className="container">
      <button type="button" onClick={handleBackInicio} className="volverInicio">
        Volver
      </button>
      <h2 className="header">Clientes</h2>
      <button onClick={() => mostrar("agregarCliente")} className="add-button">
        Agregar
      </button>
      <button
        onClick={() => mostrar("editarCliente")}
        className="edit-button"
        disabled={!clienteSeleccionado}
      >
        Editar
      </button>
      <button
        className="delete-button"
        disabled={!clienteSeleccionado}
        onClick={handleEliminarCliente}
      >
        Eliminar
      </button>
      <button
        onClick={() => mostrar("cobrarCliente", clienteSeleccionado?.ClienteID)}
        className="charge-button"
        disabled={!clienteSeleccionado}
      >
        Ver/Cobrar
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr
              key={cliente.ClienteID}
              className={`${
                filaSeleccionada === cliente.ClienteID ? "selected" : ""
              } ${index % 2 === 0 ? "even" : ""}`}
              onClick={() => {
                handleSelectFila(cliente.ClienteID);
                handleSelectCliente(cliente);
              }}
            >
              <td>{cliente.Nombre}</td>
              <td>{cliente.Telefono}</td>
              <td>{cliente.Direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clientes;
