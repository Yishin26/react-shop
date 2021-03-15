import React from "react";

const Header = (props) => {
    return (
        <div className='header'>
            <div className="header">
                <div className="grid">
                    <div className="start">
                        <a href="/">HOME</a>
                    </div>
                    <div className="end">
                        {props.nickname ? (
                            <span className='nickname'>
                                <i className='far fa-user'></i>
                                {props.nickname}</span>
                        ) : (
                                <React.Fragment>
                                    <a href="/">Login</a>
                                    <a href="/">Register</a>
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}




export default Header;
