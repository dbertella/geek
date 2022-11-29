// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BGGUPLOAD_URL } from "../../bggApis/newPlay";

type Data = {
  response: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await fetch(BGGUPLOAD_URL, {
      headers: {
        cookie: req.body.sessionCookie,
        "Content-Type": "application/json;charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        playid: req.body.playid,
        action: "delete",
        finalize: 1,
        B1: "Yes",
      }),
    });
    console.log({ body: req.body, response });
    res.status(200).json({ response });
  } catch (e) {
    console.log({ body: req.body, e });
    res.status(405).end();
  }
}
