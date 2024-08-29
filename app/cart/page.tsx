"use client";

import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { RootState } from '@/redux/store';
import { decrementQuantity, incrementQuantity, removeFromBasket } from '@/redux/slices/basketSlice';
import { useState } from 'react';

const colorMap: { [key: string]: string } = {
  red: "red",
  green: "green",
  purple: "purple",
  yellow: "yellow",
  orange: "orange",
  blue: "blue",
  black: "black",
  brown: "brown",
};


// Define BasketItem type
interface BasketItem {
  id: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  color?: string[]; // Ensure this is an array of strings
}

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.items as BasketItem[]);
  const [couponCode, setCouponCode] = useState<string>('');

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveFromBasket = (id: string) => {
    dispatch(removeFromBasket(id));
  };

  const handleApplyCoupon = () => {
    // Implement coupon application logic here
    console.log(`Coupon Code Applied: ${couponCode}`);
  };

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  const tax = subtotal * 0.07; // Example: 7% tax
  const shipping = items.length > 0 ? 10 : 0; // Example condition
  const total = subtotal + tax + shipping;

  return (
    <div className="px-20 py-16">
      <div className="grid grid-cols-12 gap-14">
        <div className="col-span-8">
          <h2 className="py-2 mb-6 text-2xl">Your Cart</h2>
          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase">Product</h2>
            <h2 className="uppercase">Quantity</h2>
            <h2 className="uppercase">Price</h2>
          </div>
          <div>
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
                <div className="flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  <div className="flex flex-col">
                    <h2>{item.name}</h2>
                    {/* Conditionally render color display */}
                    {item.color && item.color.length > 0 && (
                      <>
                       
                        <div className="flex gap-2 mb-2">
                          {item.color.map((color: string, index: number) => (
                            <div
                              key={index}
                              className="rounded-full w-4 h-4"
                              style={{ backgroundColor: colorMap[color] || "black" }}
                              title={color}
                            ></div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-400 flex gap-3 items-center">
                  <button aria-label="Decrement quantity" className="border-r border-gray-400 py-2 px-4" onClick={() => handleDecrementQuantity(item.id)}>
                    <Minus />
                  </button>
                  <p className="flex-grow py-2 px-4">{item.quantity}</p>
                  <button aria-label="Increment quantity" className="border-l border-gray-400 py-2 px-4" onClick={() => handleIncrementQuantity(item.id)}>
                    <Plus />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <h4>${(item.price * (item.quantity || 0)).toFixed(2)}</h4>
                  <button aria-label="Remove item" onClick={() => handleRemoveFromBasket(item.id)}>
                    <Trash2 className="text-red-600 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 py-8">
            <input
              type="text"
              id="coupon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/2"
              placeholder="Enter Coupon"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="shrink-0 py-2.5 px-4 rounded-lg bg-lime-600 text-white"
              onClick={handleApplyCoupon}
            >
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="col-span-4 sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden p-5 dark:text-slate-100 font-bold">
          <h2 className="text-2xl pb-3">Cart total</h2>
          <div className="flex items-center justify-between border-b border-slate-500 pb-6">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pb-4 mt-2">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <p className="border-b border-slate-500 pb-6 text-slate-400 font-normal">
            We only charge for shipping when you have over 2kg items
          </p>
          <div className="flex items-center justify-between py-4 font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link
            href="#"
            className="bg-slate-200 text-slate-900 rounded-lg py-2 px-4 font-normal"
          >
            Continue to Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
