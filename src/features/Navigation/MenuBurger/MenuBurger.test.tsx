import { Link, MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import * as React from "react";
import MenuBurger from "./MenuBurger";

const mockHandleClickNavMenu = () => {};

const mockPages = [
  {
    title: <Link to="">{""}</Link>,
    pageURL: "",
  },
];

const mockSetAnchorElNav = () => {};

describe("MenuBurger", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MenuBurger
          handleClickNavMenu={mockHandleClickNavMenu}
          pages={mockPages}
          anchorElNav={null}
          setAnchorElNav={mockSetAnchorElNav}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
