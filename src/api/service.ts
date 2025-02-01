import { client } from '@/api/client';
import type { CreateItemRequestDto, ItemDto } from '@/api/types/item.dto';
import type { JoinMemberRequestDto, MemberDto } from '@/api/types/member.dto';
import type { CreateOrderRequestDto, OrderDto, OrderSearchDto } from '@/api/types/orders.dto';

export const getHello = async () => {
  return await client.get('/hello');
};

export const joinMemberApi = async (body: JoinMemberRequestDto) => {
  return await client.post('/members/join', body);
};

export const getMembers = async () => {
  return (await client.get<MemberDto[]>('/members')).data;
};

export const createItemApi = async (body: CreateItemRequestDto) => {
  return await client.post('/items/new', body);
};

export const getItems = async () => {
  return (await client.get<ItemDto[]>('/items')).data;
};

export const getItem = async (itemId: number) => {
  return (await client.get<ItemDto>(`/items/${itemId}`)).data;
};

export const updateItemApi = async (itemId: number, body: CreateItemRequestDto) => {
  return await client.put(`/items/${itemId}/edit`, body);
};

export const createOrderApi = async (body: CreateOrderRequestDto) => {
  return await client.post('/order', body);
};

export const getOrders = async (search: OrderSearchDto) => {
  return (await client.get<OrderDto[]>('/orders', { params: search })).data;
};

export const cancelOrderApi = async (orderId: number) => {
  return await client.post(`/orders/${orderId}/cancel`);
};
