import { useMemo, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "axios";

type OrderType = "PICKUP" | "DELIVERY";

const inputClass =
  "w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 placeholder:text-slate-400";
const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400";

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

  const getFormError = () => {
    if (!formData.fullName.trim()) return "Please enter your full name";
    if (!formData.email.trim()) return "Please enter your email address";
    if (!formData.phone.trim()) return "Please enter your phone number";

    if (orderType === "DELIVERY") {
      if (!formData.addressLine1.trim()) return "Please enter your address";
      if (!formData.city.trim()) return "Please enter your city";
      if (!formData.state.trim()) return "Please enter your state";
      if (!formData.zip.trim()) return "Please enter your ZIP code";
    }

    return null;
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

const shippingFee = useMemo(() => {
  if (orderType === "PICKUP" || totalItemsCount === 0) {
    return 0;
  }
  return totalItemsCount * 7;
}, [orderType, totalItemsCount]);


  const total = subtotal + shippingFee;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const nameParts = formData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "Customer";
      const lastName =
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : "Guest";

      const { addressLine1, addressLine2, city, state, zip } = formData;

      const formattedAddress =
        orderType === "DELIVERY"
          ? `${addressLine1}${addressLine2 ? `, ${addressLine2}` : ""}, ${city}, ${state} ${zip}`
          : "STORE PICKUP";

const payload = {
  items: cart,
  customer: {
    firstName,
    lastName,
    email: formData.email,
    phoneNumber: formData.phone,
    fullName: formData.fullName,
  },
  orderType,
  address: orderType === "DELIVERY" ? formattedAddress : "",
  customerNote: formData.notes || "",
};
console.log("📦 Checkout payload:", payload);

      // const { data } = await axios.post("/api/clover/create-checkout", payload);
      const { data } = await axios.post(`${API_BASE_URL}/api/clover/create-checkout`, payload);

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || "Failed to get checkout URL");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Checkout failed:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.details?.message ||
        error.response?.data?.error ||
        "Could not connect to the payment processor.";

      alert(`Checkout Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  const formError = getFormError();
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="space-y-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Checkout
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Fill in your details and complete your order securely.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-1.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("PICKUP")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    orderType === "PICKUP"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Store Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("DELIVERY")}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    orderType === "DELIVERY"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Home Delivery
                </button>
              </div>
            </div>

            <section className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.18em] text-slate-400">
                  Customer Information
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    required
                    value={formData.fullName}
                    className={inputClass}
                    placeholder="Enter your full name"
                    onChange={e => updateField("fullName", e.target.value)}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    className={inputClass}
                    placeholder="joe@example.com"
                    onChange={e => updateField("email", e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Phone Number</label>
                  <input
                    required
                    value={formData.phone}
                    className={inputClass}
                    placeholder="+1..."
                    onChange={e => updateField("phone", e.target.value)}
                  />
                </div>
              </div>
            </section>

            {orderType === "DELIVERY" && (
              <section className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Address Line 1</label>
                    <input
                      required
                      value={formData.addressLine1}
                      className={inputClass}
                      placeholder="Street address or P.O. Box"
                      onChange={e =>
                        updateField("addressLine1", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Apt, Suite, Unit</label>
                    <input
                      value={formData.addressLine2}
                      className={inputClass}
                      placeholder="Apt#"
                      onChange={e =>
                        updateField("addressLine2", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <div>
                      <label className={labelClass}>City</label>
                      <input
                        required
                        value={formData.city}
                        className={inputClass}
                        placeholder="Seattle"
                        onChange={e => updateField("city", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>State</label>
                      <input
                        required
                        maxLength={2}
                        value={formData.state}
                        className={`${inputClass} uppercase`}
                        placeholder="WA"
                        onChange={e => updateField("state", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>ZIP Code</label>
                      <input
                        required
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.zip}
                        className={inputClass}
                        placeholder="98409"
                        onChange={e => updateField("zip", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-3">
              <label className={labelClass}>Order Notes</label>
              <textarea
                rows={4}
                value={formData.notes}
                className={`${inputClass} resize-none`}
                placeholder="Anything you'd like the store to know?"
                onChange={e => updateField("notes", e.target.value)}
              />
            </section>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Order Summary</h2>

         <div className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-start justify-between gap-4 text-sm">
                  <div className="flex-1 text-slate-600">
                    <span className="mr-2 font-bold text-orange-600">{item.quantity}×</span>
                    {item.product.name}
                  </div>
                  <div className="font-bold text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          <div className="mt-6 space-y-3 border-t border-dashed border-slate-200 pt-6">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal ({totalItemsCount} item{totalItemsCount !== 1 ? "s" : ""})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

             {orderType === "DELIVERY" && subtotal > 0 && (
  <div className="flex justify-between text-sm text-slate-500">
    <div className="flex flex-col">
      <span className="font-medium">Shipping</span>
      <span className="text-[10px] leading-none text-slate-400">
        {`$7.00 × ${totalItemsCount} item${totalItemsCount > 1 ? 's' : ''}`}
      </span>
    </div>
    <span className="font-bold text-slate-900">
      ${shippingFee.toFixed(2)}
    </span>
  </div>
)}

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex flex-col">
                  <span className="text-lg font-black text-slate-900">Total</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">Inc. Taxes & Fees</span>
                </div>
                <span className="text-3xl font-black text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>

         {orderType === "DELIVERY" && totalItemsCount > 0 && (
  <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3">
    <p className="text-[11px] font-bold leading-tight text-blue-700">
      💡 Note: Shipping is calculated at a flat rate of $7.00 per item in your cart.
    </p>
  </div>
)}
            </div>
            {formError && (
              <p className="mt-4 text-sm font-medium text-red-500">
                {formError}
              </p>
            )}
            <button
              form="checkout-form"
              disabled={
                loading || cart.length === 0 || !!formError || total === 0
              }
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-orange-600 px-6 text-sm font-black text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
