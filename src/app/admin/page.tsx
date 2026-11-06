import { db } from '@/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  let ordersList: any[] = [];

  try {
    ordersList = await db.select().from(orders).orderBy(desc(orders.created_at));
  } catch (error) {
    console.error('Erro ao buscar pedidos no admin:', error);
  }

  return <AdminDashboardClient initialOrders={ordersList} />;
}
