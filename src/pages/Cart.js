import React from 'react';
import Layout from '../components/Layout';
import CartItem from 'components/CartItem';
const Cart = props => {
    return (
        <Layout>
            <div className="cart-page">
                <p className="title has-text-centered">Cart Page</p>
                <div className="cart-list">
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="cart-total">
                    Total:
                <span className="total-price">￥2345</span>
                </div>
            </div>
        </Layout>
    );
};
export default Cart;