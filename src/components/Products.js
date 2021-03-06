
import React from 'react';
import axios from 'commons/axios';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import Panel from 'components/Panel'
import AddInventory from 'components/AddInventory'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Products extends React.Component {

    state = {
        products: [],
        sourceProducts: [],
        cartNum: 0
    }
    componentDidMount() {
        this.updateCartNum();
        let baseURL= process.env.REACT_APP_API_DOMAIN || 'http://localhost:3003';
        fetch(`${baseURL}/products`)
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     this.setState({
        //         products: data
        //     });
        // });
        axios.get('/products').then(response => {
            this.setState({
                products: response.data,
                sourceProducts: response.data
            });
        })
    }

    updateCartNum = async () => {
        const num = await this.initCartNum();
        this.setState({
            cartNum: num
        });
    };
    initCartNum = async () => {
        const user = global.auth.getUser() || {};
        const res = await axios.get(`/carts`, {
            params: {
                userId: user.email
            }
        });
        const carts = res.data || [];
        const cartNum = carts
            .map(c => c.mount)
            .reduce((accumulator, value) => accumulator + value, 0);
        return cartNum || 0;
    };



    //search
    search = text => {
        // 1. Get New Array
        let _products = [...this.state.sourceProducts];
        // 2. Filter New Array
        _products = _products.filter(p => {
            // name : Abcd text: ab ==> ['Ab']
            // text : '' ==> ["", "", "", "", ""]
            const matchArray = p.name.match(new RegExp(text, 'gi'));

            return !!matchArray;
        });
        //3.setState
        this.setState({
            products: _products
        });
    };
    // add
    toAdd = () => {
        Panel.open({
            component: AddInventory,
            callback: data => {
                if (data) {
                    this.add(data)
                }
            }
        });
    };

    add = product => {
        const _products = [...this.state.products];
        _products.push(product);
        const _sProducts = [...this.state.sourceProducts];
        _sProducts.push(product);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };
    update = product => {
        const _products = [...this.state.products];
        const _index = _products.findIndex(p => p.id === product.id);
        //拿到id替換商品
        _products.splice(_index, 1, product);
        const _sProducts = [...this.state.sourceProducts];
        const _sIndex = _sProducts.findIndex(p => p.id === product.id);
        _sProducts.splice(_sIndex, 1, product);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };
    delete = id => {
        const _products = this.state.products.filter(p => p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };
    render() {
        return (
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <div className="products">
                    <div className="columns is-multiline is-desktop">
                        <TransitionGroup component={null}>
                            {this.state.products.map(p => (
                                <CSSTransition
                                    classNames="product-fade"
                                    timeout={300}
                                    key={p.id}
                                >
                                    <div className="column is-3" key={p.id}>
                                        <Product product={p} update={this.update} delete={this.delete} updateCartNum={this.updateCartNum} />
                                    </div></CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    {/* add */}
                    {(global.auth.getUser() || {}).type === 1 && (
                        <button className="button is-primary add-btn" onClick={this.toAdd}>
                            add
                        </button>)}
                </div>
            </div>
        )
    }
}

export default Products;