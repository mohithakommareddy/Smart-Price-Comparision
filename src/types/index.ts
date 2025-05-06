export  interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  store: string;
  storeUrl: string;
  discount?: number;
  rating?: number;
  isBestDeal?: boolean;
  description?: string;
  specifications?: Array<{name: string, value: string}>;
  priceHistory?: Array<{date: string, price: number}>;
  priceDrop?: string;
}

export interface Store {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  delivery: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface WishlistItem extends Product {
  addedAt: Date;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}
 