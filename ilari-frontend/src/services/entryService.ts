import axios from "axios";
import { Entry } from "../types";

const baseUrl = '/api/diaries';

export const getAll = () => {
  return axios
    .get<Entry[]>(baseUrl);
};