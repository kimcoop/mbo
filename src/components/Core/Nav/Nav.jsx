import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav as RSNav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap'

const Nav = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <RSNav>
            <Navbar>
                <NavbarBrand href="/">Minority Business Owners List</NavbarBrand>
            </Navbar>
        </RSNav>
    )
}

export default Nav
