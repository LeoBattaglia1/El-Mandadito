import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { obtenerFechaActual, procesarCaja } from "../../funciones";
import "./cobrarCliente.css";

const CobrarCliente = ({ handleBack, selectedCliente }) => {
  const [metodoPago, setMetodoPago] = useState("");
  const [valorIngresado, setValorIngresado] = useState("");
  const [datosMercaderia, setDatosMercaderia] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const calcularTotal = () => {
    const total = datosMercaderia.reduce((acum, mercaderia) => {
      const precio = parseFloat(mercaderia.precio) || 0;
      const cantidad = parseFloat(mercaderia.cantidad) || 0;
      return acum + precio * cantidad;
    }, 0);

    return total.toFixed(2).replace(/\.00$/, "");
  };

  const realizarCobroTotal = async (valor) => {
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

      await procesarCaja(metodoPago, Number(valor), obtenerFechaActual);

      alert(`Se cobraron $${valor} en ${metodoPago.toUpperCase()}`);
      setDatosMercaderia([]);
      setValorIngresado("");
    } catch (error) {
      console.error("Error al procesar el cobro total:", error);
      alert("Hubo un error al procesar el cobro.");
    }
  };

  const realizarCobroParcial = async (valor) => {
    if (!productosSeleccionados || productosSeleccionados.length === 0) {
      alert("No hay productos seleccionados.");
      return;
    }

    const disponibles = datosMercaderia.filter((m) =>
      productosSeleccionados.includes(m)
    );

    let acumulado = 0;
    const seleccionParaCobrar = [];
    const idsClienteMercaderiaSeleccionados = [];
    const clienteID = selectedCliente.ClienteID;

    const usoPorCodigo = {}; // lleva cuenta cuántas veces usamos cada código
    const cacheIDsPorCodigo = {}; // almacena los IDs disponibles por código

    for (const producto of disponibles) {
      if (
        !producto ||
        isNaN(parseFloat(producto.precio)) ||
        isNaN(parseFloat(producto.cantidad)) ||
        !producto.codigo
      )
        continue;

      const precioUnitario = parseFloat(producto.precio);
      const cantidadTotal = parseFloat(producto.cantidad);
      const totalProducto = precioUnitario * cantidadTotal;

      if (acumulado < valor) {
        acumulado += totalProducto;
        seleccionParaCobrar.push({ ...producto });

        const codigo = producto.codigo;
        usoPorCodigo[codigo] = (usoPorCodigo[codigo] || 0) + 1;

        if (!cacheIDsPorCodigo[codigo]) {
          try {
            const response = await axios.get(
              `http://localhost:3000/cliente_mercaderia/${clienteID}/mercaderias/${codigo}/ids`
            );
            cacheIDsPorCodigo[codigo] = response.data || [];
            console.log(
              `IDs encontrados para ${codigo}:`,
              cacheIDsPorCodigo[codigo]
            );
          } catch (error) {
            console.error(`Error obteniendo IDs de ${producto.codigo}`, error);
            continue;
          }
        }

        const index = usoPorCodigo[codigo] - 1;
        const idSeleccionado = cacheIDsPorCodigo[codigo][index];
        if (idSeleccionado) {
          idsClienteMercaderiaSeleccionados.push(idSeleccionado);
        } else {
          console.warn(`No hay suficientes IDs para el código ${codigo}`);
        }
      }

      if (acumulado >= valor) break;
    }

    console.log(
      "IDs seleccionados para eliminar:",
      idsClienteMercaderiaSeleccionados
    );

    const diferencia = acumulado - valor;

    let mensaje = `Se han seleccionado ${seleccionParaCobrar.length} productos por un total de $${acumulado}.`;
    if (diferencia > 0) {
      mensaje += `\nSe generará un crédito de $${diferencia} debido a la diferencia.`;
    }

    const confirmar = window.confirm(mensaje);
    if (!confirmar) return;

    try {
      for (let idEliminar of idsClienteMercaderiaSeleccionados) {
        await axios.delete(
          `http://localhost:3000/cliente_mercaderia/${idEliminar}`
        );
      }

      await procesarCaja(metodoPago, valor, obtenerFechaActual);
      setValorIngresado("");

      const fecha = obtenerFechaActual();

      if (diferencia > 0) {
        const codigoCredito = `${diferencia}${fecha}`;
        const nombreCredito = `Resto del pago efectuado el ${fecha}`;

        try {
          await axios.get(
            `http://localhost:3000/mercaderia/codigo/${codigoCredito}`
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            try {
              await axios.post("http://localhost:3000/mercaderia", {
                codigo: codigoCredito,
                Nombre: nombreCredito,
                Precio: diferencia,
              });
            } catch (postError) {
              alert("No se pudo registrar el crédito.");
              return;
            }
          } else {
            alert("Hubo un error al verificar si el crédito ya existe.");
            return;
          }
        }

        try {
          await axios.post("http://localhost:3000/cliente_mercaderia", {
            ClienteID: clienteID,
            codigo: codigoCredito,
            cantidad: 1,
            fecha: fecha,
          });
        } catch (vinculoError) {
          alert("Error al asociar el crédito al cliente.");
          return;
        }
      }

      await fetchData();
    } catch (error) {
      console.error("Error al procesar el cobro parcial:", error);
      alert("Hubo un error al procesar el cobro.");
    }
  };

  const handleCobrar = async (valor) => {
    if (!metodoPago) {
      alert("Debe seleccionar una forma de pago.");
      return;
    }

    if (valor <= 0) {
      alert("El valor debe ser mayor que 0.");
      return;
    }

    if (valor === calcularTotal()) {
      await realizarCobroTotal(valor);
    } else {
      await realizarCobroParcial(valor);
    }

    setProductosSeleccionados([]);
    setValorIngresado("");
    setMetodoPago("");
  };

  const fetchData = useCallback(async () => {
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
  }, [selectedCliente.ClienteID]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            <th>Producto (cantidad)</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {datosMercaderia.map((mercaderia, index) => (
            <tr key={index}>
              <td>{mercaderia.fecha}</td>
              <td>
                {mercaderia.Nombre} (
                {parseFloat(mercaderia.cantidad)
                  .toString()
                  .replace(/\.00$/, "")}
                )
              </td>
              <td>
                $
                {(mercaderia.precio * mercaderia.cantidad)
                  .toFixed(2)
                  .replace(/\.00$/, "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cobranza">
        <h4>Deuda Total: $ {calcularTotal()}</h4>

        <div className="metodo-pago">
          <h6>Forma de pago</h6>
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
            Pago digital
          </label>
        </div>

        <div className="button-container">
          <button
            type="button"
            disabled={calcularTotal() === 0}
            onClick={() => handleCobrar(calcularTotal())}
          >
            Cobrar total: $ {calcularTotal()}
          </button>
        </div>

        <hr />

        <div className="button-container">
          <label>Entrega:</label>
          <input
            type="number"
            value={valorIngresado}
            onChange={(e) => setValorIngresado(e.target.value)}
          />
          <button
            type="button"
            disabled={!valorIngresado}
            onClick={() => {
              const valor = parseFloat(valorIngresado);
              if (!metodoPago) {
                alert(
                  "Por favor, seleccione una forma de pago antes de cobrar."
                );
                return;
              }
              if (valor > calcularTotal()) {
                alert("El valor ingresado es mayor que la deuda total.");
                return;
              }
              handleCobrar(valor);
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
