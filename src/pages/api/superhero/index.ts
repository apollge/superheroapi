import type { NextApiRequest, NextApiResponse } from "next";
import { SUPER_HERO_API_URL } from "~/modules/superheroes/constants/superHeroApiURL";
import { searchSuperHeroByName } from "~/modules/superheroes/validations/superHeroSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is not defined");
  }

  const { name } = req.query;

  if (typeof name !== "string") {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const url = `${SUPER_HERO_API_URL}/${process.env.ACCESS_TOKEN}/search/${name}`;
  const response = await fetch(url);

  const parsedResponse = searchSuperHeroByName.parse(await response.json());

  res.status(200).json(parsedResponse);
}
