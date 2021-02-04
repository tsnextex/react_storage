import React from "react";

export default function NavLogo({ img = "", key = "logo" }) {
  return (
    <img className="logo" src={img} alt="SROA Logo" key={key} />
  );
}
