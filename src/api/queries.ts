import { getItem, getItems, getMembers, getOrders } from '@/api/service';
import type { OrderSearchDto } from '@/api/types/orders.dto';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const memberQueryKeys = createQueryKeys('member', {
  list: {
    queryKey: ['list'],
    queryFn: () => getMembers(),
  },
  detail: memberId => [memberId],
});

export const itemQueryKeys = createQueryKeys('item', {
  list: {
    queryKey: ['list'],
    queryFn: () => getItems(),
  },
  detail: (itemId: number) => ({
    queryKey: [itemId],
    queryFn: () => getItem(itemId),
  }),
});

export const orderQueryKeys = createQueryKeys('order', {
  search: (search: OrderSearchDto) => ({
    queryKey: [search.memberName, search.orderStatus],
    queryFn: () => getOrders(search),
  }),
});
