import React from "react";
import Navbar from "./Navbar";
import NavDrawer from "./NavDrawer";

export default function AppHeader(props) {

  const {
    nav,
    loggedIn,
    currentUser,
    setCurrentUser,
    footerItems,
    searchByState,
    setSearching
  } = props;

  const [drawerOpen, toggleDrawer] = React.useState(false);
  const [activeSublist, setSublist] = React.useState("");

  const onListHeaderTap = (x) =>
    activeSublist === x ? setSublist("") : setSublist(x);

  const onListItemTap = (x) => {
    onListHeaderTap(x);
    onBurgerTap();
  };

  const onBurgerTap = () => toggleDrawer(!drawerOpen);

  return (
    <div className="headerContainer">
      <Navbar
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        setSearching={setSearching}
        items={nav}
        toggleDrawer={onBurgerTap}
        loggedIn={loggedIn}
      />

      <NavDrawer
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        items={nav}
        footerItems={footerItems}
        open={drawerOpen}
        toggle={onBurgerTap}
        activeSublist={activeSublist}
        onListHeaderTap={onListHeaderTap}
        onListItemTap={onListItemTap}
        searchByState={searchByState}
      />
    </div>
  );
}
