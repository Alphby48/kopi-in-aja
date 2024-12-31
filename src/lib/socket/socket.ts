import io from "socket.io-client";
const SOCKET_URL = "https://kopiinaja-zeta.vercel.app";
export const socket = io(SOCKET_URL, {
  path: "/api/socket",
  autoConnect: false, // Supaya tidak langsung connect
});
