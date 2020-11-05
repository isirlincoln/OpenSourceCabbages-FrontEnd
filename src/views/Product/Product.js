import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  url,
  Title,
  Image,
  EachProduct,
  Description,
  Price,
  ProductName,
  Container,
} from '../../Global';
import styled from 'styled-components';
//Instead of passing in the product we need to create a new 
//object with a quanity to pass in as well.
export default function Product(props) {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({
    query: '',
    cart: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${url}/product`);
      setProducts(res.data);
    };
    fetchProducts();
    state.cart.push(localStorage.getItem('cart'));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const updateEventHandler = (event) => {
    let matching = [];
    for (let i in products) {
      if (
        products[i].productName
          .toLowerCase()
          .includes(state.query.toLowerCase())
      ) {
        matching.push(products[i]);
      }
    }
    setProducts(matching);
  };
  const resetPageHandler = (event) => {
    window.location.reload();
  };


  const handleCart = (product, quanity) => {

    const newCart = [product, quanity];
    const check = false;
    for( let i in state.cart){
      for(let x in product){
        if(state.cart[i] == product[x]){
          quanity++;
          localStorage.setItem('cart') == null;
          state.cart.push(newCart);
          check = true;
        }
      }
    }
    if(!check){
    state.cart.push(product,quanity);
    localStorage.setItem('cart', state.cart);
    }
    
  };

  const Stock = styled.section`
    float: right;
    padding: 10px;
    color: #aa2a31;
  `;

  return (
    
    <>
      <Container>
        <input
          name='query'
          placeholder='Search by Name'
          onChange={handleChange}
        />
        <br />
        <button type='submit' onClick={updateEventHandler}>
          Go!
        </button>
        <button onClick={resetPageHandler}>Clear Search!</button>
        <Title>Products Page</Title>
        {products.map((product, index) => (
          <EachProduct key={index}>
            <Image src={product.imageUrl} />
            <Description>{product.description}</Description>
            <Price>Price: {'$' + product.price}</Price>
            <Stock>{product.inventory} in Stock </Stock>
            <button onClick={() => handleCart(product.productId,1)}>
              Add to cart
            </button>
            <ProductName>{product.productName}</ProductName>
          </EachProduct>
        ))}
      </Container>
    </>
  );
}
