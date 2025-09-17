import React from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import useWindowSize from "../hooks/useWindowSize";

const ResponsiveLayout = ({ children }) => {
  const { width } = useWindowSize();

  return width <= 900 ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  );
};

export default ResponsiveLayout;
