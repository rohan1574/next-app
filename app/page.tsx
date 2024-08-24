import { getData } from "@/lib/getData";
import Link from "next/link";

const HomePage = async () => {
  
  
  const products = (await getData("https://fakestoreapi.com/products")) ?? [];

  return (
    <div className="px-20 py-16">
      <h2 className="text-4xl font-bold p-4">Redux Toolkit</h2>
      <div className="bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
          <h2>Products</h2>
          <Link
            className="bg-lime-600 hover:bg-lime-800 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
            href="/cart"
          >
            View Cart (0)
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-700 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 dark:text-white">{product.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">${product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="mt-4 inline-block text-lime-600 hover:text-lime-800"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
