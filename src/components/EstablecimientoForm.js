import { useEffect } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <Label htmlFor="matricula">Matricula</Label>
        <Input id="matricula" type="number" {...register("matricula")}></Input>
      </Section>
      <Section>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" {...register("nombre")}></Input>
      </Section>
      <Section className="">
        <Label htmlFor="ubicacion">Ubicacion</Label>
        <Input id="ubicacion" {...register("ubicacion")}></Input>
      </Section>
      <Section className="">
        <Label htmlFor="descripcion">Descripcion</Label>
        <Input id="descripcion" {...register("descripcion")}></Input>
      </Section>
      <Section className="">
        <Label htmlFor="infoContacto">Info de Contacto</Label>
        <Input id="infoContacto" {...register("infoContacto")}></Input>
      </Section>
      <Section className="">
        <Label htmlFor="tipoEstablecimiento">Tipo Establecimiento</Label>
        <Select
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
        </Select>
      </Section>

      <Section className="">
        <Label htmlFor="calificacion">Calificacion</Label>
        <Select
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
        </Select>
      </Section>
      <Section className="">
        <Label htmlFor="fotos">Fotos</Label>
        <Input type="file" {...register("fotos")}></Input>
      </Section>
      <Section className="">
        <Button type="submit">Crear</Button>
      </Section>
    </Form>
  );
};

const colorPrincipal = "#96bb7c";
const colorSecundario = "#252525";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 50%;
  margin: auto;
  gap: 10px;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Label = styled.label`
  font-size: 18px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colorSecundario};
  font-weight: bold;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  background: ${colorPrincipal};
  border: none;
  border-radius: 3px;
  color: #fff;
  :focus {
    outline: none;
  }
`;

const Select = styled.select`
  font-size: 18px;
  padding: 10px;
  background: ${colorPrincipal};
  border: none;
  border-radius: 3px;
  color: #fff;
  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop*/
  background: ${colorPrincipal};
  color: #fff;
  font-size: 18px;
  padding: 0.25em 1em;
  border: 2px solid ${colorSecundario};
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

export default EstablecimientoForm;
