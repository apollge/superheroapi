import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import type { FC } from "react";
import Container from "~/modules/common/components/molecules/Container";
import { SUPER_HERO_API_URL } from "~/modules/superheroes/constants/superHeroApiURL";
import {
  superHeroSchema,
  type SuperHeroSchema,
} from "~/modules/superheroes/validations/superHeroSchema";

const Info: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <p className="text-gray-900">
      {label}: {value}
    </p>
  );
};

const ProfilePage: NextPage<{ character: SuperHeroSchema }> = ({
  character,
}) => {
  return (
    <Container>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-4">
          <Image
            alt={character.name}
            src={character.image.url}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full"
          />
          <h1 className="text-4xl font-bold text-gray-900">{character.name}</h1>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Biography</h2>

          <div className="flex flex-col space-y-2">
            <Info label="Full Name" value={character.biography["full-name"]} />
            <Info
              label="Alter Egos"
              value={character.biography["alter-egos"]}
            />
            <Info
              label="Aliases"
              value={character.biography.aliases.join(", ")}
            />
            <Info
              label="Place of Birth"
              value={character.biography["place-of-birth"]}
            />
            <Info label="Publisher" value={character.biography.publisher} />
            <Info label="Alignment" value={character.biography.alignment} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Check if the ACCESS_TOKEN is defined
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is not defined");
  }

  const { id } = query;

  // Check if id is of type string
  if (typeof id !== "string") {
    throw new Error("id is not of type string");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await (
    await fetch(`${SUPER_HERO_API_URL}/${process.env.ACCESS_TOKEN}/${id}`)
  ).json();

  return {
    props: {
      character: superHeroSchema.parse(response),
    },
  };
};

export default ProfilePage;
