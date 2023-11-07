// Method to fetch all dogs from dogs array in db.json:
export const getAllDogs = () => {
  return fetch("http://localhost:3000/dogs").then((response) =>
    response.json()
  );
};
