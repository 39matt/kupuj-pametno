export interface IProduct {
    id: string;
    created_at: string;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    discountPercentage: number;
    isFeatured: boolean;
    imageUrls: string[];
}