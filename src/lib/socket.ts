import { io, Socket } from "socket.io-client";

import { env } from "@/env";

let socketClient: Socket | null = null;

export const getSocketClient = () => {
  if (!socketClient) {
    console.log("[Socket] Creating new Socket.IO client", { url: env.NEXT_PUBLIC_API_WS_URL });

    socketClient = io(env.NEXT_PUBLIC_API_WS_URL, {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    // Connection event handlers
    socketClient.on("connect", () => {
      console.log("[Socket] Connected", { id: socketClient?.id });
    });

    socketClient.on("disconnect", (reason) => {
      console.warn("[Socket] Disconnected", { reason });
    });

    socketClient.on("connect_error", (error) => {
      // Handle different error object types
      const errorMsg =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : JSON.stringify(error);
      console.error("[Socket] Connection error", { error: errorMsg });
    });

    socketClient.on("error", (error) => {
      const errorMsg =
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : JSON.stringify(error);
      console.error("[Socket] Error event", { error: errorMsg });
    });

    // Add universal event listener to debug all incoming events
    socketClient.onAny((event, ...args) => {
      if (event !== "ping" && event !== "pong" && event !== "noop" && !event.startsWith("_")) {
        console.log("[Socket] Event received", { event, payload: args });
      }
    });
  }

  return socketClient;
};

export const disconnectSocketClient = () => {
  if (!socketClient) {
    return;
  }

  console.log("[Socket] Disconnecting socket client");
  socketClient.disconnect();
  socketClient = null;
};
