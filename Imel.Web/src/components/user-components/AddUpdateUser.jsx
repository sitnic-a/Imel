import { useState } from "react";
import { fetchLocationStateHook } from "../../custom/fetchLocationStateHook";
import { NewUser } from "./NewUser";

export const AddUpdateUser = () => {
  let { id } = fetchLocationStateHook();
  console.log("Id ", id);

  return <section>{id === undefined && <NewUser />}</section>;
};
