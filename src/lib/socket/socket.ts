import io from "socket.io-client";
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const socket = io(SOCKET_URL, {
  path: "/api/socket",
  autoConnect: false, // Supaya tidak langsung connect
});
