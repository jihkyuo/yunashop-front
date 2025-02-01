import { ItemsTable } from '@/widgets/items/list/ItemsTable';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ItemsTable />;
}
