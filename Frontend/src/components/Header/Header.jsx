import React from "react";
import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";
import useWindowSize from "../../hooks/useWindowSize";

const Header = ({ onMenuClick }) => {
  const { width } = useWindowSize();

  if (width <= 900) {
    return <HeaderMobile onMenuClick={onMenuClick} />;
  }

  return <HeaderDesktop />;
};

export default Header;
