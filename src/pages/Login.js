import React, { Fragment } from "react";


class Login extends React.Component {

  //state
  state = {
    email:'',
    password:''
  }

 
  handleSubmit = event => {
    //1.阻止默認事件行為
    event.preventDefault();
    //2.獲取表單數據
    const formData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(formData)


    //3.處理登入邏輯

    //4.跳轉首頁
    this.props.history.push('/')
  }

  
  handleChange = e => {
   this.setState({
     [e.target.name]:	e.target.value.toUpperCase()
   })
  };


  render() {
    //const title = "Login Component";
    return (
      <Fragment>
        {/*並列元素用Fragment */}
        <div className='login-wrapper'>
          {/*<p>{title}</p>*/}
          <form className="box" onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="Email" value={this.state.email} 	name="email"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="Password" placeholder="Password" value={this.state.password} 	name="password"
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="control">
              <button className='button is-fullwidth is-primary'  >Login</button>
            </div>
          </form>
         
        </div>
      </Fragment>
    ); //JSX babel
  }
}

export default Login;
