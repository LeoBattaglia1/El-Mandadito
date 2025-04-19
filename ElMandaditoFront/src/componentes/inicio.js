import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import "./inicio.css";

const Inicio = ({ mostrar }) => {
  const [horaActual, setHoraActual] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const obtenerHora = () => {
      const ahora = new Date();
      return ahora.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const intervalo = setInterval(() => {
      setHoraActual(obtenerHora());
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
    <div className="inicio-container">
      <div className="column izquierda">
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
      </div>

      <div className="column derecha">
        <div className="calendarioGrande">
          <FaCalendarAlt size={36} style={{ marginRight: "10px" }} />
          <span className="textoCalendario">
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="relojGrande">
          <FaClock size={36} style={{ marginRight: "10px" }} />
          <span className="textoReloj">{horaActual}</span>
        </div>
      </div>

      <button className="buttonInformacion" onClick={manejarClickCaja}>
        CAJA
      </button>

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
