import http, { Server } from "http";
import app from "./app";
import { envVariables } from "./app/config/env";
import db from "./db/knex";





let server: Server | null = null;

const port = envVariables.PORT;
const connectToDB = async () => {
  try {
    await db.raw("SELECT 1").timeout(5000, { cancel: true });
    console.log("✅ PostgreSQL Database Connected");
  } catch (err) {
    console.error("❌ Database Connection Failed", err);
    process.exit(1);
  }
};
const startServer = async () => {
  try {
    server = http.createServer(app);
    server.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
};

/**

 * @param {string} signal 
 */
async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log("✅ HTTP server closed.");

      try {
        console.log("Server shutdown complete.");
      } catch (error) {
        console.error("❌Error during shutdown:", error);
      }

      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

(async () => {
  
  await connectToDB()
  await startServer();
})();
