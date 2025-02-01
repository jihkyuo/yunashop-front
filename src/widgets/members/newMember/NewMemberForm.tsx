import { joinMemberApi } from '@/api/service';
import type { ErrorResponseDto } from '@/api/types/error.dto';
import type { JoinMemberRequestDto } from '@/api/types/member.dto';
import { Route as IndexRoute } from '@/routes';
import { Card } from '@/shared/card/Card';
import { FormItem } from '@/shared/form/FormItem';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

export const NewMemberForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinMemberRequestDto>();

  const { mutate } = useMutation({
    mutationFn: joinMemberApi,
    onSuccess: () => {
      navigate({ to: IndexRoute.to });
    },
    onError: (error: AxiosError<ErrorResponseDto>) => {
      console.error('회원가입 실패', error);
      if (error.response?.data.message) {
        alert(error.response.data.message);
      }
    },
  });

  const onSubmit = (formValues: JoinMemberRequestDto) => {
    mutate(formValues);
  };

  return (
    <Card>
      <form
        style={{ minWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        onSubmit={handleSubmit(onSubmit)}>
        <FormItem label="이름" errorMessage={errors.name?.message}>
          <input
            placeholder="이름을 입력해주세요"
            {...register('name', { required: '이름은 필수 입력 항목입니다.' })}
          />
        </FormItem>
        <FormItem label="도시">
          <input placeholder="도시를 입력해주세요" {...register('city')} />
        </FormItem>
        <FormItem label="거리">
          <input placeholder="거리를 입력해주세요" {...register('street')} />
        </FormItem>
        <FormItem label="우편번호">
          <input placeholder="우편번호를 입력해주세요" {...register('zipcode')} />
        </FormItem>
        <button type="submit">저장</button>
      </form>
    </Card>
  );
};
