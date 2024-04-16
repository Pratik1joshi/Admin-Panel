import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setimage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setimage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("https://myshopbackend-iou3.onrender.com/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("https://myshopbackend-iou3.onrender.com/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-item-name">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          id=""
          placeholder="Product Name"
        />
      </div>
      <div className="addproduct-item-price">
        <div className="item-price-old">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            id=""
            placeholder="Price"
          />
        </div>
        <div className="item-price-offer">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            id=""
            placeholder="Offer Price"
          />
        </div>
      </div>
      <div className="addproduct-item-category">
        <p>Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          className="addproduct-category-select"
          name="category"
          id=""
        >
          <option value="kid">Kid</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>
      </div>
      <div className="addproduct-addimage">
        <label htmlFor="file-input">
          <img
            className="addproduct-add-image-area"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
        <button
          onClick={() => {
            addProduct();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
