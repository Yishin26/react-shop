import React from 'react';
import Header from 'components/Header';
const Layout = props => (
    <div className="main">
        <Header />
        {/* child component */}
        {props.children}
    </div>
);
export default Layout;