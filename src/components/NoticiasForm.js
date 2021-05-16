import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useNoticias } from "./core/NoticiasContext";
import { useNotification } from "./core/NotificationContext";
import { useUser } from "./core/UserContext";

const NoticiasForm = ({ noticiaData, setIsOpen }) => {
  const { userData } = useUser();
  const { handlePost, handlePut } = useNoticias();
  const { open, handleRender } = useNotification();
  const [notification, setNotification] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (noticiaData) {
      setValue("title", noticiaData.title);
      setValue("descripcion", noticiaData.descripcion);
    }
  }, [noticiaData]);

  const onSubmit = (data) => {
    if (!userData) return;
    if (!userData.user) return;
    if (!userData.jwt) return;

    if (!noticiaData) {
      handlePost(data);
    } else {
      handlePut({ id: noticiaData.id, data, setIsOpen });
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
          <Label htmlFor="title">Titulo</Label>
          <Input id="title" {...register("title")}></Input>
        </Section>
        <Section>
          <Label htmlFor="description">Descripcion</Label>
          <Input id="description" {...register("descripcion")}></Input>
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

export default NoticiasForm;
