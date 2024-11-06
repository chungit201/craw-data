import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { CronExpression } from '@nestjs/schedule';
import path from 'path';
import fs from 'fs';
import { addRow, authorize } from './configs';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/send', async (req: Request, res: Response) => {
  try {

  } catch (e: any) {
  }
});

function timer(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}


app.get('/generate', async (req: Request, res: Response) => {

  async function task(item: any, i: number) { // 3
    try {
      await timer(3000);
      console.log(`Task ${i} done!`);
      console.log('item[i]', item[i]);
      // await addRow(auth, [item[i].Name, item[i].Address,item[i].PhotoUrl, item[i].Phone])
    } catch (e) {
      console.log(e);
    }
  }

  const filePath = path.resolve('./data', 'data.json');
  const data: any[] = JSON.parse(fs.readFileSync(filePath) as any) ?? [];
  const storePath = path.resolve('./data', 'store.json');
  const dataStores = [];
  for (const stores of data) {
    for (const item of stores) {
      dataStores.push({ name: item.Name, address: item.Address, image:item.PhotoUrl,phone:item.Phone });
    }
  }
  fs.writeFile(storePath, JSON.stringify(dataStores), (err) => {
    if (err) console.log('Error writing file:', err);
  });

  // page 11
  // const data: any[] = JSON.parse(fs.readFileSync(filePath) as any) ?? [];
  // console.log('data', data.length)
  // const auth = await authorize();
  //
  //
  // for(const item of data) {
  //   for(let i = 0; i < item.length; i++){
  //     await task(item,i)
  //
  //   }
  // }
  res.status(200).json({ mess: 'oki' });
});

app.listen(port, () => {
  const task = cron.schedule(CronExpression.EVERY_SECOND, () => {

  }, {
    scheduled: false,
  });

  if (process.env['IS_START_JOB'] === 'true') {
    task.start();
  } else {
    task.stop();
  }
  console.log(`[server]: Server is running at http://localhost:${port}`);
});