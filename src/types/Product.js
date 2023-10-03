export type  Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    discounted_price: string;
    quantity: string;
    sku: string;
    weight: string;
   dimensions: string;
   images: string;
   specifications: string;
   availability: string;
   rating: string;
   reviews: string;
   created_at: string;
    vendor?: {
        id: number;
        first_name: string;
        last_name: string;
    }[];
    references?: {
        id: number;
        first_name: string;
        last_name: string;
    }[];
};