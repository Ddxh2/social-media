import React, { useContext, useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("home");

  const updateActiveItem = (newActiveItem) => setActiveItem(newActiveItem);

  useEffect(() => {
    const pathname = window.location.pathname;
    const path =
      pathname === "/"
        ? "home"
        : pathname.substr(1).startsWith("user")
        ? "profile"
        : pathname.substr(1);
    if (path !== activeItem) {
      updateActiveItem(path);
    }
  });

  const handleItemClick = (_, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      {!!user ? (
        <>
          <Menu.Item
            name='profile'
            active={activeItem === "profile"}
            onClick={handleItemClick}
            as={Link}
            to={`/user/${user.username}`}
          />
          <Menu.Menu position='right'>
            <Menu.Item name='Logout' onClick={logout} />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === "login"}
              onClick={handleItemClick}
              as={Link}
              to='/login'
            />
            <Menu.Item
              name='register'
              active={activeItem === "register"}
              onClick={handleItemClick}
              as={Link}
              to='/register'
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default MenuBar;
