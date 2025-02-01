import { itemQueryKeys } from '@/api/queries';
import { Table } from '@/shared/table/Table';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const ItemsTable = () => {
  const navigate = useNavigate();
  const { data = [] } = useQuery(itemQueryKeys.list);

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
            title: '상품명',
            render: row => row.name,
          },
          {
            key: 'price',
            title: '가격',
            render: row => row.price,
          },
          {
            key: 'stockQuantity',
            title: '재고수량',
            render: row => row.stockQuantity,
          },
          {
            key: 'author',
            title: '저자',
            render: row => row.author,
          },
          {
            key: 'isbn',
            title: 'ISBN',
            render: row => row.isbn,
          },
          {
            key: 'actions',
            title: '',
            render: row => (
              <div>
                <button
                  style={{ padding: '5px', fontSize: '16px' }}
                  onClick={() => navigate({ to: `/items/${row.id}/edit` })}>
                  수정
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};
