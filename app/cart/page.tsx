"use client";

import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { RootState } from '@/redux/store';
import { decrementQuantity, incrementQuantity, removeFromBasket } from '@/redux/slices/basketSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.items);

  const handleIncrementQuantity = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveFromBasket = (id: string) => {
    dispatch(removeFromBasket(id));
  };

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = 2; // Placeholder for tax
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
                    <small>Golden</small> {/* Adjust if you have more item details */}
                  </div>
                </div>
                <div className="rounded-xl border border-gray-400 flex gap-3 items-center">
                  <button aria-label="Decrement quantity" className="border-r border-gray-400 py-2 px-4" onClick={() => handleDecrementQuantity(item.id)}>
                    <Minus />
                  </button>
                  <p className="flex-grow py-2 px-4">{item.quantity}</p>
                  <button aria-label="Increment quantity" className="border-l border-gray-400 py-2 px-4 " onClick={() => handleIncrementQuantity(item.id)}>
                    <Plus />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <h4>${item.price * item.quantity}</h4>
                  <button aria-label="Remove item" onClick={() => handleRemoveFromBasket(item.id)}>
                    <Trash2 className="text-red-600 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* COUPON FORM */}
          <div className="flex items-center gap-2 py-8">
            <input
              type="text"
              id="coupon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-1/2"
              placeholder="Enter Coupon"
            />
            <button className="shrink-0 py-2.5 px-4 rounded-lg bg-lime-600">
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="col-span-4 sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden p-5 dark:text-slate-100 font-bold">
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
