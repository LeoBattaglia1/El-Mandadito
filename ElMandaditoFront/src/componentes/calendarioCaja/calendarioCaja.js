import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendarioCaja.css";

const CalendarioCaja = ({ handleBackInicio }) => {
  const [datosCaja, setDatosCaja] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  useEffect(() => {
    const obtenerDatosCaja = async () => {
      try {
        const response = await fetch("http://localhost:3000/caja");
        if (response.ok) {
          const datos = await response.json();
          setDatosCaja(datos);
        } else {
          console.error(
            `Error al obtener los datos de caja. Código: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error en la petición:", error.message);
      }
    };

    obtenerDatosCaja();
  }, []);

  const localizer = momentLocalizer(moment);

  const eventosCaja = datosCaja.flatMap((caja) => {
    const fecha = moment(caja.fecha).toDate();
    const eventos = [];

    const total = (caja.efectivo || 0) + (caja.cuenta_dni || 0);
    if (total > 0) {
      eventos.push({
        title: `💰 $${total}`,
        start: fecha,
        end: fecha,
        tipo: "normal",
      });
    }

    if (caja.fiado > 0) {
      eventos.push({
        title: `📕 $${caja.fiado}`,
        start: fecha,
        end: fecha,
        tipo: "fiado",
      });
    }

    return eventos;
  });

  const eventPropGetter = (event) => {
    let backgroundColor = "#4caf50"; // verde por defecto
    if (event.tipo === "fiado") backgroundColor = "#f44336"; // rojo

    return {
      style: {
        backgroundColor,
        color: "white",
        fontSize: "14px",
        textAlign: "center",
        borderRadius: "4px",
      },
    };
  };

  // Filtrar por la fecha seleccionada (ignorar hora)
  const fechaFormateada = moment(fechaSeleccionada).format("YYYY-MM-DD");
  const datosFiltrados = datosCaja.filter(
    (caja) => moment(caja.fecha).format("YYYY-MM-DD") === fechaFormateada
  );

  return (
    <div className="calendario-caja-container">
      <button
        type="button"
        onClick={handleBackInicio}
        className="volverInicio"
        style={{ marginBottom: "20px" }}
      >
        Volver
      </button>

      <h2>Resumen de Caja</h2>
      <table className="tabla-caja">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Efectivo</th>
            <th>Cuenta DNI</th>
            <th>Total</th>
            <th>Fiado</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.map((caja, index) => {
            const total = (caja.efectivo || 0) + (caja.cuenta_dni || 0);
            return (
              <tr key={index}>
                <td>{moment(caja.fecha).format("YYYY-MM-DD")}</td>
                <td>${caja.efectivo || 0}</td>
                <td>${caja.cuenta_dni || 0}</td>
                <td>
                  <strong>${total}</strong>
                </td>
                <td>${caja.fiado || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 style={{ marginTop: "40px" }}>Vista Calendario</h2>
      <BigCalendar
        localizer={localizer}
        events={eventosCaja}
        defaultDate={fechaSeleccionada}
        views={["month", "week"]}
        defaultView="month"
        selectable={true}
        onSelectSlot={(slotInfo) => setFechaSeleccionada(slotInfo.start)}
        onSelectEvent={(event) => setFechaSeleccionada(event.start)}
        eventPropGetter={eventPropGetter}
        style={{ height: "500px", marginTop: "20px" }}
      />
    </div>
  );
};

export default CalendarioCaja;
