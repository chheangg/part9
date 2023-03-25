import axios from "axios";
import { Entry, NewEntry } from "../types";

const baseUrl = '/api/diaries';

export const getAll = () => {
  return axios
    .get<Entry[]>(baseUrl);
};

export const createEntry = (entry: NewEntry) => {
  return axios
    .post<Entry>(baseUrl, entry);
};