import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Ensure this path is correct
import './ProductList.css';
import CartItem from './CartItem';

const plantsArray = [
    {
        category: "Air Purifying Plants",
        plants: [
            {
                name: "Snake Plant",
                image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                description: "Produces oxygen at night, improving air quality.",
                cost: "$15"
            },
            {
                name: "Spider Plant",
                image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                description: "Filters formaldehyde and xylene from the air.",
                cost: "$12"
            }
        ]
    }
];

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
    const dispatch = useDispatch();

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true
        }));
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div>
                    <a href="#" onClick={() => setShowCart(false)}>Plants</a>
                    <a href="#" onClick={() => setShowCart(true)}>Cart</a>
                </div>
            </div>

            {/* Conditional Rendering */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category) => (
                        <div key={category.category}>
                            <h2>{category.category}</h2>
                            <div className="product-list">
                                {category.plants.map((plant) => (
                                    <div key={plant.name} className="product-card">
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <h3 className="product-title">{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p className="product-cost">{plant.cost}</p>
                                        <button
                                            className={`product-button ${addedToCart[plant.name] ? 'added' : ''}`}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
