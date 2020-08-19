import { Request, Response } from 'express';

class UserController {
  async index(_: Request, res: Response) {
    return res.json({ message: 'ok' });
  }

  store(req: Request, res: Response) {
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
