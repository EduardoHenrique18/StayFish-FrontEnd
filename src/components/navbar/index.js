import React from 'react';



const Navbar = ({ title }) => (
 <div className="float-left fixed-top">
 <Navbar color="light" light expand="md">
   <NavbarBrand href="/">{title}</NavbarBrand>
   <NavbarToggler onClick={this.toggle} />
   <Collapse isOpen={this.isOpen} navbar>
     <Nav className="ml-auto" navbar>
       <NavItem>
         <NavLink href="/"></NavLink>
       </NavItem>
       <UncontrolledDropdown nav inNavbar>
         <DropdownToggle nav caret>
           Logout
     </DropdownToggle>
         <DropdownMenu right>
           <DropdownItem />
           <DropdownItem>
             Sair
       </DropdownItem>
         </DropdownMenu>
       </UncontrolledDropdown>
     </Nav>
   </Collapse>
 </Navbar>
</div>
);