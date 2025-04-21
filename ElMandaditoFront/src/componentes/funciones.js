export const obtenerFechaActual = () => {
  const ahora = new Date();
  const year = ahora.getFullYear();
  const month = String(ahora.getMonth() + 1).padStart(2, "0");
  const day = String(ahora.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export async function procesarCaja(tipoPago, monto, obtenerFechaActual) {
  if (monto === 0) return;

  const fecha = obtenerFechaActual(); // Obtener la fecha actual
  const url = `http://localhost:3000/caja/fecha/${fecha}`; // Llamar al endpoint con la fecha

  try {
    // Verificar si ya existe un registro para la fecha actual
    const response = await fetch(url);
    const fechaExiste = await response.json(); // Esperamos un booleano (true o false)

    if (fechaExiste) {
      // Si la fecha existe, actualizar la caja
      await actualizarCaja(tipoPago, monto, fecha);
    } else {
      // Si no existe, crear un nuevo registro con la fecha y el monto correspondiente
      await crearNuevoRegistro(fecha, tipoPago, monto);
    }
  } catch (error) {
    console.error("Error al procesar la caja:", error);
  }
}

async function actualizarCaja(tipoPago, monto, fecha) {
  const url = `http://localhost:3000/caja/actualizar/${tipoPago}/${fecha}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ monto }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al actualizar la caja");
    }

    console.log("✅ Caja actualizada correctamente:", data);
  } catch (error) {
    console.error("❌ Error al actualizar la caja:", error.message);
  }
}

// Función para crear un nuevo registro en la caja
async function crearNuevoRegistro(fecha, tipoPago, monto) {
  const url = "http://localhost:3000/caja";

  // Crear un nuevo registro en la caja con la fecha y el monto correspondiente
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fecha, tipoPago, monto }),
  });
}

// funciones para actualizar stock

/**
 * Para cada producto vendido, busca su stock actual,
 * calcula el nuevo stock (no menor a 0) y lo actualiza vía API.
 *
 * @param {Array<{ codigo: string, cantidad: number|string }>} productosVendidos
 */
export async function actualizarStockDespuesVenta(productosVendidos) {
  try {
    for (const producto of productosVendidos) {
      const { codigo, cantidad } = producto;
      console.log(
        `\n— Procesando venta de código: ${codigo}, cantidad vendida (raw):`,
        cantidad
      );

      // 1) Obtener mercadería por código
      const getRes = await fetch(
        `http://localhost:3000/mercaderia/codigo/${codigo}`
      );
      if (!getRes.ok) {
        console.warn(
          `⚠️ No se pudo obtener mercadería ${codigo}:`,
          getRes.status
        );
        continue;
      }
      const data = await getRes.json();
      console.log(`📦 Datos actuales del producto:`, data);

      // 2) Convertir cantidad a número
      const cantidadNum = Number(producto.cantidad);

      if (isNaN(cantidadNum) || cantidadNum <= 0) {
        console.warn(`⚠️ Cantidad inválida para ${codigo}:`, producto.cantidad);
        continue;
      }

      // 3) Calcular nuevo stock
      const stockActual = Number(data.stock) || 0;
      let nuevoStock = stockActual - cantidadNum;

      // Asegurarse de que el stock no sea negativo
      if (nuevoStock < 0) {
        nuevoStock = 0;
      }

      console.log(
        `🔢 Stock actual: ${stockActual}, vendida: ${cantidadNum}, nuevoStock: ${nuevoStock}`
      );

      // 4) Hacer PUT al controlador usando el código como ID
      const updateRes = await fetch(
        `http://localhost:3000/mercaderia/${codigo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // mantenemos todos los campos necesarios
            codigo: data.codigo,
            Nombre: data.Nombre,
            Precio: data.Precio,
            stock: nuevoStock,
          }),
        }
      );
      if (!updateRes.ok) {
        console.error(
          `❌ Error al actualizar stock de ${codigo}:`,
          updateRes.status,
          await updateRes.text()
        );
        continue;
      }
      const updated = await updateRes.json();
      console.log(
        `✅ Stock de ${codigo} actualizado exitosamente:`,
        updated.stock
      );
    }
  } catch (err) {
    console.error("💥 Error en actualizarStockDespuesVenta:", err);
  }
}
