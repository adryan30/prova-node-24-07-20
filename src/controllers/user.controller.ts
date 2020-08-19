import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../db/entities/user.entity';

class UserController {
  async index(_: Request, res: Response) {
    const repository = getRepository(User);
    const users = await repository.find();
    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const userData = req.body;
    const savedUser = await repository.save(userData);
    return res.status(201).json(savedUser);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const newUserData = req.body;
    const repository = getRepository(User);
    await repository.update(id, newUserData);
    return res.json({ message: 'Usuário atualizado com sucesso!' });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const repository = getRepository(User);
    await repository.delete(id);
    return res.json({ message: 'Usuário deletado com sucesso!' });
  }
}

export default new UserController();
