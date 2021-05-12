import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUser } from "../utils/User";

const Establecimiento = () => {
  const [userData, setUserData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setUserData(getUser());
  }, []);

  const onSubmit = (data) => {
    if (!userData) return;
    if (!userData.user) return;
    if (!userData.jwt) return;
    if (!(data.fotos.length > 0)) return;

    let formData = new FormData();
    formData.append("files", data.fotos[0]);
    axios
      .post("http://localhost:1337/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.jwt}`,
        },
      })
      .then((foto) => {
        console.log({ foto });
        axios
          .post(
            "http://localhost:1337/establecimientos",
            {
              ...data,
              fotos: foto.data,
            },
            { headers: { Authorization: `Bearer ${userData.jwt}` } }
          )
          .then((establecimiento) => console.log({ establecimiento }));
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="matricula">matricula</label>
      <input id="matricula" type="number" {...register("matricula")}></input>
      <label htmlFor="nombre">nombre</label>
      <input id="nombre" {...register("nombre")}></input>
      <label htmlFor="ubicacion">ubicacion</label>
      <input id="ubicacion" {...register("ubicacion")}></input>
      <label htmlFor="descripcion">descripcion</label>
      <input id="descripcion" {...register("descripcion")}></input>
      <label htmlFor="infoContacto">infoContacto</label>
      <input id="infoContacto" {...register("infoContacto")}></input>
      <label htmlFor="tipoEstablecimiento">tipoEstablecimiento</label>
      <select
        id="tipoEstablecimiento"
        defaultValue="bar"
        {...register("tipoEstablecimiento")}
      >
        {["bar", "hotel", "restaurante"].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
      <label htmlFor="calificacion">Calificacion</label>
      <select
        id="calificacion"
        defaultValue={"uno"}
        {...register("calificacion")}
      >
        {[
          { label: "⭐", val: "uno" },
          { label: "⭐⭐", val: "dos" },
          { label: "⭐⭐⭐", val: "tres" },
          { label: "⭐⭐⭐⭐", val: "cuatro" },
          { label: "⭐⭐⭐⭐⭐", val: "cinco" },
        ].map(({ label, val }) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </select>
      <label htmlFor="fotos">Fotos</label>
      <input type="file" {...register("fotos")}></input>
      <button type="submit">Crear</button>
    </form>
  );
};

export default Establecimiento;
