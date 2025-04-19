import React, { useState, useEffect } from "react";
import axios from "axios";
import { obtenerFechaActual, procesarCaja } from "../../funciones";
import "./cobrarCliente.css";

const CobrarCliente = ({ handleBack, selectedCliente }) => {
  const [metodoPago, setMetodoPago] = useState("");
  const [valorIngresado, setValorIngresado] = useState("");
  const [datosMercaderia, setDatosMercaderia] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const calcularTotal = () => {
    return datosMercaderia.reduce(
      (total, mercaderia) => total + parseFloat(mercaderia.precio),
      0
    );
  };

  const handleCobrar = async (valor) => {
    if (!metodoPago) {
      alert("Debe seleccionar un método de pago.");
      return;
    }

    if (valor <= 0) {
      alert("El valor debe ser mayor que 0.");
      return;
    }

    if (valor === calcularTotal()) {
      //  Cobro total
      const confirmar = window.confirm(
        `¿Desea cobrar el total de $${valor} en ${metodoPago.toUpperCase()}?`
      );
      if (!confirmar) return;

      try {
        const clienteID = selectedCliente.ClienteID;

        // Eliminar todos los registros del cliente
        await axios.delete(
          `http://localhost:3000/cliente_mercaderia/eliminar/${clienteID}`
        );

        alert(`Se cobraron $${valor} en ${metodoPago.toUpperCase()}`);
        setDatosMercaderia([]);
        setValorIngresado("");
      } catch (error) {
        console.error("Error al procesar el cobro total:", error);
        alert("Hubo un error al procesar el cobro.");
      }

      return;
    }

    // 💰 Cobro parcial
    const disponibles = datosMercaderia.filter((m) =>
      productosSeleccionados.includes(m)
    );

    let acumulado = 0;
    const seleccionParaCobrar = [];
    const idsClienteMercaderiaSeleccionados = [];
    const clienteID = selectedCliente.ClienteID;
    const usadosPorCodigo = {}; // Para llevar el conteo por código

    // Recorremos hasta que el acumulado sea menor o igual al valor
    let i = 0;
    for (; i < disponibles.length; i++) {
      const producto = disponibles[i];

      if (
        !producto ||
        typeof producto.precio !== "number" ||
        !producto.codigo
      ) {
        console.log(
          `Skipping producto ${producto?.Nombre} debido a datos faltantes.`
        );
        continue;
      }

      const precio = producto.precio;

      if (acumulado + precio <= valor) {
        seleccionParaCobrar.push(producto);
        acumulado += precio;

        try {
          const response = await axios.get(
            `http://localhost:3000/cliente_mercaderia/${clienteID}/mercaderias/${producto.codigo}/ids`
          );

          const idsDisponibles = response.data || [];

          if (!usadosPorCodigo[producto.codigo]) {
            usadosPorCodigo[producto.codigo] = 0;
          }

          const index = usadosPorCodigo[producto.codigo];

          if (index < idsDisponibles.length) {
            idsClienteMercaderiaSeleccionados.push(idsDisponibles[index]);
            usadosPorCodigo[producto.codigo] += 1;
          }
        } catch (error) {
          console.error(
            `Error al obtener ID de cliente_mercaderia para código ${producto.codigo}:`,
            error
          );
        }
      } else {
        break;
      }
    }

    // Vuelta extra para superar el valor si no lo alcanzamos exactamente
    if (acumulado <= valor && i < disponibles.length) {
      const productoExtra = disponibles[i];

      if (
        productoExtra &&
        typeof productoExtra.precio === "number" &&
        productoExtra.codigo
      ) {
        seleccionParaCobrar.push(productoExtra);
        acumulado += productoExtra.precio;

        try {
          const response = await axios.get(
            `http://localhost:3000/cliente_mercaderia/${clienteID}/mercaderias/${productoExtra.codigo}/ids`
          );

          const idsDisponibles = response.data || [];

          if (!usadosPorCodigo[productoExtra.codigo]) {
            usadosPorCodigo[productoExtra.codigo] = 0;
          }

          const index = usadosPorCodigo[productoExtra.codigo];

          if (index < idsDisponibles.length) {
            idsClienteMercaderiaSeleccionados.push(idsDisponibles[index]);
            usadosPorCodigo[productoExtra.codigo] += 1;
          }
        } catch (error) {
          console.error(
            `Error al obtener ID de cliente_mercaderia para código ${productoExtra.codigo}:`,
            error
          );
        }
      }
    }

    console.log("productos seleccionados:", seleccionParaCobrar);

    const diferencia = acumulado - valor;

    let mensaje = `Se han seleccionado ${seleccionParaCobrar.length} productos por un total de $${acumulado}.`;
    if (diferencia > 0) {
      mensaje += `\nSe generará un crédito de $${diferencia} debido a la diferencia.`;
    }

    const confirmar = window.confirm(mensaje);

    if (confirmar) {
      try {
        for (let idEliminar of idsClienteMercaderiaSeleccionados) {
          console.log(`Eliminando cliente_mercaderia con ID: ${idEliminar}`);
          await axios.delete(
            `http://localhost:3000/cliente_mercaderia/${idEliminar}`
          );
        }

        setValorIngresado(""); // Limpiar
      } catch (error) {
        console.error("Error al procesar el cobro parcial:", error);
        alert("Hubo un error al procesar el cobro.");
      }
    }

    if (!confirmar) return;

    // Si hay diferencia, generamos crédito
    if (diferencia > 0) {
      const clienteID = selectedCliente.ClienteID;

      // Usamos la función obtenerFechaActual para obtener la fecha en formato YYYY-MM-DD
      const fechaTexto = obtenerFechaActual(); // Ejemplo: '2025-04-17'

      // Generamos el código de crédito con diferencia + fecha en formato YYYY-MM-DD
      const fecha = obtenerFechaActual(); // Usamos el formato de la función proporcionada
      let codigoCredito = `${diferencia}${fecha}`;

      const nombreCredito = `Resto del pago efectuado el ${fechaTexto}`;

      try {
        console.log("Generando crédito:", {
          codigo: codigoCredito,
          nombre: nombreCredito,
          precio: diferencia,
          fecha: fecha, // Usamos el formato YYYY-MM-DD aquí
        });

        // Crear el crédito en mercadería
        await axios.post("http://localhost:3000/mercaderia", {
          codigo: codigoCredito,
          Nombre: nombreCredito,
          Precio: diferencia,
        });

        // Asociarlo al cliente (registramos la fecha en la tabla cliente_mercaderia)
        await axios.post("http://localhost:3000/cliente_mercaderia", {
          ClienteID: clienteID,
          codigo: codigoCredito,
          fecha: fecha, // Usamos el formato YYYY-MM-DD aquí
        });
      } catch (error) {
        console.error("Error al generar crédito:", error);
        alert("Hubo un error al generar el crédito.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const clienteID = selectedCliente.ClienteID;
      const response = await fetch(
        `http://localhost:3000/cliente_mercaderia/mercaderias/${clienteID}`
      );
      const data = await response.json();
      setDatosMercaderia(data);
      setProductosSeleccionados(data);
    } catch (error) {
      console.error("Error al obtener datos de mercadería:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCliente.ClienteID]);

  return (
    <div className="container">
      <button type="button" onClick={handleBack} className="volverInicio">
        Volver
      </button>
      <h2 className="header">{selectedCliente.Nombre}</h2>

      <table className="tabla-cobrar">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {datosMercaderia.map((mercaderia, index) => (
            <tr key={index}>
              <td>{mercaderia.fecha}</td>
              <td>{mercaderia.Nombre}</td>
              <td>$ {mercaderia.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cobranza">
        <h4>Deuda Total: $ {calcularTotal()}</h4>

        <div className="metodo-pago">
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="efectivo"
              checked={metodoPago === "efectivo"}
              onChange={() => setMetodoPago("efectivo")}
            />
            Efectivo
          </label>
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="cuentaDni"
              checked={metodoPago === "cuentaDni"}
              onChange={() => setMetodoPago("cuentaDni")}
            />
            Cuenta DNI
          </label>
        </div>

        <div className="button-container">
          <button
            type="button"
            disabled={calcularTotal() === 0}
            onClick={() => {
              if (!metodoPago) {
                alert(
                  "Por favor, seleccione un método de pago antes de cobrar."
                );
                return;
              }

              handleCobrar(calcularTotal());
              setProductosSeleccionados([]);
              setValorIngresado("");
              setMetodoPago(""); // Opcional: limpia selección de método
            }}
          >
            Cobrar total: $ {calcularTotal()}
          </button>
        </div>

        <hr />

        <label>Entrega:</label>
        <input
          type="number"
          value={valorIngresado}
          onChange={(e) => setValorIngresado(e.target.value)}
        />

        <div className="button-container">
          <button
            type="button"
            disabled={!valorIngresado}
            onClick={() => {
              if (!metodoPago) {
                alert(
                  "Por favor, seleccione un método de pago antes de cobrar."
                );
                return;
              }

              const valor = parseFloat(valorIngresado);
              if (valor > calcularTotal()) {
                alert("El valor ingresado es mayor que la deuda total.");
                return;
              }

              handleCobrar(valor);
              setProductosSeleccionados([]);
              setValorIngresado("");
              setMetodoPago("");
            }}
          >
            Cobrar: $ {valorIngresado || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CobrarCliente;
