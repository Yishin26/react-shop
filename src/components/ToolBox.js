import React from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify'

//默认情况下必须经过路路由匹配渲染的组件才存在this.props,才拥有路路由参数
//使⽤用withRouter就可以给此未经过路路由匹配渲染的组件传⼊入路路由参数

class ToolBox extends React.Component {
    state = {
        searchText: ''
    }
    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        this.props.search(value);
    };
    clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        this.props.search('');
    };
    goCart = () => {
        if (!global.auth.isLogin()) {
            this.props.history.push('/login');
            toast.info('Please Login First');
            return;
        }
        this.props.history.push('/cart');
    };
    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">Store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input
                                type="text"
                                className="input search-input"
                                placeholder="Search Product"
                                value={this.state.searchText}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                <div className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
        )
    }
}
export default withRouter(ToolBox);