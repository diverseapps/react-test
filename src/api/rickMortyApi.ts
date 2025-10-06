import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export const getCharacters = async (page: number) => {
  const res = await api.get(`/character?page=${page}`);
  return res.data;
};

export const getCharacterById = async (id: string) => {
  const res = await api.get(`/character/${id}`);
  return res.data;
};
