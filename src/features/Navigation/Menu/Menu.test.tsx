import { Link, MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import AppMenu from "./Menu";
import * as React from "react";

const mockHandleClickNavMenu = () => {};

const mockPages = [
  {
    title: <Link to="">{""}</Link>,
    pageURL: "",
  },
];

describe("Menu", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AppMenu
          handleClickNavMenu={mockHandleClickNavMenu}
          pages={mockPages}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
