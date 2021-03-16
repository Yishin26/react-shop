import React, { Fragment } from "react";


class Login extends React.Component {

  //state
  state={
    isLike:false,
    count:0
  }

  //ref
  emailRef = React.createRef()
  passwordRef = React.createRef()

  handleSubmit = event => {
    //1.阻止默認事件行為
    event.preventDefault();
    //2.獲取表單數據
    const formData={
      email:this.emailRef.current.value,
      password:this.passwordRef.current.value
    }
    console.log(formData)
    

    //3.處理登入邏輯

    //4.跳轉首頁
    this.props.history.push('/')
  }

  handleClick =	()	=>	{
    this.setState({
        isLike:	!this.state.isLike
    });
    this.setState({
        count:	this.state.count + 1
    });
    this.setState(prevState =>	{
        return	{	count:	prevState.count + 2	};
    });
    console.log(this.state.count)
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
                <input className="input" type="email" placeholder="Email" ref={this.emailRef} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="Password" placeholder="Password" ref={this.passwordRef}/>
              </div>
            </div>
            <div className="control">
              <button className='button is-fullwidth is-primary'  >Login</button>
            </div>
          </form>
          <div className='control'>
            <button className="button	is-fullwidth is-link" onClick={this.handleClick}>
              {this.state.isLike?'NO':'😃'}
            </button>

          </div>
        </div>
      </Fragment>
    ); //JSX babel
  }
}

export default Login;
