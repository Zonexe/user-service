import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/database";
import "./models/User"; 

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully.",
    );

    // alter: true обновляет структуру таблицы, если мы что-то поменяем в модели
    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
