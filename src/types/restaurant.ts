export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  tagline: string;
  description: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  icon: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
}
