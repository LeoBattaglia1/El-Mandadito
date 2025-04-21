import React, { useState, useEffect } from "react";
import {
  obtenerFechaActual,
  procesarCaja,
  actualizarStockDespuesVenta,
} from "../funciones";
import "./venta.css";
/* import jsPDF from "jspdf"; no lo usamos en este programa */

const Ventas = ({ handleBackInicio }) => {
  const [busquedaCodigo, setBusquedaCodigo] = useState("");
  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [precioIngresado, setPrecioIngresado] = useState("");
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [sugerenciasNombres, setSugerenciasNombres] = useState([]);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mostrarClientes, setMostrarClientes] = useState(false);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState(null);

  useEffect(() => {
    if (mostrarClientes) {
      const obtenerClientes = async () => {
        try {
          const response = await fetch("http://localhost:3000/clientes");
          if (response.ok) {
            const data = await response.json();
            setClientes(data);
          } else {
            console.error("Error al obtener clientes:", response.status);
          }
        } catch (error) {
          console.error("Error al obtener clientes:", error.message);
        }
      };

      obtenerClientes();
    }
  }, [mostrarClientes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/mercaderia/${busquedaCodigo}`
        );

        if (response.ok) {
          const producto = await response.json();
          // Agregar el producto seleccionado a la lista de productos
          handleAgregarProducto({ ...producto, cantidad: 1 });

          // Limpiar el código de búsqueda después de agregar el producto
          setBusquedaCodigo("");
        } else {
          console.error(
            `Error de red: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };

    // Realizar la solicitud solo si hay un código de búsqueda
    if (busquedaCodigo.trim() !== "") {
      fetchData();
    }
  }, [busquedaCodigo]);

  useEffect(() => {
    const fetchTodosLosProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/mercaderia");
        if (response.ok) {
          const productos = await response.json();
          // Filtrar los productos indeseados
          const productosFiltrados = productos.filter(
            (producto) =>
              producto.Nombre !== "-" &&
              producto.Nombre !== "Resto de un pago realizado"
          );
          // Establecer los productos filtrados en el estado
          setTodosLosProductos(productosFiltrados);
        } else {
          console.error(
            `Error de red: ${response.status} - ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error durante la solicitud:", error);
      }
    };

    fetchTodosLosProductos();
  }, []);

  useEffect(() => {
    // Filtrar y mapear sugerencias solo si la lista debe mostrarse
    if (mostrarSugerencias) {
      const sugerencias = todosLosProductos
        .filter(
          (producto) =>
            producto.Nombre &&
            producto.Nombre.toLowerCase().includes(busquedaNombre.toLowerCase())
        )
        .map((producto) => producto.Nombre);

      setSugerenciasNombres(sugerencias);
    }
  }, [busquedaNombre, todosLosProductos, mostrarSugerencias]);

  const handleAgregarProducto = (productoNuevo) => {
    const cantidadNueva = productoNuevo.cantidad || 1;

    setProductosSeleccionados((prevProductos) => {
      const indexExistente = prevProductos.findIndex(
        (p) => p.codigo === productoNuevo.codigo
      );

      if (indexExistente !== -1) {
        // Si ya existe, sumamos la cantidad
        const productosActualizados = [...prevProductos];
        const cantidadExistente =
          parseFloat(productosActualizados[indexExistente].cantidad) || 1;

        productosActualizados[indexExistente] = {
          ...productosActualizados[indexExistente],
          cantidad: cantidadExistente + cantidadNueva,
        };

        return productosActualizados;
      } else {
        // Si no existe, lo agregamos al principio
        return [productoNuevo, ...prevProductos];
      }
    });
  };

  const handleFiadoClick = () => {
    setMostrarClientes((prev) => !prev);
  };

  //ingreso de precio y guarda el precio con un id igual al valor
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isNaN(parseFloat(precioIngresado))) {
      const nuevoProducto = {
        codigo: precioIngresado.toString() + "000000",
        Nombre: "-",
        Precio: parseFloat(precioIngresado),
        cantidad: 1,
      };

      handleAgregarProducto(nuevoProducto);

      setPrecioIngresado(""); // Limpiar input
    }
  };

  const handleChangeCodigo = (e) => {
    setBusquedaCodigo(e.target.value);
  };

  ///para búsquedas por nombre
  const handleChangeNombre = (e) => {
    setBusquedaNombre(e.target.value);
    // Mostrar las sugerencias solo si hay algo escrito en el input
    setMostrarSugerencias(e.target.value.trim() !== "");
  };

  const handleClickSugerencia = async (nombre) => {
    try {
      const response = await fetch(
        `http://localhost:3000/mercaderia/?Nombre_like=${nombre}&Nombre_ne=Resto%20de%20un%20pago%20realizado&Nombre_ne=-`
      );

      if (response.ok) {
        const productos = await response.json();

        const producto = productos.find((p) => p.Nombre === nombre);

        if (producto) {
          handleAgregarProducto({ ...producto, cantidad: 1 });

          setBusquedaNombre("");
          setSugerenciasNombres([]);
          setMostrarSugerencias(false);
        } else {
          console.error("Producto no encontrado para el nombre:", nombre);
        }
      } else {
        console.error(
          `Error al obtener la lista de productos. Código de respuesta: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  const handleInputBlur = () => {
    // Ocultar las sugerencias cuando el input pierde foco
    setMostrarSugerencias(false);
  };
  /////////////////////////

  //FUNCION PARA ELIMINAR PRODUCTO DE LA LISTA
  const handleRemoveProducto = (index) => {
    // Remover el producto de la lista al hacer clic en la "x"
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos.splice(index, 1);
    setProductosSeleccionados(nuevosProductos);
  };

  // Función para calcular el total de los precios
  const calcularTotal = () => {
    return productosSeleccionados.reduce((total, producto) => {
      const cantidad = parseInt(producto.cantidad) || 1;
      return total + cantidad * parseFloat(producto.Precio);
    }, 0);
  };

  const handleCantidadChange = (e, index) => {
    const valor = e.target.value;

    const nuevosProductos = [...productosSeleccionados];
    // Permitimos string vacío para que el usuario pueda borrar
    nuevosProductos[index].cantidad = valor === "" ? "" : parseFloat(valor);
    setProductosSeleccionados(nuevosProductos);
  };

  const handleClienteSeleccionado = (id) => {
    setClienteSeleccionadoId(id);
  };
  //guarda en cliete_mercaderia la mercaderia del cliente fiado seleccionado///
  const handleGuardarClick = async () => {
    if (clienteSeleccionadoId !== null && productosSeleccionados.length > 0) {
      try {
        const fechaHoy = obtenerFechaActual();

        // Paso 1: Obtener los códigos ya registrados en mercaderia
        const mercaderiaResponse = await fetch(
          "http://localhost:3000/mercaderia"
        );
        const productosExistentes = await mercaderiaResponse.json();
        const codigosRegistrados = productosExistentes.map((p) => p.codigo);

        // Paso 2: Procesar cada producto seleccionado
        for (const producto of productosSeleccionados) {
          const cantidad = producto.cantidad || 1;

          // Si el producto es "-", generar el código dinámico
          if (producto.Nombre === "-") {
            const codigoGenerado = `${producto.Precio}00000`;

            // Verificar si ya existe en la tabla mercaderia
            if (!codigosRegistrados.includes(codigoGenerado)) {
              await fetch("http://localhost:3000/mercaderia", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  codigo: codigoGenerado,
                  Nombre: "-",
                  Precio: producto.Precio,
                }),
              });

              // Evitar registrar duplicados dentro del mismo guardado
              codigosRegistrados.push(codigoGenerado);
            }
          }

          // Código para registrar en cliente_mercaderia
          const codigoClienteMercaderia =
            producto.Nombre === "-"
              ? `${producto.Precio}00000`
              : producto.codigo;

          // Nuevo POST con cantidad incluida
          await fetch("http://localhost:3000/cliente_mercaderia", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ClienteID: clienteSeleccionadoId,
              codigo: codigoClienteMercaderia,
              fecha: fechaHoy,
              cantidad: cantidad,
            }),
          });
        }
        await procesarCaja("fiado", calcularTotal(), obtenerFechaActual);
        await actualizarStockDespuesVenta(productosSeleccionados);

        // Limpiar la tabla y ocultar clientes
        setProductosSeleccionados([]);
        setMostrarClientes(false);
        setClienteSeleccionadoId(null);
      } catch (error) {
        console.error("Error al guardar datos:", error.message);
      }
    } else {
      console.warn("Ningún cliente seleccionado o productos para guardar.");
    }
  };

  ///////desactivado para elmandadito///////
  /*   const handleExportPDF = () => {
    const doc = new jsPDF();

    // Obtener la fecha actual en formato DD/MM/YYYY
    const today = new Date();
    const formattedDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    // Agregar encabezado con la fecha actual
    doc.text(`Vente del dia: ${formattedDate}`, 10, 10);

    // Array para almacenar líneas de texto
    const lines = [];

    // Iterar sobre los datos de la tabla y agregarlos al array de líneas
    productosSeleccionados.forEach((producto, index) => {
      lines.push(`${producto.Nombre} - $ ${producto.Precio}`);
    });

    // Agregar el total al array de líneas
    lines.push(`Total: $${calcularTotal()}`);

    // Agregar espacio adicional
    lines.push(""); // Línea en blanco como espacio adicional

    // Agregar párrafo adicional
    lines.push(
      "ACLARACION: aquellos precios que no muestra el producto corresponde a"
    );
    lines.push(
      "mercaderia que no está registrada en el sistema como por ejemplo,"
    );
    lines.push("aquellas que deben ser pesadas (frutas, fiambres, milanesas,");
    lines.push("alimentos para mascotas, etc)");

    // Iterar sobre las líneas y agregarlas al PDF
    lines.forEach((line, index) => {
      const yPosition = 20 + index * 10;
      // Agregar la línea al PDF
      doc.text(line, 10, yPosition);
    });

    // Guardar el PDF
    doc.save("datos_exportados.pdf");
  }; */
  ///////////////////////////////////////////

  return (
    <div className="ventas-container">
      {/* Botón de volver */}
      <button
        type="button"
        onClick={handleBackInicio}
        className="volverInicioV"
      >
        Volver
      </button>

      <h1>Ventas</h1>

      {/* Área de búsqueda y entradas */}
      <div className="buscador-container">
        <input
          type="text"
          placeholder="Buscar por código"
          value={busquedaCodigo}
          onChange={handleChangeCodigo}
        />
        <input
          type="text"
          placeholder="Ingresar precio"
          value={precioIngresado}
          onChange={(e) => setPrecioIngresado(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={busquedaNombre}
          onChange={handleChangeNombre}
          onFocus={() => setMostrarSugerencias(busquedaNombre.trim() !== "")}
          onBlur={handleInputBlur}
        />

        {sugerenciasNombres.length > 0 && (
          <ul className="sugerencias-nombres">
            {sugerenciasNombres
              .filter(
                (nombre) =>
                  !nombre.startsWith("Resto del pago") && nombre !== "-"
              ) // Filtra los registros no deseados
              .map((nombre, index) => (
                <li key={index} onClick={() => handleClickSugerencia(nombre)}>
                  {nombre}
                </li>
              ))}
          </ul>
        )}

        {/* Contador de productos seleccionados */}
        <p>
          Total de productos:{" "}
          {productosSeleccionados.reduce((total, prod) => {
            const cant = parseFloat(prod.cantidad);
            if (Number.isInteger(cant)) {
              return total + Math.abs(cant);
            } else {
              return total + 1;
            }
          }, 0)}
        </p>
      </div>

      {/* Tabla de productos seleccionados */}
      <table className="tabla-ventas">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>Cant</th>
            <th>Nombre</th>
            <th>Unidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.map((producto, index) => {
            const cantidad = parseFloat(producto.cantidad) || 1;

            const total = Math.round(cantidad * producto.Precio * 100) / 100;

            return (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    min="0.05"
                    step="0.05"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadChange(e, index)}
                    style={{ width: "60px", textAlign: "center" }}
                  />
                </td>

                <td>{producto.Nombre}</td>
                <td>$ {producto.Precio}</td>
                <td>$ {total}</td>
                <td>
                  <button
                    className="sacarProducto"
                    type="button"
                    onClick={() => handleRemoveProducto(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Total y botones de pago */}
      <div className="parte-dos">
        <p>Total Venta: $ {calcularTotal()}</p>
        <div className="button-container">
          <button
            type="button"
            onClick={() => {
              procesarCaja("efectivo", calcularTotal(), obtenerFechaActual);
              actualizarStockDespuesVenta(productosSeleccionados);
              setProductosSeleccionados([]);
            }}
            disabled={calcularTotal() === 0}
          >
            Efectivo
          </button>
          <button
            type="button"
            onClick={() => {
              procesarCaja("cuentaDni", calcularTotal(), obtenerFechaActual);
              actualizarStockDespuesVenta(productosSeleccionados);
              setProductosSeleccionados([]);
            }}
            disabled={calcularTotal() === 0}
          >
            Cuenta DNI
          </button>
          <button
            type="button"
            onClick={handleFiadoClick}
            disabled={calcularTotal() === 0}
          >
            Fiado
          </button>
        </div>
      </div>

      {/* Lista de clientes si se elige "Fiado" */}
      {mostrarClientes && (
        <div className="tabla-clientes">
          <h2>Lista de Clientes</h2>

          <table>
            <tbody>
              {[...clientes]
                .sort((a, b) => a.Nombre.localeCompare(b.Nombre))
                .map((cliente) => (
                  <tr key={cliente.ClienteID}>
                    <td>
                      <input
                        type="radio"
                        name="clienteRadio"
                        value={cliente.ClienteID}
                        checked={clienteSeleccionadoId === cliente.ClienteID}
                        onChange={() =>
                          handleClienteSeleccionado(cliente.ClienteID)
                        }
                      />
                      {cliente.Nombre}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <button type="button" onClick={handleGuardarClick}>
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};
export default Ventas;
