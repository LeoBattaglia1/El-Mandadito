import React, { useState, useEffect } from "react";
import "./inicio.css";

const Inicio = ({ mostrar }) => {
  const [fechaHoraActual, setFechaHoraActual] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const obtenerFechaHoraActual = () => {
      const ahora = new Date();
      const opciones = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return ahora.toLocaleDateString(undefined, opciones);
    };

    const intervalo = setInterval(() => {
      setFechaHoraActual(obtenerFechaHoraActual());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const manejarClickCaja = () => {
    setMostrarModal(true);
    setInputPassword("");
    setErrorPassword("");
  };

  const verificarPassword = () => {
    if (inputPassword === "123") {
      setMostrarModal(false);
      mostrar("calendarioCaja");
    } else {
      setErrorPassword("Contraseña incorrecta");
    }
  };

  return (
    <div className="column">
      <button onClick={() => mostrar("venta")} className="buttonVenta">
        Venta
      </button>
      <button onClick={() => mostrar("clientes")} className="buttonClientes">
        Clientes
      </button>
      <button
        onClick={() => mostrar("mercaderia")}
        className="buttonMercaderia"
      >
        Mercadería
      </button>
      <div className="informacion-container">
        <p>{fechaHoraActual}</p>

        <button className="buttonInformacion" onClick={manejarClickCaja}>
          CAJA
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-password">
          <div className="modal-contenido">
            <h3>Acceso restringido</h3>
            <input
              type="password"
              placeholder="Ingrese la contraseña"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            {errorPassword && <p className="error">{errorPassword}</p>}
            <div style={{ marginTop: "10px" }}>
              <button onClick={verificarPassword}>Aceptar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
