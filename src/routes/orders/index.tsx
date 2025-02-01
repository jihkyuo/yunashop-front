import { orderQueryKeys } from '@/api/queries';
import { cancelOrderApi } from '@/api/service';
import { ErrorResponseDto } from '@/api/types/error.dto';
import { OrderStatusRecord, type OrderSearchDto } from '@/api/types/orders.dto';
import { Card } from '@/shared/card/Card';
import { FormItem } from '@/shared/form/FormItem';
import { Table } from '@/shared/table/Table';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// memo 아주 좋은 검색 페이지 설계임

const searchSchema = z
  .object({
    memberName: z
      .string()
      .trim()
      .transform(x => x || undefined), // 빈 값을 undefined로 변환 => submit 시 빈 값이 들어오면 전체검색으로 처리
    orderStatus: z
      .union([z.nativeEnum(OrderStatusRecord), z.literal('')]) // 빈 문자열도 허용 => 전체검색
      .transform(x => x || undefined), // 빈 값을 undefined로 변환 => submit 시 빈 값이 들어오면 전체검색으로 처리
  })
  .partial();

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
  validateSearch: searchSchema, // 검색 파라미터 검증 => 잘못된 파라미터가 들어오면 자동으로 파라미터를 초기화하고 정상 페이지로 돌아감
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const search = useSearch({ from: '/orders/' });
  const searchParams = searchSchema.parse(search);

  const { data: orderList = [], refetch } = useQuery(orderQueryKeys.search(searchParams));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSearchDto>({
    defaultValues: searchParams,
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (formValues: OrderSearchDto) => {
    navigate({
      search: formValues,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card style={{ height: 'fit-content' }}>
        <form
          style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="주문회원" errorMessage={errors.memberName?.message}>
            <input placeholder="주문회원을 입력해주세요" type="text" {...register('memberName')} />
          </FormItem>
          <FormItem label="주문상태" errorMessage={errors.orderStatus?.message}>
            <select {...register('orderStatus')}>
              <option value="">전체</option>
              {Object.values(OrderStatusRecord).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FormItem>
          <button type="submit">검색</button>
        </form>
      </Card>

      <Table
        dataSource={orderList}
        rowKey={order => order.id}
        columns={[
          {
            key: 'id',
            title: '주문번호',
            render: row => row.id,
          },
          {
            key: 'memberName',
            title: '주문회원',
            render: row => row.memberName,
          },
          {
            key: 'itemName',
            title: '대표 상품명',
            render: row => row.orderItems[0].itemName,
          },
          {
            key: 'itemPrice',
            title: '대표 상품 가격',
            render: row => row.orderItems[0].orderPrice,
          },
          {
            key: 'orderQuantity',
            title: '주문 수량',
            render: row => row.orderItems[0].count,
          },
          {
            key: 'orderStatus',
            title: '주문상태',
            render: row => row.orderStatus,
          },
          {
            key: 'orderDate',
            title: '주문일시',
            render: row => new Date(row.orderDate).toLocaleString(),
          },
          {
            key: 'cancel',
            title: '취소',
            render: row => {
              return row.orderStatus === 'ORDER' && <CancelButton orderId={row.id} refetch={refetch} />;
            },
          },
        ]}
      />
    </div>
  );
}

const CancelButton = ({ orderId, refetch }: { orderId: number; refetch: () => void }) => {
  const { mutate } = useMutation({
    mutationFn: () => cancelOrderApi(orderId),
    onSuccess: () => {
      refetch();
    },
    onError: (error: AxiosError<ErrorResponseDto>) => {
      console.error('주문 실패', error);
      if (error.response?.data.message) {
        alert(error.response.data.message);
      }
    },
  });

  const handleCancel = () => {
    if (confirm('주문을 취소하시겠습니까?')) {
      mutate();
    }
  };

  return (
    <button style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }} onClick={handleCancel}>
      취소
    </button>
  );
};
