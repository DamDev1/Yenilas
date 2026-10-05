import { getProductsWithTotalInventory } from '@/lib/actions/product';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductCards from './ProductCards';

export default async function ProductsPage() {
  const products = await getProductsWithTotalInventory();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Paint Inventory</h2>
          <p className="text-slate-500 font-medium mt-1">Manage your paint catalog, colors, and stock.</p>
        </div>
        <Link 
          href="/owner/products/new" 
          className="flex items-center gap-2 bg-[#3B41E3] hover:bg-[#2A2FC3] text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-[0_4px_12px_-4px_rgba(59,65,227,0.5)]"
        >
          <Plus className="w-5 h-5" />
          <span>Add Paint Variant</span>
        </Link>
      </div>

      <ProductCards products={products} />
    </div>
  );
}
