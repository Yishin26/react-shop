import React from 'react';
import { formatPrice } from '../commons/help';
class Product extends React.Component {
    render() {
        const { name, image, tags, price, status } = this.props.product;
        const _pClass = {
            unavailable: 'product out-stock',
            available: 'product'
            };
        return (
            <div className={_pClass[status]}>
                <div className="p-content">
                    <div className="img-wrapper">
                    <div className="out-stock-text">Out Of Stock</div>
                        <figure className="image is4by3">
                            <img src={image} alt={name} />
                        </figure>
                        <p className="p-tags">{tags}</p>
                        <p className="p-name">{name}</p>
                    </div>
                </div>

                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart" disabled={status === 'unavailable'}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation "></i>
                    </button>
                </div>
            </div>
        );
    }
}
export default Product;