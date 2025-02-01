import { itemQueryKeys, memberQueryKeys } from '@/api/queries';
import { createOrderApi } from '@/api/service';
import type { ErrorResponseDto } from '@/api/types/error.dto';
import type { CreateOrderRequestDto } from '@/api/types/orders.dto';
import { CreateOrderForm } from '@/widgets/orders/create/CreateOrderForm';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { AxiosError } from 'axios';

export const Route = createFileRoute('/orders/new')({
  component: RouteComponent,
  loader: async ctx => {
    const itemList = await ctx.context.queryClient.ensureQueryData({
      ...itemQueryKeys.list,
      staleTime: 0,
    });
    const memberList = await ctx.context.queryClient.ensureQueryData({
      ...memberQueryKeys.list,
      staleTime: 0,
    });
    return { itemList, memberList };
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const { itemList, memberList } = Route.useLoaderData();

  const { mutate } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      navigate({ to: '..' });
    },
    onError: (error: AxiosError<ErrorResponseDto>) => {
      console.error('주문 실패', error);
      if (error.response?.data.message) {
        alert(error.response.data.message);
      }
    },
  });

  const onSubmit = (data: CreateOrderRequestDto) => {
    mutate(data);
  };

  return <CreateOrderForm itemList={itemList} memberList={memberList} onSubmit={onSubmit} />;
}
