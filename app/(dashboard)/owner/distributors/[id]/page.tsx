import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getCustomerHistory } from '@/lib/actions/customer';
import DistributorDetailsClient from '@/components/distributors/DistributorDetailsClient';
import connectDB from '@/lib/db/mongoose';
import Customer from '@/lib/models/Customer';

export default async function OwnerDistributorDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'owner') {
    redirect('/login');
  }

  await connectDB();
  const distributor = await Customer.findById(id).lean();

  if (!distributor || distributor.customerType !== 'distributor') {
    redirect('/owner/distributors');
  }

  const history = await getCustomerHistory(id);

  return <DistributorDetailsClient distributor={JSON.parse(JSON.stringify(distributor))} history={history} basePath="/owner/distributors" />;
}
