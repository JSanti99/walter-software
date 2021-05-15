import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEstablecimientos } from "./core/EstablecimientoContext";
import { useUser } from "./core/UserContext";

const EstablecimientoForm = ({ establecimientoData, setIsOpen }) => {
  const { userData } = useUser();
  const { establecimientos, setEstablecimientos } = useEstablecimientos();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (establecimientoData) {
      setValue("matricula", establecimientoData.matricula);
      setValue("nombre", establecimientoData.nombre);
      setValue("ubicacion", establecimientoData.ubicacion);
      setValue("descripcion", establecimientoData.descripcion);
      setValue("tipoEstablecimiento", establecimientoData.tipoEstablecimiento);
      setValue("infoContacto", establecimientoData.infoContacto);
      setValue("calificacion", establecimientoData.calificacion);
    }
  }, [establecimientoData]);

  const onSubmit = (data) => {
    if (!userData) return;
    if (!userData.user) return;
    if (!userData.jwt) return;
    if (!(data.fotos.length > 0)) return;

    let formData = new FormData();
    formData.append("files", data.fotos[0]);
    if (!establecimientoData) {
      axios
        .post("http://localhost:1337/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.jwt}`,
          },
        })
        .then((foto) => {
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
    } else {
      axios
        .post("http://localhost:1337/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.jwt}`,
          },
        })
        .then((foto) => {
          axios
            .put(
              `http://localhost:1337/establecimientos/${establecimientoData.id}`,
              {
                ...data,
                fotos: foto.data,
              },
              { headers: { Authorization: `Bearer ${userData.jwt}` } }
            )
            .then((establecimiento) => {
              setEstablecimientos([
                ...establecimientos.filter(
                  (est) => est.id !== establecimiento.data.id
                ),
                establecimiento.data,
              ]);
              setIsOpen(false);
            });
        });
    }
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
        {[
          "turistico",
          "hotel",
          "restaurante",
          "entretenimiento",
          "tradicional",
        ].map((val) => (
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

export default EstablecimientoForm;
