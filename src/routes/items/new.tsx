import { CreateItemForm } from '@/widgets/items/create/CreateItemForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/items/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateItemForm />;
}
