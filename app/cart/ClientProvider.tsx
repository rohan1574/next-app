"use client"; // This directive makes the component a Client Component

import { Provider } from "react-redux";
import { store } from "@/redux/store"; // Adjust the import path if necessary

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
