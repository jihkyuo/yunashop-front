import { createItemApi } from '@/api/service';
import type { ErrorResponseDto } from '@/api/types/error.dto';
import type { CreateItemRequestDto } from '@/api/types/item.dto';
import { Card } from '@/shared/card/Card';
import { FormItem } from '@/shared/form/FormItem';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export const CreateItemForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemRequestDto>({
    defaultValues: {
      price: 0,
      stockQuantity: 0,
    },
  });

  const { mutate } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      navigate({ to: '..' });
    },
    onError: (error: AxiosError<ErrorResponseDto>) => {
      console.error('상품 생성 실패', error);
      if (error.response?.data.message) {
        alert(error.response.data.message);
      }
    },
  });

  const onSubmit = (formValues: CreateItemRequestDto) => {
    mutate(formValues);
  };

  return (
    <Card>
      <form
        style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onSubmit)}>
        <FormItem label="상품명" errorMessage={errors.name?.message}>
          <input
            placeholder="상품명을 입력해주세요"
            {...register('name', { required: '상품명은 필수 입력 항목입니다.' })}
          />
        </FormItem>
        <FormItem label="가격" errorMessage={errors.price?.message}>
          <input
            placeholder="가격을 입력해주세요"
            type="number"
            {...register('price', {
              required: '가격은 필수 입력 항목입니다.',
              valueAsNumber: true,
              min: { value: 1, message: '가격을 입력해주세요.' },
            })}
          />
        </FormItem>
        <FormItem label="재고수량" errorMessage={errors.stockQuantity?.message}>
          <input
            placeholder="재고수량을 입력해주세요"
            type="number"
            {...register('stockQuantity', {
              required: '재고수량은 필수 입력 항목입니다.',
              min: { value: 1, message: '재고수량을 입력해주세요.' },
              valueAsNumber: true,
            })}
          />
        </FormItem>
        <FormItem label="저자">
          <input placeholder="저자를 입력해주세요" {...register('author')} />
        </FormItem>
        <FormItem label="ISBN">
          <input placeholder="ISBN을 입력해주세요" {...register('isbn')} />
        </FormItem>
        <button type="submit">저장</button>
      </form>
    </Card>
  );
};
