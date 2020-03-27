import React from 'react';

export default function Header({children}){ // Header(props){ para usar props.title
    return (
        <header>
            <h1>{children}</h1> 
        </header>
    );
}

//export default Header;