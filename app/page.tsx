"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../redux/slices/basketSlice";
import Link from "next/link";
import { RootState } from "../redux/store";
import { products } from "../assets/data/dummyData";

const HomePage = () => {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state: RootState) => state.basket.items);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);

  const handleAddToBasket = (product: any) => {
    dispatch(addToBasket(product));
  };

  const genderButtons = ["male", "female"];
  const colorButtons = ["red", "green", "purple", "yellow", "orange", "blue", "black", "brown"];
  const sizeButtons = ["S", "M", "L", "XL"];
  const typeButtons = ["Hoodies", "Dresses", "Suits", "Shoes", "T-Shirts", "Jeans", "Jackets", "Bags"];

  const handleClearFilters = () => {
    setSelectedType(null);
    setSelectedGender(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setMinPrice(0);
    setMaxPrice(100);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    return (
      (selectedType ? product.type === selectedType : true) &&
      (selectedGender ? product.gender === selectedGender : true) &&
      (selectedColor ? product.color?.includes(selectedColor) : true) &&
      (selectedSize ? product.size?.includes(selectedSize) : true) &&
      (product.price >= minPrice && product.price <= maxPrice)
    );
  });

  return (
    <div className="px-20 py-16">
      <h2 className="text-4xl font-bold p-4">Redux Toolkit</h2>

      {/* Gender Filter */}
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center">
          {genderButtons.map((item, index) => (
            <div key={index} className="mr-4">
              <button
                className={`btn ${selectedGender === item ? "btn-secondary" : "btn-outline btn-secondary"}`}
                onClick={() => setSelectedGender(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center">
          {sizeButtons.map((item, index) => (
            <div key={index} className="mr-4">
              <button
                className={`btn ${selectedSize === item ? "btn-secondary" : "btn-outline btn-secondary"}`}
                onClick={() => setSelectedSize(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center">
          {colorButtons.map((item, index) => (
            <div key={index} className="mr-4">
              <button
                className={`btn ${selectedColor === item ? "btn-secondary" : "btn-outline btn-secondary"}`}
                onClick={() => setSelectedColor(item)}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex items-center justify-center py-8">
        {typeButtons.map((button, index) => (
          <div key={index} className="mr-4">
            <button
              className={`btn ${selectedType === button ? "btn-secondary" : "btn-outline btn-secondary"}`}
              onClick={() => setSelectedType(button)}
            >
              {button}
            </button>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center">
          <label className="mr-4">Min Price: ${minPrice}</label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="range [--range-shdw:yellow] mr-4"
          />
          <label className="mr-4">Max Price: ${maxPrice}</label>
          <input
            type="range"
            min={minPrice}
            max={1000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range [--range-shdw:yellow]"
          />
        </div>
      </div>

      {/* clear filter */}

      <div className="py-4 flex justify-end">
        <button
          className="btn btn-outline btn-warning"
          onClick={handleClearFilters}
        >
          Clear Filter
        </button>
      </div>

      {/* Product Listing */}
      <div className="bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
          <h2>Products</h2>
          <Link
            className="bg-lime-600 hover:bg-red-500 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
            href="/cart"
          >
            View Cart ({itemsInBasket.length})
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-700 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {product.name}
              </h3>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {product.size}
              </h3>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {product.gender}
              </h3>
              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {product.color}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                ${product.price}
              </p>

              <button
                className="btn btn-outline btn-success"
                onClick={() => handleAddToBasket(product)}
              >
                Add to Basket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
