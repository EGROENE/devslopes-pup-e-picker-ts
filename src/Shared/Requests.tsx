// Method to fetch all dogs from dogs array in db.json:
export const getAllDogs = (): Promise<any> => {
  return fetch("http://localhost:3000/dogs").then((response) => response.json());
};

export const deleteDog = (dogID: string): Promise<Response> => {
  var myHeaders = new Headers();
  myHeaders.append("Content-type", "application/json");

  return fetch(`http://localhost:3000/dogs/${dogID}`, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  });
};

export const addToFavorites = (dogID: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "isFavorite": true,
  });

  return fetch(`http://localhost:3000/dogs/${dogID}`, {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
};

export const removeFromFavorites = (dogID: string) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "isFavorite": false,
  });

  return fetch(`http://localhost:3000/dogs/${dogID}`, {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
};
