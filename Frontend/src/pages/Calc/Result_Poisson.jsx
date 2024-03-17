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
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Result_Poisson({
  openT,
  handleOpen,
  id,
  titulo,
  numeroEventos,
  tasaMedia,
}) {
  useEffect(() => {
    calcularProbabilidad();
  }, []);
  const [probabilidadExito, setProbabilidadExito] = useState(null);
  const data = [
    { numeroEventos: numeroEventos, probabilidad: probabilidadExito },
  ];

  const calcularProbabilidad = async () => {
    try {
      const parsedP = parseFloat(tasaMedia);
      const parsedNumero = parseFloat(numeroEventos);

      const response = await fetch("/api/poisson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasaMedia: parsedP,
          numeroEventos: parsedNumero,
        }),
      });

      const data = await response.json();
      setProbabilidadExito(data.probabilidad);
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
            Tasa Media: {tasaMedia} Numero de Eventos:{numeroEventos}
            <div className="mx-auto">{/*GRAFICA */}</div>
            <BarChart width={600} height={400} data={data} className="mx-auto">
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="numeroEventos" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="probabilidad" fill="#8884d8" />
            </BarChart>
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
          <div className="mx-auto"></div>
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
