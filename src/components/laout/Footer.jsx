import React from "react";
import Container from "../common/Container";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="flex h-16 items-center justify-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} QuickCart. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;