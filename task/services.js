import axios from "axios";

export const getMarvelCharactars = (value) => {
    return axios({
      method: "get",
      url: "https://gateway.marvel.com/v1/public/characters?apikey=6cc8993f6724fc4b9830a756970bcbeb",
    }).catch((error) => {
      console.log(error);
    });
  };