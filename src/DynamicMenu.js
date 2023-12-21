import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import './DynamicMenu.css';

const DynamicMenu = () => {
  const menuItems = useMemo(() => ['HOME', 'ELECTRONICS', 'BOOKS', 'MUSIC', 'MOVIES', 'CLOTHING', 'GAMES'], []); //main menu items
  const moreOptions = useMemo(() => ['FURNITURE', 'ELECTRONICS', 'TRAVEL', 'BOTANICAL', 'CATEGORY NAME'], []); //dropdown items
  const itemsToRender = useMemo(() => [...menuItems, ...moreOptions], [menuItems, moreOptions]); //dynamic array


  const [openMoreOptions, setOpenMoreOptions] = useState(false); //tracking whether the dropdown menu is currently open or closed.
  const [selectedItem, setSelectedItem] = useState(null); // track of the currently selected menu item
  const [windowWidth, setWindowWidth] = useState(window.screen.width); // tracking the width of the browser window.

  //  callback function for toggling the visibility of the dropdown menu
  const toggleMoreOptions = useCallback((item) => {
    setSelectedItem(item);
    setOpenMoreOptions(true); 
  }, []);

  const dropdownRef = useRef(null); //used later to check whether a click event occurs outside the dropdown 

  // function to close the dropdown menu if the click occurs outside the dropdown area. 
  const closeDropdownOnOutsideClick = useCallback(
    (event) => {
      if (openMoreOptions && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMoreOptions(false);
        setSelectedItem(null);
      }
    },
    [openMoreOptions]
  );

  
  // hook  for updating the windowWidth's state whenever the window is resized. 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.screen.width); // function to set windowWidth's value as current window width.
    };

    window.addEventListener('resize', handleResize); //when window width changes, handleResize function is called.

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // ads and removes a global click event listener to detect clicks outside a dropdown menu
  useEffect(() => {
    document.addEventListener('click', closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener('click', closeDropdownOnOutsideClick);
    };
  }, [closeDropdownOnOutsideClick, openMoreOptions]);


  return (
    <div className="dynamic-menu">
      <nav>
        <div className="logo-container">
          <img
            src="https://images.unsplash.com/photo-1484597353563-eda230e1a15c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGluZSUyMHBhdHRlcm5zJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
            className="logo"
          />
          <span className="logo-text">E-COMM</span>
        </div>

        <div className="items menu-container">
        {windowWidth > 768 && (
            <ul className="menu-container">
              {menuItems.map((item, index) => (
                <li key={index} onClick={() => toggleMoreOptions(item)}>
                  {item}
                  
                </li>
              ))}
            </ul>
        )}
        </div>

        <div className="dropdown-container" onClick={() => toggleMoreOptions(selectedItem)} ref={dropdownRef}>
          <div className="dropdown-main-text">MORE</div>
          <Icon icon="bi:chevron-down" className="dropdown-icon" />

          <ul className={`dropdown-list ${openMoreOptions ? 'visible' : ''}`}>
            {windowWidth <= 768
              ? itemsToRender.map((item, index) => (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); // stoppping event propagation for tick icon's rendering
                      toggleMoreOptions(item);
                    }}
                    className={`dropdown-list-item ${selectedItem === item ? 'selected' : ''}`}
                  >
                    {item}
                    {selectedItem === item && <Icon icon="mdi:tick" className="tick-icon" />}
                  </li>
                ))
              : moreOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleMoreOptions(option);
                    }}
                    className={`dropdown-list-item ${selectedItem === option ? 'selected' : ''}`}
                  >
                    {option}
                    {selectedItem === option && <Icon icon="mdi:tick" className="tick-icon" />}
                  </li>
                ))}
          </ul>
        </div>

         <div className="search">
          <Icon icon="bi:search" className="search-icon" />
          <input type="text" placeholder="Search Something" className="search-box" />
        </div> 


      </nav>
    </div>
  );
};

export default DynamicMenu;