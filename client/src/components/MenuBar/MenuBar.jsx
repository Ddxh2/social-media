import React, { useContext, useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const pathname = window.location.pathname;
    const path = pathname === "/" ? "home" : pathname.substr(1);
    setActiveItem(path);
  }, []);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary size='massive' color='teal'>
      {!!user ? (
        <>
          <Menu.Item name='Home' active as={Link} to='/' />
          <Menu.Menu position='right'>
            <Menu.Item name='Logout' onClick={logout} />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item
            name='home'
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to='/'
          />
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
