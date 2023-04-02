import { useRef } from "react";
import Input from "~/modules/common/components/atoms/Input";
import Container from "~/modules/common/components/molecules/Container";
import useDebounceCallback from "~/modules/common/hooks/useDebounceCallback";

const SearchPage = () => {
  const superHeroNameRef = useRef<HTMLInputElement>(null);

  const onChange = () => {
    console.log(superHeroNameRef.current?.value);
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
      </Container>
    </section>
  );
};

export default SearchPage;
