import { MembersTable } from '@/widgets/members/list/MembersTable';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MembersTable />;
}
