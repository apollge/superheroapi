import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Input from "~/modules/common/components/atoms/Input";
import Container from "~/modules/common/components/molecules/Container";
import useDebounceCallback from "~/modules/common/hooks/useDebounceCallback";
import {
  searchSuperHeroByName,
  type SearchSuperHeroByName,
} from "~/modules/superheroes/validations/superHeroSchema";

const SearchPage = () => {
  const superHeroNameRef = useRef<HTMLInputElement>(null);

  const [superHeroes, setSuperHeroes] = useState<SearchSuperHeroByName>();

  const onChange = async () => {
    const superHeroName = superHeroNameRef.current?.value;

    if (superHeroName) {
      if (!process.env.ACCESS_TOKEN) {
        console.log("!process.env.ACCESS_TOKEN");
        throw new Error("ACCESS_TOKEN is not defined");
      }

      try {
        const result = await fetch(`/api/superhero/?name=${superHeroName}`);

        const data = searchSuperHeroByName.parse(await result.json());

        setSuperHeroes(data);
      } catch (error) {
        console.error(error);
        setSuperHeroes(undefined);
      }
    }
  };

  const debouncedOnchange = useDebounceCallback(onChange);

  return (
    <section className="bg-gray-50">
      <Container>
        <Input
          placeholder="Search for a superhero"
          ref={superHeroNameRef}
          onChange={async () => {
            await debouncedOnchange();
          }}
        />

        {superHeroes?.results && (
          <>
            <h2 className="mt-8 text-2xl font-bold text-gray-900">
              Search Results: {superHeroes.results.length}
            </h2>

            <ul className="mt-4 flex flex-col space-y-4">
              {superHeroes.results.map((superHero) => (
                <li key={superHero.id}>
                  <Link href={`/profile/${superHero.id}`}>
                    <div className="flex items-center space-x-4">
                      <Image
                        alt={superHero.name}
                        src={superHero.image.url}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {superHero.name}
                        </h3>
                        <p className="text-gray-500">
                          {superHero.biography["full-name"]}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  );
};

export default SearchPage;
