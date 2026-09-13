import React, { useState } from 'react';
import {
  Package,
  ShoppingCart,
  Truck,
  FileText,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Send,
  Building,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  SupplierRecord,
  SupplierCatalogItem,
  RFQRecord,
  SupplierQuotationRecord,
  PurchaseOrderRecord,
  MaterialDeliveryRecord,
  UserRole,
} from '../../types/platform';
import {
  SEED_SUPPLIERS,
  SEED_CATALOG_ITEMS,
  SEED_RFQS,
  SEED_QUOTATIONS,
  SEED_PURCHASE_ORDERS,
  SEED_DELIVERIES,
} from '../../data/platformSeedData';

interface SupplierPortalViewProps {
  currentSubRoute: string;
  onNavigate: (route: string) => void;
  currentUserRole: UserRole;
  portalTheme: 'dark' | 'light';
}

export const SupplierPortalView: React.FC<SupplierPortalViewProps> = ({
  currentSubRoute,
  onNavigate,
  currentUserRole,
  portalTheme,
}) => {
  const [supplier] = useState<SupplierRecord>(SEED_SUPPLIERS[0]);
  const [catalog, setCatalog] = useState<SupplierCatalogItem[]>(SEED_CATALOG_ITEMS);
  const [rfqs] = useState<RFQRecord[]>(SEED_RFQS);
  const [quotations, setQuotations] = useState<SupplierQuotationRecord[]>(SEED_QUOTATIONS);
  const [purchaseOrders] = useState<PurchaseOrderRecord[]>(SEED_PURCHASE_ORDERS);
  const [deliveries, setDeliveries] = useState<MaterialDeliveryRecord[]>(SEED_DELIVERIES);

  // New Catalog item state
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<SupplierCatalogItem>>({
    sku: 'STL-REB-20-G60',
    title: 'Deformed Steel Bar 20mm Grade 60 (PNS 49:2020)',
    brand: 'Luzon Steel Prime',
    unit: 'PCS',
    basePricePHP: 620,
    availableStockQty: 1500,
    leadTimeDays: 3,
    minOrderQty: 100,
    specifications: 'ASTM A615 Grade 60 mill certified',
    stockLocation: 'San Fernando Warehouse',
    serviceArea: 'Central Luzon & NCR',
    warrantyMonths: 12,
    category: 'REBAR',
    approvalStatus: 'APPROVED',
  });

  // Quotation Submission state
  const [selectedRfq, setSelectedRfq] = useState<RFQRecord | null>(null);
  const [quoteUnitPrice, setQuoteUnitPrice] = useState<number>(370);
  const [quoteNotes, setQuoteNotes] = useState('Price valid for 30 calendar days. Delivery via bulk 10-wheeler.');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  // Assistant state
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Mabuhay Luzon Steel Mills team. I am the Dhenze Supplier Assistant. I can assist you with RFQ tender timelines, delivery pass schedules, and 3-way invoice matching criteria.',
      time: '09:30 AM',
    },
  ]);

  const handleAddCatalogItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title || !newItem.basePricePHP) return;
    const added: SupplierCatalogItem = {
      id: `CAT-${Date.now()}`,
      supplierOrgId: supplier.id,
      supplierName: supplier.name,
      sku: newItem.sku || 'SKU-CUSTOM',
      title: newItem.title,
      category: newItem.category || 'STRUCTURAL_STEEL',
      brand: newItem.brand || 'Local',
      specifications: newItem.specifications || 'Standard specifications',
      unit: newItem.unit || 'PCS',
      basePricePHP: Number(newItem.basePricePHP),
      availableStockQty: Number(newItem.availableStockQty) || 100,
      leadTimeDays: Number(newItem.leadTimeDays) || 5,
      minOrderQty: Number(newItem.minOrderQty) || 10,
      stockLocation: newItem.stockLocation || 'Clark Pampanga',
      serviceArea: 'Central Luzon',
      warrantyMonths: 12,
      approvalStatus: 'APPROVED',
      effectiveUntil: '2027-12-31',
    };
    setCatalog([added, ...catalog]);
    setShowAddItem(false);
  };

  const handleSendAssistant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantInput.trim()) return;
    const msg = assistantInput;
    setAssistantMessages((prev) => [
      ...prev,
      { sender: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setAssistantInput('');
    setTimeout(() => {
      setAssistantMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: `For Luzon Steel Mills: All delivery trucks entering the Angeles Villa project site must display Gate Pass GP-2026-0089. Concrete cylinder test reports must accompany deliveries.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 500);
  };

  const isLight = portalTheme === 'light';
  const cardBg = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/70 border-slate-800 text-slate-100';
  const headerText = isLight ? 'text-slate-900' : 'text-white';
  const mutedText = isLight ? 'text-slate-500' : 'text-slate-400';

  const route = currentSubRoute || 'overview';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase bg-[#C6922D]/10 text-[#C6922D] border border-[#C6922D]/30">
              Accredited Supplier Workspace
            </span>
            <span className={`text-xs ${mutedText}`}>{supplier.tradeName} (Accredited Tier-1)</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-serif ${headerText} mt-1`}>
            {route === 'overview' && 'Supplier Operations Dashboard'}
            {route === 'catalog' && 'Material Catalog & Inventory Matrix'}
            {route === 'rfqs' && 'Requests for Quotations (RFQs)'}
            {route === 'quotations' && 'Sealed Commercial Quotations'}
            {route === 'purchase-orders' && 'Purchase Orders & Contract Releases'}
            {route === 'deliveries' && 'Site Deliveries & Inspection Registry'}
            {route === 'invoices' && 'Supplier Invoices & 3-Way Reconciliation'}
            {route === 'performance' && 'Supplier Performance Scorecard'}
            {route === 'credentials' && 'Statutory Licensing & Credentials'}
            {route === 'assistant' && 'Dhenze Supplier Assistant'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> BIR & PCAB Verified
          </span>
        </div>
      </div>

      {/* 1. OVERVIEW */}
      {route === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Active Purchase Orders</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-[#C6922D] font-bold">{purchaseOrders.length}</span>
                <span className="text-xs text-slate-400">Total ₱1.45M</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Next dispatch: Sept 18</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Pending RFQ Tenders</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-white font-bold">{rfqs.length}</span>
                <span className="text-xs text-amber-400">Closing in 3 days</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Rebar & Cement packages</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>On-Time Delivery Rate</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-3xl font-serif text-emerald-400 font-bold">{supplier.onTimeDeliveryRate}%</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> High Precision
                </span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>Quality pass rate: 99.4%</p>
            </div>

            <div className={`p-5 rounded-xl border ${cardBg}`}>
              <span className={`text-xs font-medium uppercase tracking-wider ${mutedText}`}>Average Payment Velocity</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className={`text-2xl font-serif ${headerText} font-bold`}>14 Days</span>
                <span className="text-xs text-emerald-400">Net 30 Baseline</span>
              </div>
              <p className={`text-xs ${mutedText} mt-2`}>3-way matching automated</p>
            </div>
          </div>

          {/* Quick Tables: Pending RFQs and Active POs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-base font-serif ${headerText}`}>Open RFQ Opportunities</h2>
                <button onClick={() => onNavigate('/portal/supplier/rfqs')} className="text-xs text-[#C6922D] hover:underline">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {rfqs.map((rfq) => (
                  <div key={rfq.id} className={`p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#C6922D]">{rfq.rfqNumber}</span>
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Deadline: {rfq.submissionDeadline}
                      </span>
                    </div>
                    <p className={`text-xs font-medium ${headerText} mt-1`}>{rfq.title}</p>
                    <p className={`text-[11px] ${mutedText}`}>Project: {rfq.projectName}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl border ${cardBg}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-base font-serif ${headerText}`}>Active Purchase Orders</h2>
                <button onClick={() => onNavigate('/portal/supplier/purchase-orders')} className="text-xs text-[#C6922D] hover:underline">
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {purchaseOrders.map((po) => (
                  <div key={po.id} className={`p-3.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#C6922D]">{po.poNumber}</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        ₱{(po.totalAmountPHP / 1e6).toFixed(2)}M
                      </span>
                    </div>
                    <p className={`text-xs font-medium ${headerText} mt-1`}>Terms: {po.paymentTerms}</p>
                    <p className={`text-[11px] ${mutedText}`}>Status: {po.status} • Delivery: {po.promisedDeliveryDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CATALOG */}
      {route === 'catalog' && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className={`text-lg font-serif ${headerText}`}>Supplier Material & Price Catalog</h2>
              <p className={`text-xs ${mutedText}`}>Manage unit pricing, available warehouse stock, and delivery lead times.</p>
            </div>
            <button
              onClick={() => setShowAddItem(!showAddItem)}
              className="px-4 py-2 rounded-lg bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> Add Material SKU
            </button>
          </div>

          {showAddItem && (
            <form onSubmit={handleAddCatalogItem} className="mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Add New Material SKU</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">SKU Code</label>
                  <input
                    type="text"
                    value={newItem.sku || ''}
                    onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Item Title</label>
                  <input
                    type="text"
                    value={newItem.title || ''}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Base Price (PHP)</label>
                  <input
                    type="number"
                    value={newItem.basePricePHP || 0}
                    onChange={(e) => setNewItem({ ...newItem, basePricePHP: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Available Stock</label>
                  <input
                    type="number"
                    value={newItem.availableStockQty || 0}
                    onChange={(e) => setNewItem({ ...newItem, availableStockQty: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Lead Time (Days)</label>
                  <input
                    type="number"
                    value={newItem.leadTimeDays || 0}
                    onChange={(e) => setNewItem({ ...newItem, leadTimeDays: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#C6922D] text-slate-950 font-bold text-xs uppercase"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                <tr>
                  <th className="pb-3 font-semibold uppercase tracking-wider">SKU</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Title</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Brand</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Unit Price (PHP)</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Stock</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider">Lead Time</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800'}`}>
                {catalog.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-3 font-mono text-[#C6922D] font-bold">{item.sku}</td>
                    <td className={`py-3 font-medium ${headerText}`}>{item.title}</td>
                    <td className="py-3 text-slate-400">{item.brand}</td>
                    <td className="py-3 font-semibold text-white">₱{item.basePricePHP.toLocaleString()} / {item.unit}</td>
                    <td className="py-3 text-emerald-400 font-mono">{item.availableStockQty.toLocaleString()}</td>
                    <td className="py-3 text-slate-300">{item.leadTimeDays} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. RFQS & BIDDING */}
      {(route === 'rfqs' || route === 'quotations') && (
        <div className={`p-6 rounded-xl border ${cardBg}`}>
          <h2 className={`text-lg font-serif ${headerText} mb-4`}>Active Requests for Quotation (RFQs)</h2>
          <div className="space-y-4">
            {rfqs.map((rfq) => (
              <div
                key={rfq.id}
                className={`p-4 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#C6922D] mr-2">{rfq.rfqNumber}</span>
                    <span className={`text-sm font-semibold ${headerText}`}>{rfq.title}</span>
                  </div>
                  <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 self-start sm:self-auto">
                    Deadline: {rfq.submissionDeadline}
                  </span>
                </div>

                <p className={`text-xs ${mutedText} mb-3`}>
                  Project: {rfq.projectName} • Category: {rfq.category} • Sealed Bidding: {rfq.sealedBidding ? 'Yes' : 'No'}
                </p>

                <div className="p-3 bg-slate-900/60 rounded border border-slate-800 text-xs mb-3 space-y-1">
                  <span className="font-semibold text-slate-300">Specifications & Items:</span>
                  {rfq.requiredItems.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-400">
                      <span>• {it.description} ({it.spec})</span>
                      <span className="font-mono text-white">{it.quantity.toLocaleString()} {it.unit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      alert(`Sealed quote of ₱${quoteUnitPrice}/unit formally submitted under hash verification token.`);
                    }}
                    className="px-4 py-1.5 rounded bg-[#C6922D] hover:bg-[#dfad4b] text-slate-950 font-bold text-xs uppercase transition-colors"
                  >
                    Submit Sealed Quotation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PERFORMANCE SCORECARD */}
      {route === 'performance' && (
        <div className={`p-6 rounded-xl border ${cardBg} space-y-6`}>
          <div>
            <h2 className={`text-lg font-serif ${headerText}`}>Supplier Performance Scorecard</h2>
            <p className={`text-xs ${mutedText}`}>Continuous KPI evaluation under LDL Dhenze Procurement Standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">On-Time Delivery</span>
              <p className="text-3xl font-serif text-emerald-400 font-bold mt-2">{supplier.onTimeDeliveryRate}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Target: &gt;95.0%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Quality Pass Rate</span>
              <p className="text-3xl font-serif text-emerald-400 font-bold mt-2">99.4%</p>
              <p className="text-[11px] text-slate-400 mt-1">Zero structural test failures</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Accreditation Tier</span>
              <p className="text-3xl font-serif text-[#C6922D] font-bold mt-2">{supplier.tierStatus}</p>
              <p className="text-[11px] text-slate-400 mt-1">Preferred Regional Supplier</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
