import React from "react";
import Hidden from "@material-ui/core/Hidden";
import SvgIcon from "@material-ui/core/SvgIcon";

export default function PhoneNumber({
  number = { display_text: "1-800-457-0000" },
}) {
  return (
    <div className="iconTextLink">
      <a className="phoneIcon" href={`tel:${number.display_text}`}>
        <SvgIcon viewBox="0 0 50 50">
          <g id="icons/general/phone" fill="#1B3C92">
            <path
              d="M46.3333333,34.3333333 C43,34.3333333 39.8,33.8 36.8133333,32.8133333 C35.88,32.52 34.84,32.7333333 34.0933333,33.48 L28.2266667,39.3466667 C20.68,35.5066667 14.4933333,29.32 10.6533333,21.7733333 L16.52,15.9066667 C17.2666667,15.16 17.48,14.12 17.1866667,13.1866667 C16.2,10.2 15.6666667,7 15.6666667,3.66666667 C15.6666667,2.2 14.4666667,1 13,1 L3.66666667,1 C2.2,1 1,2.2 1,3.66666667 C1,28.7066667 21.2933333,49 46.3333333,49 C47.8,49 49,47.8 49,46.3333333 L49,37 C49,35.5333333 47.8,34.3333333 46.3333333,34.3333333 L46.3333333,34.3333333 Z"
              id="Shape"
            ></path>
          </g>
        </SvgIcon>
      </a>
      <Hidden mdDown>
        <a className="phoneText" href={`tel:${number.display_text}`}>{number.display_text}</a>
      </Hidden>
    </div>
  );
}
