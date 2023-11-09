import { newDogCharacteristics } from "../types";

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

export const addToFavorites = (id: number): Promise<Response> => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "isFavorite": true,
  });

  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
};

export const removeFromFavorites = (id: number): Promise<Response> => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "isFavorite": false,
  });

  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
};

export const createDog = (
  newDogCharacteristics: newDogCharacteristics
): Promise<Response> => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": newDogCharacteristics.newDogName,
    "image": newDogCharacteristics.newDogImage,
    "description": newDogCharacteristics.newDogDescription,
    "id": 0,
  });

  return fetch("http://localhost:3000/dogs?Content-Type=application/json", {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  });
};
