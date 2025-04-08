import { useLocation } from "react-router-dom";

export const fetchLocationStateHook = () => {
  let location = useLocation();
  return location.state;
};
