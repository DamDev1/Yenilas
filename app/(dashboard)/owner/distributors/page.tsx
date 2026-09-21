import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getCustomers } from '@/lib/actions/customer';
import DistributorsClient from '@/components/distributors/DistributorsClient';

export default async function OwnerDistributorsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'owner') {
    redirect('/login');
  }

  const distributors = await getCustomers('distributor');

  return <DistributorsClient initialDistributors={distributors} basePath="/owner/distributors" />;
}
