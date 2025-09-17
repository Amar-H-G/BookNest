import React from "react";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";
import MobileScreenFooter from "./MobileScreenFooter";
import useWindowSize from "../../hooks/useWindowSize";

const Footer = ({ onMenuClick }) => {
  const { width } = useWindowSize();

  // For mobile screens (width <= 900px)
  if (width <= 900) {
    return <MobileFooter />;
  }

  // For desktop screens
  return <DesktopFooter />;
};

export default Footer;
