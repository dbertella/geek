// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";
import createHttpError from "http-errors";
import { loginToBgg } from "../../bggApis/newPlay";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sessionCookie = await loginToBgg(req.body);
  const cookies = new Cookies(req, res);

  // Set a cookie
  cookies.set("SessionID", sessionCookie.SessionID, {
    httpOnly: true, // true by default
  });
  cookies.set("bggusername", sessionCookie.bggusername, {
    httpOnly: true,
  });
  cookies.set("bggpassword", sessionCookie.bggpassword, {
    httpOnly: true,
  });
  res.status(200).json({ name: req.body.username });
}
