import { memberQueryKeys } from '@/api/queries';
import { Table } from '@/shared/table/Table';
import { useQuery } from '@tanstack/react-query';

export const MembersTable = () => {
  const { data = [] } = useQuery({
    ...memberQueryKeys.list,
    select: result => result.data,
  });

  return (
    <div>
      <Table
        dataSource={data}
        rowKey={row => row.id}
        columns={[
          {
            key: 'id',
            title: '#',
            render: row => row.id,
          },
          {
            key: 'name',
            title: '이름',
            render: row => row.name,
          },
          {
            key: 'city',
            title: '도시',
            render: row => row.address.city,
          },
          {
            key: 'street',
            title: '거리',
            render: row => row.address.street,
          },
          {
            key: 'zipcode',
            title: '우편번호',
            render: row => row.address.zipcode,
          },
        ]}
      />
    </div>
  );
};
