import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function MenuButton({ label = "", options = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{
          border: '1px solid #1B3C92',
          paddingTop: "12px",
          paddingBottom: "12px",
          textTransform: "capitalize",
          color: "#1B3C92",
          fontFamily: "Montserrat",
          fontSize: "12px",
          fontWeight: "bold !important",
          letterSpacing: 0,
          lineHeight: "11px",
          textAlign: "center",
          width: "fill-available",
        }}
        fullWidth
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
      >
        <span style={{ fontWeight: '700' }}>{label}</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((x) => (
          <MenuItem onClick={handleClose}>{x}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
