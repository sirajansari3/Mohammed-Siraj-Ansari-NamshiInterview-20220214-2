import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import { getProducts } from './api'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    getProductsList = async () => {
        const res = await getProducts('');
        if (this.state.items.length === 0) {
            this.setState({ items: res });
        }
    }

    render() {
        this.getProductsList();
        console.log('https://fakestoreapi.com/products', this.state.items);
        let itemList = this.state.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img src={item.image} style={{ width: '300px', height: '300px' }} />
                    </div>
                    <div>
                        <span className="card-title">{item.title}</span>
                         <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
                         onClick={() => { this.handleClick(item.id) }}>
                             <i className="material-icons">add</i>
                             </span> 
                        
                    </div>
                    <div className="card-content">
                        <p>{item.description}</p>
                        <p><b>Price: {item.price}$</b></p>
                    </div>
                </div>

            )
        })

        return (
            <div className="container">
                {this.state.items.length === 0 && <h3 className="center">Loading items...</h3>}
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)