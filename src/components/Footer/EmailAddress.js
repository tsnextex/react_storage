import React from "react";
import MailIcon from "@material-ui/icons/Mail";

export default function EmailAddress({
  email = { display_text: "contact@sroa.com" },
  color = "#4A4A4A",
}) {
  return (
    <div className="emailAddress">
      <a href={`mailto:${email.display_text}`}>
        <MailIcon
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
        href={`mailto:${email.display_text}`}
      >
        {email.display_text}
      </a>
    </div>
  );
}
