"use client"
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
      
      {/* Filters and other UI components */}
      
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
