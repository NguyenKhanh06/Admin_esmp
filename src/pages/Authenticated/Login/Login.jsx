import { Button, TextField } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../AccountSlice";
import Swal from "sweetalert2";
import accountApi from "~/assets/API/accountAPI";
import StorageKeys from "~/constants/storage-keys";

function Login({ reload }) {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      pasword: "",
    },
  });

  const submitForm = async (values) => {
    console.log("values: ", values);
    try {
      const action = login(values);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
      // const data = await accountApi.login(values);

      // localStorage.setItem(StorageKeys.TOKEN, data.data.token)
      // localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(data.data))

      // await Swal.fire(
      //   "Login successfully",
      //   "Click button to continute!",
      //   "success"
      // );
      reload();
    } catch (error) {
      console.log("failed to login: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something go wrong",
      });
    }
  };

  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <TextField
          {...register("email")}
          autoComplete="off"
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <TextField
          {...register("pasword")}
          autoComplete="off"
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          sx={{ width: "50%", padding: 0 }}
        />
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}

export default Login;
