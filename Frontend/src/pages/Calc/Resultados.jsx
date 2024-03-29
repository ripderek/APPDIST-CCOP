import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Resultados({ openT, handleOpen, datos, id, titulo }) {
  //con un useEffect cargar los resultados segun el id de la calculadora que se desea usar
  useEffect(() => {
    //ObtenerRespuestas();
    if (datos !== undefined) {
      ObtenerRespuestas();
    }
  }, []);
  const [resultad, setresult] = useState([]);
  // Función para obtener los datos de manera asíncrona
  const ObtenerRespuestas = async () => {
    try {
      const response = await fetch("/api/tendencia-central", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ datos }),
      });

      if (!response.ok) {
        throw new Error("Error al calcular estadísticas. xd");
      }

      const data = await response.json();
      // setDatos([...datos, { id: datos.length, num: parseFloat(numero1) }]);
      const newData = [
        { name: "Media", value: data.Media },
        { name: "Mediana", value: data.Mediana },
        { name: "Moda", value: data.Moda },
      ];
      setresult(newData);
      //setresult(data || {});
      console.log("Estadísticas:", data);
    } catch (error) {
      alert("Error al calcular estadísticas:", error.message);
      console.error("Error al calcular estadísticas:", error.message);
    }
  };

  return (
    <>
      <Dialog open={openT} handler={handleOpen}>
        <DialogHeader>Resultados </DialogHeader>
        <DialogBody className="text-center mx-auto">
          <div className="mx-auto items-center text-center">
            <div>Resultados de {titulo}</div>
            <div className="mx-auto">
              <LineChart
                width={400}
                height={300}
                data={resultad}
                className="mx-auto"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </div>
            {/* HACER UNA TABLA PARA QUE SE VENA LOS RESULTADOS EN FORMA DE TABLA XD */}
            <table className="w-auto mx-auto min-w-max table-auto text-left">
              <tbody>
                {resultad.map(({ name, value }, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50 bg-blue-gray-100">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="purple" onClick={handleOpen}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
