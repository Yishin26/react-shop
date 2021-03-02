import React, { Fragment } from "react";

class Login extends React.Component {
  render() {
    //const title = "Login Component";
    return (
      <Fragment>
        {/*並列元素用Fragment */}
        <div className='login-wrapper'>
        {/*<p>{title}</p>*/}
        <form className="box">
           
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input"  type="Password" placeholder="Password" />
            </div>
          </div>
          <div className="control">
            <button className='button is-fullwidth is-primary' >Login</button>
          </div>
        </form>
        </div>
      </Fragment>
    ); //JSX babel
  }
}

export default Login;
