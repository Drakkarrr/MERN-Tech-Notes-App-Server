import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs, { promises } from 'fs';
import path from 'path';

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsFolderPath = path.join(process.cwd(), 'src/logs');
    const logFilePath = path.join(logsFolderPath, logFileName);

    if (!fs.existsSync(logsFolderPath)) {
      await promises.mkdir(logsFolderPath);
    }

    await promises.appendFile(logFilePath, logItem);
  } catch (error) {
    console.log(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  console.log(`${req.method}, ${req.path}`);
  next();
};

export default { logger, logEvents };
