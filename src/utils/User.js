export const getUser = () => JSON.parse(localStorage.getItem("usuario"));
export const doLogout = () => localStorage.removeItem("usuario");
