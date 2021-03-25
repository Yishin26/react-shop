import React from 'react';
import axios from 'commons/axios';
class AddInventory extends React.Component {
    state = {
        name: '',
        price: 0,
        tags: '',
        image: '',
        status: 'available'
    };
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
        console.log(product);
        axios.post('/products', product).then(res => {
            this.props.close(res.data);
            alert('Add Success');
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
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" onChange={this.handleChange}>
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
                        <div className="control"></div>
                        <button className="button" type="button" onClick={() =>
                            this.props.close()}>Cancel</button>
                    </div>
                </form>
            </div>

        )

    }
}

export default AddInventory;