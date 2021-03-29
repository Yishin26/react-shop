import React from 'react';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

class EditInventory extends React.Component {
    state = {
        name: '',
        price: '',
        tags: '',
        image: '',
        status: ''
    };
    componentDidMount() {
        const { id, name, image, tags, price, status } = this.props.product;
        this.setState({
            id,
            name,
            image,
            tags,
            price,
            status
        });
    }
    handleChange = e => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'price') {
            value = parseInt(value);
        }
        this.setState({
            [name]: value
        });
    };


    submit = e => {
        e.preventDefault();
        const product = {
            ...this.state
        };
        axios.put(`/products/${this.state.id}`, product).then(res => {
            this.props.close(res.data);
            toast.success('Edit Success');
        });
    };
    onDelete = () => {
        axios.delete(`/products/${this.state.id}`).then(res => {
            this.props.deleteProduct(this.state.id);
            this.props.close();
            toast.success('Delete Success');
        });
    };
    render() {
        return (
            <div className="inventory">
                <p className="title has-text-centered">Inventory</p>
                <br />
                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <textarea
                                value={this.state.name}
                                className="textarea"
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">price</label>
                            <input
                                type="number"
                                className="input"
                                name="price"
                                value={this.state.price}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input
                                type="text"
                                className="input"
                                name="tags"
                                value={this.state.tags}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input
                                type="text"
                                className="input"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" onChange={this.handleChange} value={this.state.status}>
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button
                                className="button is-danger"
                                type="button"
                                onClick={this.onDelete}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="control"></div>
                        <button className="button" type="button" onClick={() =>
                            this.props.close()}>Cancel</button>
                    </div>
                    {/* {<button
                    className="button is-primary"
                    type="button"
                    onClick={this.showToast}
                >
                    Show
                </button>} */}
                </form>
            </div>
        );
    }
}

export default EditInventory;