// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { uploadToBgg } from "../../bggApis/newPlay";

type Data = {
  response: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await uploadToBgg(req.body);
  if (response.error) {
    res.status(500).json({ response });
  } else {
    res.status(200).json({ response });
  }
}
