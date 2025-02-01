import { NewMemberForm } from '@/widgets/members/newMember/NewMemberForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/members/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewMemberForm />;
}
