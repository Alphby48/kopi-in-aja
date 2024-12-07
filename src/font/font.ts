import { Poppins } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { Lora } from "next/font/google";
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
