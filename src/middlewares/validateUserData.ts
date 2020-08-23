import { NextFunction, Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { User } from '../db/entities/user.entity';

export async function validateUserData(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { body } = req;
  const userData = new User();
  userData.name = body.name;
  userData.username = body.username;
  userData.email = body.email;
  validateOrReject(userData)
    .then(() => {
      next();
    })
    .catch((errors) => {
      return res
        .status(400)
        .json({ message: 'Informações incorretas ou insuficientes', errors });
    });
}
