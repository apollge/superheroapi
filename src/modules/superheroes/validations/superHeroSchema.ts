import { z } from "zod";

const imageSchema = z.object({
  url: z.string(),
});

const connectionsSchema = z.object({
  "group-affiliation": z.string(),
  relatives: z.string(),
});

const workSchema = z.object({
  occupation: z.string(),
  base: z.string(),
});

const appearanceSchema = z.object({
  gender: z.string(),
  race: z.string(),
  height: z.array(z.string()),
  weight: z.array(z.string()),
  "eye-color": z.string(),
  "hair-color": z.string(),
});

const biographySchema = z.object({
  "full-name": z.string(),
  "alter-egos": z.string(),
  aliases: z.array(z.string()),
  "place-of-birth": z.string(),
  "first-appearance": z.string(),
  publisher: z.string(),
  alignment: z.string(),
});

const powerstatsSchema = z.object({
  intelligence: z.string(),
  strength: z.string(),
  speed: z.string(),
  durability: z.string(),
  power: z.string(),
  combat: z.string(),
});

export const superHeroSchema = z.object({
  id: z.string(),
  name: z.string(),
  powerstats: powerstatsSchema,
  biography: biographySchema,
  appearance: appearanceSchema,
  work: workSchema,
  connections: connectionsSchema,
  image: imageSchema,
});

export type SuperHeroSchema = z.infer<typeof superHeroSchema>;

export const searchSuperHeroByName = z
  .object({
    response: z.string(),
    "results-for": z.string(),
    results: z.array(superHeroSchema),
  })
  .nullable();

export type SearchSuperHeroByName = z.infer<typeof searchSuperHeroByName>;
