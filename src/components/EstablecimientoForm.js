import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useEstablecimientos } from "./core/EstablecimientoContext";
import { useUser } from "./core/UserContext";
import { useNotification } from "./core/NotificationContext";

const EstablecimientoForm = ({ establecimientoData, setIsOpen }) => {
  const { userData } = useUser();
  const { handlePost, handlePut } = useEstablecimientos();
  const [notification, setNotification] = useState(null);
  const { open, handleRender } = useNotification();
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
      handlePost(formData, data);
    } else {
      handlePut(formData, establecimientoData, data, setIsOpen);
    }
  };

  useEffect(() => {
    setNotification(handleRender());
  }, [open]);
  return (
    <>
      {notification}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <Label htmlFor="matricula">Matricula</Label>
          <Input
            id="matricula"
            type="number"
            {...register("matricula")}
          ></Input>
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
    </>
  );
};

const colorPrincipal = "#96bb7c";
const colorSecundario = "#252525";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  margin: auto;
  gap: 10px;
  margin-bottom: auto;
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
