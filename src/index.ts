import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import {CronExpression} from '@nestjs/schedule';
import path from "path";
import fs from "fs";
import {addRow, authorize} from "./configs";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get('/send', async (req: Request, res: Response) => {
  try {

  } catch (e: any) {
  }
});

app.get('/generate', async (req: Request, res: Response) => {
  const filePath = path.resolve('./data', 'data.json');
  // page 11
  const data: any[] = JSON.parse(fs.readFileSync(filePath) as any) ?? [];
  console.log('data', data.length)
  const auth = await authorize();
  for(const item of data) {
    for(let i = 0; i < item.length; i++){
       new Promise(resolve => setTimeout(resolve, 2000));
      await addRow(auth, [item[i].Name, item[i].Address,item[i].PhotoUrl, item[i].Phone])
    }
  }
  res.status(200).json({mess:'oki'});
});

app.listen(port, () => {
  const task = cron.schedule(CronExpression.EVERY_SECOND, () => {

  }, {
    scheduled: false
  });

  if (process.env["IS_START_JOB"] === 'true') {
    task.start();
  } else {
    task.stop()
  }
  console.log(`[server]: Server is running at http://localhost:${port}`);
});