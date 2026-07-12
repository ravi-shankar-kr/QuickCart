import { USD_TO_INR } from "../constants/api";

export const toINR = (usdPrice) => Math.round(usdPrice * USD_TO_INR);

export const formatPrice = (usdPrice) => {
  const inr = toINR(usdPrice);
  return `₹${inr.toLocaleString("en-IN")}`;
};
