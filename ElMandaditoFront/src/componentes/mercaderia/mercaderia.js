import React, { useEffect, useState } from "react";
import "./mercaderia.css";
import CambiarPrecio from "./cambiarPrecio/CambiarPrecio";
import AgregarMercaderia from "./agregarMercaderia/AgregarMercaderia";

const Mercaderia = ({ handleBackInicio }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarComponente, setMostrarComponente] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/mercaderia");
        if (!response.ok) throw new Error("Error de red");
        const data = await response.json();
        const productosFiltrados = data.filter(
          (p) => p.Nombre !== "-" && !p.Nombre.startsWith("Resto del pago")
        );
        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSelectFila = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleBuscarProducto = () => {
    if (busqueda.trim() === "") return productos;
    return productos.filter((p) =>
      p.Nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const handleCerrarCambiarPrecio = () => {
    setMostrarComponente(null);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container">
      {mostrarComponente === "CambiarPrecio" && (
        <div className="overlay">
          <CambiarPrecio
            handleBackMercaderia={handleCerrarCambiarPrecio}
            selectedMercaderia={productoSeleccionado}
          />
        </div>
      )}

      {mostrarComponente === "AgregarMercaderia" && (
        <div className="overlay">
          <AgregarMercaderia
            handleBackMercaderia={() => {
              setMostrarComponente(null);
              setRefresh((prev) => !prev);
            }}
          />
        </div>
      )}

      <div
        className={`contenido ${
          mostrarComponente === "AgregarMercaderia" ? "desactivado" : ""
        }`}
      >
        <button onClick={handleBackInicio} className="volverInicio">
          Volver
        </button>
        <h2 className="header">Mercadería</h2>
        <button
          onClick={() => setMostrarComponente("AgregarMercaderia")}
          className="add-button"
        >
          Agregar
        </button>
        <button
          onClick={() => setMostrarComponente("CambiarPrecio")}
          className="edit-button"
          disabled={!productoSeleccionado}
        >
          Editar Producto
        </button>

        <input
          type="text"
          placeholder="Buscar"
          className="input"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="table">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "70%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {handleBuscarProducto()
              .sort((a, b) => a.Nombre.localeCompare(b.Nombre))
              .map((producto, index) => (
                <tr
                  key={producto.codigo}
                  className={`${
                    producto === productoSeleccionado ? "selected" : ""
                  } ${index % 2 === 0 ? "even" : ""}`}
                  onClick={() => handleSelectFila(producto)}
                >
                  <td>{producto.stock ?? 0}</td>
                  <td>{producto.Nombre}</td>
                  <td>$ {producto.Precio}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mercaderia;
