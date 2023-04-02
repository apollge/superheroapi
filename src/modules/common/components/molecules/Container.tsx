import { type FC, type PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:h-screen">
      <div className="mx-auto max-w-xl">{children}</div>
    </div>
  );
};

export default Container;
