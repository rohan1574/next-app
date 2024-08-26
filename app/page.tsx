"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../redux/slices/basketSlice";
import Link from "next/link";
import { RootState } from "../redux/store";
import { products } from "../assets/data/dummyData";
import { AlignJustify, LayoutGrid } from "lucide-react";
import Search from "@/components/Search";

const HomePage = () => {
  const dispatch = useDispatch();
  const itemsInBasket = useSelector((state: RootState) => state.basket.items);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleAddToBasket = (product: any) => {
    dispatch(addToBasket(product));
  };

  const genderOptions = ["male", "female"];
  const colorButtons = [
    "red",
    "green",
    "purple",
    "yellow",
    "orange",
    "blue",
    "black",
    "brown",
  ];
  const sizeButtons = ["S", "M", "L", "XL"];
  const typeButtons = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ];

  const handleClearFilters = () => {
    setSelectedType(null);
    setSelectedGender(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setMinPrice(0);
    setMaxPrice(100);
    setSearchTerm(""); // Clear search term
  };

  // Filter products based on selected filters and search term
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      matchesSearchTerm &&
      (selectedType ? product.type === selectedType : true) &&
      (selectedGender ? product.gender === selectedGender : true) &&
      (selectedColor ? product.color?.includes(selectedColor) : true) &&
      (selectedSize ? product.size?.includes(selectedSize) : true) &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
  });

  return (
    <div className="px-4 py-8 md:px-20 md:py-16">
      <h2 className="text-4xl font-bold p-4">Redux Toolkit</h2>
      <Search onSearch={setSearchTerm} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Gender Filter */}
        <div className="py-8">
          <label className="mr-4" htmlFor="gender-select">
            Gender:
          </label>
          <select
            id="gender-select"
            className="select select-accent w-full max-w-xs"
            value={selectedGender || ""}
            onChange={(e) => setSelectedGender(e.target.value || null)}
          >
            <option value="" disabled>
              Select Gender
            </option>
            {genderOptions.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div className="py-8">
          <label className="mr-4 text-lg font-semibold" htmlFor="size-select">
            Size:
          </label>
          <select
            id="size-select"
            className="select select-accent w-full max-w-xs"
            defaultValue=""
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="" disabled>
              Select Size
            </option>
            {sizeButtons.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="py-8">
          <label className="mr-4 text-lg font-semibold" htmlFor="color-select">
            Color:
          </label>
          <select
            id="color-select"
            className="select select-accent w-full max-w-xs"
            defaultValue=""
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="" disabled>
              Select Color
            </option>
            {colorButtons.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap items-center justify-center py-8 gap-4">
        {typeButtons.map((button, index) => (
          <div key={index} className="flex-shrink-0">
            <button
              className={`btn ${
                selectedType === button
                  ? "btn-secondary"
                  : "btn-outline btn-secondary"
              }`}
              onClick={() => setSelectedType(button)}
            >
              {button}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        {/* Price Range Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <label className="text-sm md:text-base">
              Min Price: ${minPrice}
            </label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="range [--range-shdw:yellow] w-full md:w-48"
            />
            <label className="text-sm md:text-base">
              Max Price: ${maxPrice}
            </label>
            <input
              type="range"
              min={minPrice}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="range [--range-shdw:yellow] w-full md:w-48"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="w-full md:w-auto">
          <button
            className="btn btn-outline btn-warning w-full md:w-auto"
            onClick={handleClearFilters}
          >
            Clear Filter
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          className={`p-2 rounded ${
            viewMode === "grid" ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid className="w-6 h-6" />
        </button>
        <button
          className={`p-2 rounded ${
            viewMode === "list" ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => setViewMode("list")}
        >
          <AlignJustify className="w-6 h-6" />
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
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-6"
          } p-4`}
        >
          {filteredProducts.map((product: any) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 ${
                viewMode === "list" ? "flex items-center gap-4" : ""
              }`}
            >
              {viewMode === "list" && (
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-24 h-24 object-cover mr-4"
                />
              )}
              <div
                className={`flex-1 ${
                  viewMode === "list" ? "flex flex-col" : ""
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {product.name}
                </h3>
                {viewMode === "list" && (
                  <>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {product.size} | {product.gender} | {product.color}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      ${product.price}
                    </p>
                  </>
                )}
              </div>
              {viewMode === "grid" && (
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {product.size} | {product.gender} | {product.color}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  ${product.price}
                </p>
              </>
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
