import type { ItemDto } from '@/api/types/item.dto';
import type { MemberDto } from '@/api/types/member.dto';
import type { CreateOrderRequestDto } from '@/api/types/orders.dto';
import { Card } from '@/shared/card/Card';
import { FormItem } from '@/shared/form/FormItem';
import { useForm } from 'react-hook-form';

interface Props {
  itemList: ItemDto[];
  memberList: MemberDto[];
  onSubmit: (data: CreateOrderRequestDto) => void;
}

export const CreateOrderForm = ({ itemList, memberList, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrderRequestDto>();

  return (
    <Card>
      <form
        style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onSubmit)}>
        <FormItem label="주문회원" errorMessage={errors.memberId?.message}>
          <select
            {...register('memberId', {
              required: '주문회원을 선택해주세요.',
              valueAsNumber: true,
            })}>
            <option value="">주문회원 선택</option>
            {memberList.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem label="상품명" errorMessage={errors.itemId?.message}>
          <select
            {...register('itemId', {
              required: '상품을 선택해주세요.',
              valueAsNumber: true,
            })}>
            <option value="">상품 선택</option>
            {itemList.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </FormItem>
        <FormItem label="주문수량" errorMessage={errors.count?.message}>
          <input
            placeholder="주문수량을 입력해주세요"
            type="number"
            {...register('count', {
              required: '주문수량은 필수 입력 항목입니다.',
              valueAsNumber: true,
              min: { value: 1, message: '주문수량을 입력해주세요.' },
            })}
          />
        </FormItem>
        <button type="submit">저장</button>
      </form>
    </Card>
  );
};
