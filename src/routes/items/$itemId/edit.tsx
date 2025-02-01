import { itemQueryKeys } from '@/api/queries';
import { updateItemApi } from '@/api/service';
import type { ErrorResponseDto } from '@/api/types/error.dto';
import { CreateItemRequestDto } from '@/api/types/item.dto';
import { EditItemForm } from '@/widgets/items/edit/EditItemForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { z } from 'zod';

export const Route = createFileRoute('/items/$itemId/edit')({
  params: {
    parse: params => ({
      itemId: z.number().int().parse(Number(params.itemId)),
    }),
    stringify: ({ itemId }) => ({ itemId: `${itemId}` }),
  },
  component: RouteComponent,
  loader: ctx => {
    const itemId = ctx.params.itemId;
    return ctx.context.queryClient.ensureQueryData({
      ...itemQueryKeys.detail(itemId),
      staleTime: 0,
    });
  },
});

function RouteComponent() {
  const itemDetail = Route.useLoaderData();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: (formValues: CreateItemRequestDto) => updateItemApi(itemDetail.id, formValues),
    onSuccess: async () => {
      await queryClient.fetchQuery(itemQueryKeys.detail(itemDetail.id));
      router.history.back();
    },
    onError: (error: AxiosError<ErrorResponseDto>) => {
      console.error('상품 수정 실패', error);
      if (error.response?.data.message) {
        alert(error.response.data.message);
      }
    },
  });

  const onSubmit = (formValues: CreateItemRequestDto) => {
    mutate(formValues);
  };

  return <EditItemForm initialValues={itemDetail} onSubmit={onSubmit} />;
}
