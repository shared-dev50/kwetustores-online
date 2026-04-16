import { useMemo, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "axios";
import { HiArrowLeft, HiOutlineShoppingBag, HiTruck, HiLibrary } from "react-icons/hi";
import { Link } from "react-router-dom";

type OrderType = "PICKUP" | "DELIVERY";

const inputClass =
  "w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100 placeholder:text-slate-400 text-base"; 
const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-500";

const Checkout = () => {
  const { cart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>("PICKUP");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const shippingFee = useMemo(() => {
    return (orderType === "DELIVERY" && totalItemsCount > 0) ? totalItemsCount * 7 : 0;
  }, [orderType, totalItemsCount]);

  const total = subtotal + shippingFee;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const getFormError = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim() || !formData.email.includes('@')) return "Valid email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (orderType === "DELIVERY") {
      if (!formData.addressLine1.trim()) return "Delivery address is required";
      if (!formData.city.trim()) return "City is required";
      if (!formData.zip.trim()) return "ZIP code is required";
    }
    return null;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);
    try {    
      const nameParts = formData.fullName.trim().split(/\s+/);
      const payload = {
        items: cart.map(item => ({
    id: item.product.id,
    quantity: item.quantity,
    name: item.product.name 
  })),
        customer: {
          firstName: nameParts[0] || "Customer",
          lastName: nameParts.slice(1).join(" ") || "Guest",
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
        },
        orderType,
        address: orderType === "DELIVERY" 
          ? `${formData.addressLine1}${formData.addressLine2 ? `, ${formData.addressLine2}` : ""}, ${formData.city}, ${formData.state} ${formData.zip}`
          : "STORE PICKUP",
        customerNote: formData.notes || "",
      };

      const { data } = await axios.post(`${API_BASE_URL}/api/clover/create-checkout`, payload);
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || "Failed to initiate payment");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert(`Checkout Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formError = getFormError();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32 lg:pb-20">
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b bg-white/80 backdrop-blur-md px-4 py-4 lg:hidden">
        <Link to="/products" className="text-slate-600 p-1">
          <HiArrowLeft size={24} />
        </Link>
        <span className="font-bold text-slate-900">Secure Checkout</span>
        <div className="w-8" /> 
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-2 space-y-6">
            <header className="hidden lg:block space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Checkout</h1>
              <p className="text-slate-500 font-medium">Please enter your details to complete the purchase.</p>
            </header>

            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Order Type Toggle */}
              <div className="flex rounded-2xl bg-slate-200/50 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setOrderType("PICKUP")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    orderType === "PICKUP" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <HiLibrary size={18} /> Store Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("DELIVERY")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                    orderType === "DELIVERY" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <HiTruck size={18} /> Home Delivery
                </button>
              </div>

              {/* Main Content Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-10 shadow-sm space-y-10">
                
                {/* Section 1: Customer */}
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm text-orange-600">1</span>
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Full Name</label>
                      <input required value={formData.fullName} className={inputClass} placeholder="Jane Doe" onChange={e => updateField("fullName", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input required type="email" value={formData.email} className={inputClass} placeholder="jane@example.com" onChange={e => updateField("email", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input required type="tel" value={formData.phone} className={inputClass} placeholder="(555) 000-0000" onChange={e => updateField("phone", e.target.value)} />
                    </div>
                  </div>
                </section>

                {/* Section 2: Address (Conditional) */}
                {orderType === "DELIVERY" && (
                  <section className="pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm text-orange-600">2</span>
                      Shipping Address
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass}>Street Address</label>
                        <input required value={formData.addressLine1} className={inputClass} placeholder="123 Shopping Lane" onChange={e => updateField("addressLine1", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass}>Apt, Suite, etc. (Optional)</label>
                        <input value={formData.addressLine2} className={inputClass} placeholder="Suite 4B" onChange={e => updateField("addressLine2", e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                        <div className="col-span-2 md:col-span-1">
                          <label className={labelClass}>City</label>
                          <input required value={formData.city} className={inputClass} placeholder="City" onChange={e => updateField("city", e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>State</label>
                          <input required maxLength={2} value={formData.state} className={`${inputClass} uppercase`} placeholder="WA" onChange={e => updateField("state", e.target.value)} />
                        </div>
                        <div>
                          <label className={labelClass}>ZIP Code</label>
                          <input required pattern="[0-9]*" value={formData.zip} className={inputClass} placeholder="98001" onChange={e => updateField("zip", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Section 3: Notes */}
                <section className="pt-4 border-t border-slate-50">
                  <label className={labelClass}>Order Notes (Optional)</label>
                  <textarea rows={3} value={formData.notes} className={`${inputClass} resize-none`} placeholder="Special instructions for the store..." onChange={e => updateField("notes", e.target.value)} />
                </section>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-black text-slate-900 border-b border-slate-50 pb-4">
                  <HiOutlineShoppingBag className="text-orange-600" />
                  Order Summary
                </h2>
                
                {/* Scrollable Item List */}
                <div className="mt-4 max-h-[35vh] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex justify-between items-start gap-4 text-sm">
                      <div className="flex-1 text-slate-600 leading-snug">
                        <span className="font-bold text-orange-600">{item.quantity}×</span> {item.product.name}
                      </div>
                      <span className="font-bold text-slate-900 whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Totals */}
                <div className="mt-6 space-y-3 border-t border-dashed border-slate-200 pt-6">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {orderType === "DELIVERY" && (
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Shipping Fee</span>
                      <span className="font-medium text-slate-900">${shippingFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-lg font-black text-slate-900">Total</span>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Including all taxes</p>
                    </div>
                    <span className="text-3xl font-black text-orange-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Desktop Action Button */}
                <button
                  form="checkout-form"
                  disabled={loading || cart.length === 0 || !!formError}
                  className="mt-8 hidden w-full items-center justify-center cursor-pointer rounded-2xl bg-orange-600 py-4 text-lg font-black text-white transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed lg:flex"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    `Complete Payment`
                  )}
                </button>
              </div>

              {/* Shipping Notice */}
              {orderType === "DELIVERY" && totalItemsCount > 0 && (
                <div className="rounded-2xl bg-orange-50 p-4 border border-orange-100 animate-pulse">
                  <p className="text-xs font-bold text-orange-800 leading-tight">
                    🚚 You are paying a flat shipping fee of $7.00 per item for Home Delivery.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING MOBILE FOOTER */}
      <div className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white p-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Grand Total</span>
            <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
          </div>
          <button
            form="checkout-form"
            disabled={loading || cart.length === 0 || !!formError}
            className="flex-1 rounded-2xl bg-orange-600 py-4 text-center text-sm font-black text-white shadow-lg active:scale-95 transition-transform disabled:opacity-40 disabled:grayscale"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
        {/* Error Tooltip on Mobile */}
        {formError && (
          <div className="mt-2 text-center text-[10px] font-bold text-red-500 animate-bounce">
            ⚠️ {formError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;