import type { AddressDto } from '@/api/types/member.dto';

export interface CreateOrderRequestDto {
  memberId: number;
  itemId: number;
  count: number;
}

export const OrderStatusRecord = {
  ORDER: 'ORDER',
  CANCEL: 'CANCEL',
} as const;

export type OrderStatus = keyof typeof OrderStatusRecord;

export interface OrderItemDto {
  id: number;
  itemName: string;
  orderPrice: number;
  count: number;
}

export interface OrderDto {
  id: number;
  memberName: string;
  orderStatus: OrderStatus;
  address: AddressDto;
  orderItems: OrderItemDto[];
  orderDate: string;
}

export interface OrderSearchDto {
  memberName?: string;
  orderStatus?: OrderStatus;
}
