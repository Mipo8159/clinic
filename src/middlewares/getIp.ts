import { NextFunction, Request, Response } from 'express';

const getIP = require('ipware')().get_ip;

// ip address
export default (req: Request, _: Response, next: NextFunction) => {
  const ipInfo = getIP(req);
  console.log(ipInfo);
  next();
};
