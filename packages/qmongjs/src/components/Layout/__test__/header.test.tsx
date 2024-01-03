import { render } from "@testing-library/react";

import { Header } from "../Header";

it("Header renders", async () => {
  const { container } = render(<Header />);

  expect(container).toMatchSnapshot();
});
