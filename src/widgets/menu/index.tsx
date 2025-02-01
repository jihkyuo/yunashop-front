import { Route as ItemsRoute } from '@/routes/items';
import { Route as ItemsNewRoute } from '@/routes/items/new';
import { Route as MembersRoute } from '@/routes/members';
import { Route as MembersNewRoute } from '@/routes/members/new';
import { Route as OrdersRoute } from '@/routes/orders';
import { Route as OrdersNewRoute } from '@/routes/orders/new';
import { Card } from '@/shared/card/Card';
import { useNavigate, type ReactNode } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

export const Menu = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <Title>YUNA SHOP</Title>
      <MenuItem label="회원 기능">
        <button onClick={() => navigate({ to: MembersNewRoute.to })}>회원가입</button>
        <button onClick={() => navigate({ to: MembersRoute.to })}>회원목록</button>
      </MenuItem>

      <MenuItem label="상품 기능">
        <button onClick={() => navigate({ to: ItemsNewRoute.to })}>상품 등록</button>
        <button onClick={() => navigate({ to: ItemsRoute.to })}>상품 목록</button>
      </MenuItem>

      <MenuItem label="주문 기능">
        <button onClick={() => navigate({ to: OrdersNewRoute.to })}>상품 주문</button>
        <button onClick={() => navigate({ to: OrdersRoute.to })}>주문 내역</button>
      </MenuItem>
    </Card>
  );
};


const Title = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        fontSize: '2rem',
        fontWeight: 'bold',
      }}>
      {children}
    </div>
  );
};

const MenuItem = ({ children, label }: PropsWithChildren<{ label: ReactNode }>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
      <div>{label}</div>
      <div style={{ display: 'flex', gap: '10px' }}>{children}</div>
    </div>
  );
};
