import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import { Context } from '../../Context/Context'

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("https://myshopbackend-iou3.onrender.com/allorders")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const fetchProduct = async () => {
    await fetch("https://myshopbackend-iou3.onrender.com/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchInfo();
  }, []);

  // return (
  //   <div className="dashboard">
  //     <div className="cartitems-main-container">
  //       <p>Products</p>
  //       <p>Title</p>
  //       <p>User</p>
  //       <p>Quantity</p>
  //       <p>Adress</p>
  //       <p>Done</p>
  //     </div>
  //     <hr />
  //     {allOrderName.map((order) => {
  //       Object.values(order.cartData).map((productId, quantity) => {
  //         if (quantity > 0) {
  //           const productIdNum = parseInt(productId); // Convert productId to number if needed
  //           const goitem = allproduct.find(
  //             (product) => product.id === productIdNum
  //           );
  //           if (!goitem) return null;
  //           return (
  //             <div key={quantity}>
  //               <img src={goitem.image} alt="" />
  //               <p>{goitem.name}</p>
  //               <p>{order.name}</p>
  //               <p>{quantity}</p>
  //               <p>Adress</p>
  //               <p>Status</p>
  //             </div>
  //           );
  //         }
  //       });
  //     })}
  //   </div>
  // );
  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  return (
    <div className="dashboard">
      <div className="cartitems-main-container">
        <p>User</p>
        <p>Products</p>
        <p>Title</p>
        <p>Quantity</p>
        <p>Address</p>
        <p>Status</p>
      </div>
      <hr />
      <div className="down-main-took-container">
        {users.map((user) => (
          <div key={user.id} className="new-container-items">
            <p>{user.name}</p>
            <div className="beforeproductlist">
              {Object.entries(user.cartData).map(([productId, quantity]) => {
                const product = getProductById(parseInt(productId));
                if (product && quantity > 0) {
                  return (
                    <div
                      className="product-item-main-container"
                      key={productId}
                    >
                      <img src={product.image} alt={product.name} />
                      <p>{product.name}</p>
                      <p>{quantity}</p>
                      <p>Address</p>
                      <p>Ready to ship</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
