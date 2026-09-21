'use client';

import { ArrowLeft, Package, Banknote, CreditCard, ShoppingBag, Clock } from 'lucide-react';
import Link from 'next/link';

interface DistributorDetailsClientProps {
  distributor: any;
  history: any[];
  basePath: string;
}

export default function DistributorDetailsClient({ distributor, history, basePath }: DistributorDetailsClientProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link href={basePath}>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Distributors
          </button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{distributor.name}</h1>
          <p className="text-slate-500 font-medium mt-1">
            {distributor.phone ? `Phone: ${distributor.phone}` : 'No phone provided'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Paints Delivered</p>
            <p className="text-3xl font-black text-slate-800">
              {distributor.totalPaintsDelivered?.toLocaleString() || 0}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Value</p>
            <p className="text-3xl font-black text-slate-800">
              ₦{(distributor.totalAmount || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Outstanding Debt</p>
            <p className={`text-3xl font-black ${distributor.debtBalance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              ₦{distributor.debtBalance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
          <p className="text-sm text-slate-500">Credit purchases and debt repayments</p>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="font-semibold text-lg">No Recent Activity</p>
              <p className="text-sm">This distributor hasn't taken any credit or made any debt payments yet.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8 pb-4">
              {history.map((item) => {
                const date = new Date(item.createdAt).toLocaleString('en-GB', { 
                  day: '2-digit', month: 'short', year: 'numeric', 
                  hour: '2-digit', minute: '2-digit' 
                });
                
                if (item.type === 'sale') {
                  return (
                    <div key={item._id} className="relative">
                      <div className={`absolute -left-[35px] w-6 h-6 ${item.creditAmount > 0 ? 'bg-red-100' : 'bg-blue-100'} rounded-full border-4 border-white flex items-center justify-center shadow-sm`}>
                        <ShoppingBag className={`w-3 h-3 ${item.creditAmount > 0 ? 'text-red-600' : 'text-blue-600'}`} />
                      </div>
                      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md mb-1 border ${item.creditAmount > 0 ? 'bg-red-50 text-red-700 border-red-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                              {item.creditAmount > 0 ? 'Credit Purchase' : 'Purchase'}
                            </span>
                            <p className="text-xs text-slate-500 font-medium">{date}</p>
                          </div>
                          <span className={`font-bold text-lg ${item.creditAmount > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                            +₦{item.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paints Delivered:</p>
                          <ul className="space-y-1">
                            {item.items?.map((i: any, idx: number) => (
                              <li key={idx} className="text-sm flex justify-between">
                                <span className="font-medium text-slate-700">{i.quantity}x {i.name}</span>
                                <span className="text-slate-500">₦{(i.price * i.quantity).toLocaleString()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                            <span>Amount Paid:</span>
                            <span className="font-bold text-emerald-600">₦{(item.cashAmount + item.transferAmount).toLocaleString()}</span>
                          </div>
                          {item.creditAmount > 0 && (
                            <div className="flex justify-between items-center mb-2">
                              <span>Balance Left:</span>
                              <span className="font-bold text-red-600">₦{item.creditAmount.toLocaleString()}</span>
                            </div>
                          )}
                          <p className="text-xs text-slate-400 mt-2">Processed by {item.cashierId?.name || 'Unknown Staff'}</p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={item._id} className="relative">
                      <div className="absolute -left-[35px] w-6 h-6 bg-emerald-100 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                        <Banknote className="w-3 h-3 text-emerald-600" />
                      </div>
                      <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-1 border border-emerald-100">
                              Debt Repayment
                            </span>
                            <p className="text-xs text-slate-500 font-medium">{date}</p>
                          </div>
                          <span className="font-bold text-emerald-600 text-lg">-₦{item.amountPaid.toLocaleString()}</span>
                        </div>
                        
                        <div className="text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                          <div>
                            {item.cashAmount > 0 && <span className="mr-2">Cash: ₦{item.cashAmount.toLocaleString()}</span>}
                            {item.transferAmount > 0 && <span>Transfer: ₦{item.transferAmount.toLocaleString()}</span>}
                          </div>
                          <p className="text-xs text-slate-400">Collected by {item.cashierId?.name || 'Unknown Staff'}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
