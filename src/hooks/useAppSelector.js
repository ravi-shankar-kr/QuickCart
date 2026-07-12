import { useSelector } from "react-redux";

export const useAppSelector = (selectorFn) => useSelector(selectorFn);
