import { AddToCartData } from "./AddToCartData";

export interface CheckoutData {
  items: AddToCartData[];
  total: number;
  date: Date;
}
