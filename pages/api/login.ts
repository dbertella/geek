// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import createHttpError from "http-errors";
import { loginToBgg } from "../../bggApis/newPlay";

type Data = {
  cookie: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sessionCookie = await loginToBgg(req.body);
  const cookies = new Cookies(req, res);

  // Set a cookie
  cookies.set("sessionCookie", sessionCookie, {
    httpOnly: true, // true by default
  });
  cookies.set("user", req.body.username, {
    httpOnly: true,
  });
  res.status(200).json({ cookie: sessionCookie, name: req.body.username });
}
