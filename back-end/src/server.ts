import express from 'express';
import { Router, Request, Response } from 'express';
import cors from 'cors';

// Routes
import auth from './routes/auth';
import game from './routes/game';

// Database
import { sequelize } from './db';

const app = express();
const route = Router();

app.use(cors());
app.use(express.json());

route.get("/", (req: Request, res: Response) => {
    res.json({message: 'App is running...s'})
});

app.use(route);
app.use("/auth", auth);
app.use("/game", game)

sequelize.sync();
app.listen(3000, () => 'Servidor rodando na porta 3000');