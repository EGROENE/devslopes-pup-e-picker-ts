// Method to fetch all dogs from dogs array in db.json:
export const getAllDogs = () => {
  return fetch("http://localhost:3000/dogs").then((response) => response.json());
};

export const deleteDog = (dogID: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`http://localhost:3000/dogs/${dogID}`, requestOptions);
};
