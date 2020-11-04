import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { url, Title, Image } from "../../Global";
import styled from "styled-components";

export default function Product(props) {
  const [products, setProducts] = useState([]);{
    const [state, setState] = useState({
      query: ""
   });
   const handleChange = (e) => {
    const value = e.target.value;
    setState({
       ...state,
       [e.target.name]: value,
    });
 };

    useEffect(() => {
      const fetchProducts = async () => {
        const res = await axios.get(`${url}/product`);
        setProducts(res.data);
      };
      fetchProducts();
    },
    []);
    const updateEventHandler = event =>{
      let matching = [];
      for(let i in products){
        if(products[i].productName
          .toLowerCase()
          .includes(state.query.toLowerCase())){
          matching.push(products[i]);
        }
      }
      setProducts(matching);
    }
    const resetPageHandler = event =>{
      window.location.reload()
    }
  
  
  const Container = styled.div`
    padding: 20px;
    margin: 20px;
  `;

  const EachProduct = styled.div`
    background-color: #94d1ab;
    box-shadow: 0 14px 26px -10px rgba(51, 51, 51, 0.4),
      0 4px 23px 0px rgba(0, 0, 0, 0.12), 2px 8px 10px 1px rgba(51, 51, 51, 0.4);
    padding: 5px;
    margin: 20px;
  `;

  const Description = styled.section`
    display: inline-block;
    width: 700px;
    text-align: center;
  `;

  const Stock = styled.section`
    float: right;
    padding: 10px 50px;
    color: #632c6b;
  `;

  const CartLink = styled.p`
    float: right;
    padding: 10px;
  `;

  const ProductName = styled.p`
    padding: 5px;
    display: block;
  `;

  return (
    
    <>
      <Title>Products Page</Title>
      <div>
      <input
      name="query"
      placeholder="Search by Name"
      onChange={handleChange} /><br/>
      <button type="submit" onClick={updateEventHandler}>Go!</button>
      <button onClick={resetPageHandler}>Clear Search!</button>
      </div>
      <Container>
        {products.map((product) => (
          <EachProduct key={product.productId}>
            <Image src={product.imageUrl} />
            <Description>{product.description}</Description>
            Price: {"$" + product.price}
            <Stock>{product.inventory} in Stock </Stock>
            <CartLink>
              <Link to="/cart">Add to cart</Link>
            </CartLink>
            <ProductName>{product.productName}</ProductName>
          </EachProduct>
        ))}
      </Container>
    </>
  );
  }
}