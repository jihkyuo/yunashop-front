export interface CreateItemRequestDto {
  name: string;
  price: number;
  stockQuantity: number;
  author?: string;
  isbn?: string;
}

export interface ItemDto {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  author?: string;
  isbn?: string;
}