import React from "react";

const Header = () => {
  return (
    <div className="container mx-auto py-3 flex center gap-4">
      <a
        href="https://discord.com/invite/bozodao"
        target="_blank">
        <i className="text-black hover:text-primary transition-colors text-3xl bi bi-discord"></i>
      </a>
      <a
        href="https://twitter.com/BozoCollective"
        target="_blank">
        <i className="text-black hover:text-primary transition-colors text-2xl bi bi-twitter-x"></i>
      </a>
    </div>
  );
};

export default Header;
