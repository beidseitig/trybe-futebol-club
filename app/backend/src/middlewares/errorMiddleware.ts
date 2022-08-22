import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;
  switch (status) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    case 'SequelizeConnectionRefusedError':
      res.status(503).end();
      break;
    default:
      res.status(500).json({ message });
      break;
  }
};

export default errorMiddleware;
