export const getFullName = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  return `${firstName} ${lastName}`;
};
