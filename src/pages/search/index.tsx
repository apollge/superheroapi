import { useRef } from "react";
import Input from "~/modules/common/atoms/Input";
import Container from "~/modules/common/molecules/Container";

const SearchPage = () => {
  const superHeroNameRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-gray-50">
      <Container>
        <Input placeholder="Search for a superhero" ref={superHeroNameRef} />
      </Container>
    </section>
  );
};

export default SearchPage;
