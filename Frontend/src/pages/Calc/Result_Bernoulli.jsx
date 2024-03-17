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
export default function Result_Bernoulli({
  openT,
  handleOpen,
  id,
  titulo,
  numero,
  p,
}) {
  useEffect(() => {
    calcularProbabilidad();
  }, []);
  const [probabilidadExito, setProbabilidadExito] = useState(null);
  const data = [
    { name: "Éxito", probabilidad: probabilidadExito },
    { name: "Fracaso", probabilidad: 1 - probabilidadExito },
  ];

  const calcularProbabilidad = async () => {
    try {
      const parsedP = parseFloat(p);
      const parsedNumero = parseFloat(numero);

      const response = await fetch("/api/bernoulli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ p: parsedP, numero: parsedNumero }),
      });

      const data = await response.json();
      setProbabilidadExito(data.probabilidadExito);
      //console.log(data);
    } catch (error) {
      alert("Error");
      console.error(
        "Error al calcular la probabilidad de éxito 2:",
        error.message
      );
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={openT} handler={handleOpen}>
        <DialogHeader>Resultados </DialogHeader>
        <DialogBody className="text-center mx-auto">
          <div className="mx-auto items-center text-center">
            <div>Resultados de {titulo}</div>
            Probabilidad: {p} Numero:{numero}
            <div className="mx-auto">{/*GRAFICA */}</div>
            {/* HACER UNA TABLA PARA QUE SE VENA LOS RESULTADOS EN FORMA DE TABLA XD */}
            {/*
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
             */}
          </div>
          Resultado: {probabilidadExito}
          <div className="mx-auto">
            <LineChart width={400} height={300} data={data} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="probabilidad" stroke="#8884d8" />
            </LineChart>
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
