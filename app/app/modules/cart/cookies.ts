import { createCookie } from "remix";

export const cartCookie = createCookie("cart", {
  path: "/",
});
