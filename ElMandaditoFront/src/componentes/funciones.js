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
