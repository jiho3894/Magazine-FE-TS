import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { instance } from "../services/axios";
import { getDetail, getProfile } from "./interface";

export const getTestData = () => {
  return useQuery<getProfile>("getTest", () => {
    return axios.get("https://reqres.in/api/users");
  });
};

// export const getTestDateDetail = (id: number) => {
//   return useQuery<getDetail>("getTestDetail", () => {
//     return axios.get(`https://reqres.in/api/users/${id}`);
//   });
// };

export const getTestDetail = async (id: number) => {
  const response = await axios.get<getDetail>(
    `https://reqres.in/api/users/${id}`
  );
  return response.data;
};

export const postSignups = async () => {
  const response = await instance.post("/user/login");
  return response.data;
};

export const postSignup = () => {
  return useMutation((signup) => {
    return instance.post("/user/login", signup);
  });
};

// export const getData = () => {
//   return useQuery("getData", async () => {
//     return await instance.get("/api/post");
//   });
// };
