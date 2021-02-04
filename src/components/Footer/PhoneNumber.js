import React from "react";
import CallIcon from "@material-ui/icons/Call";

export default function PhoneNumber({
  number = { display_text: "1-800-457-0000" },
  color = "#4A4A4A",
}) {
  return (
    <div className="phoneNumber">
      <a href={`tel:${number.display_text}`}>
        <CallIcon
          style={{
            color: color,
            position: "relative",
            top: "6px",
            marginRight: ".7em",
          }}
        />
      </a>
      <a
        style={{ color: color, textDecoration: "none" }}
        href={`tel:${number.display_text}`}
      >
        {number.display_text}
      </a>
    </div>
  );
}
