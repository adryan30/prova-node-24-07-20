import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../db/entities/user.entity';

export async function checkIfUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.params;
  const repository = getRepository(User);
  const userExists = await repository.findOne(id);
  if (!userExists) {
    res.status(404).json({ error: 'Usuário não existe no banco' });
    return;
  }
  next();
}
