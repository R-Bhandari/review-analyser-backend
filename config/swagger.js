import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Review Analyser API Documentation",
      version: "1.0.0",
      description: "Auto-generated API documentation for the Review Analyser backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  // Scan all route files automatically
  apis: ["./src/modules/**/*.js"],
};

export const swaggerSpec = swaggerJsDoc(options);
export { swaggerUi };
