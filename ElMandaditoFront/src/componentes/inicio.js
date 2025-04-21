import React, { useState, useEffect } from "react";
import Clock from "react-clock";
import Calendar from "react-calendar";
import "react-clock/dist/Clock.css";
import "react-calendar/dist/Calendar.css";
import ventaImg from "../imagenes/venta .png";
import clientesImg from "../imagenes/clientes.png";
/* import mercaderiaImg from "../imagenes/mercaderia.png";
 */
import "./inicio.css";

const Inicio = ({ mostrar }) => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraActual(new Date());
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
          <img src={ventaImg} alt="Venta" className="icono-boton" />
        </button>
        <button onClick={() => mostrar("clientes")} className="buttonClientes">
          <img src={clientesImg} alt="Clientes" className="icono-boton" />
        </button>
        <button
          onClick={() => mostrar("mercaderia")}
          className="buttonMercaderia"
        >
          <img src={ventaImg} alt="Mercadería" className="icono-boton" />
        </button>
      </div>

      <div className="column derecha">
        <div className="relojGrande">
          <Clock value={horaActual} />
        </div>
        <div className="calendarioGrande">
          <Calendar value={horaActual} />
        </div>
      </div>

      <button className="buttonInformacion" onClick={manejarClickCaja}>
        CAJA
      </button>

      {mostrarModal && (
        <div className="modal-password">
          <div className="modal-contenido">
            <h2>CAJA</h2>
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
