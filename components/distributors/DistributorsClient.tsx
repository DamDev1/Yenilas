'use client';

import { useState } from 'react';
import { Plus, Truck, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CustomerFormModal } from '../customers/CustomerFormModal';
import Link from 'next/link';

export default function DistributorsClient({ 
  initialDistributors, 
  basePath
}: { 
  initialDistributors: any[]; 
  basePath: string; // e.g., '/owner/distributors' or '/manager/distributors'
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDistributors = initialDistributors.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone && c.phone.includes(searchQuery))
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Distributors</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your distributors and track deliveries.</p>
        </div>
        <div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="shadow-lg shadow-blue-500/20 whitespace-nowrap"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Distributor
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-100/50 flex flex-col">
        <div className="p-4 md:p-6 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Distributor Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Paints Delivered</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Debt Balance</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDistributors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                        <Truck className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-700">No distributors found</p>
                      <p className="text-sm">Try adjusting your search or add a new distributor.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDistributors.map((distributor: any) => (
                  <tr key={distributor._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800">{distributor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-600">{distributor.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        {distributor.totalPaintsDelivered?.toLocaleString() || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-700">
                        ₦{(distributor.totalAmount || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${distributor.debtBalance > 0
                          ? 'bg-red-50 text-red-700 border-red-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                        ₦{distributor.debtBalance.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`${basePath}/${distributor._id}`}>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        defaultType="distributor"
      />
    </div>
  );
}
