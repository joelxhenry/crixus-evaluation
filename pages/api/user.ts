// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkUser,
  signInOrRegister,
} from "../../app/controller/control.functions";
import {
  ResponseInterface,
  RequestHandleInterface,
} from "../../app/controller/control.functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseInterface>
) {
  const { method } = req;
  let response: RequestHandleInterface;

  switch (method) {
    case "GET":
      const {
        query: { username: name },
      } = req;
      response = await checkUser(name as string);
      res.status(response.status).json(response.data);
      break;

    case "POST":
      const { username, password } = JSON.parse(req.body);
      response = await signInOrRegister(username, password);
      res.status(response.status).json(response.data);
      
      break;

    default:
      res.status(405).json({ error: ["Error Not Allowed"] });
      break;
  }
}
