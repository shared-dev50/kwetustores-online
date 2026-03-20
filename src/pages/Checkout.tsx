import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import axios from "axios";

type OrderType = "PICKUP" | "DELIVERY";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-500 focus:bg-white";
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

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const total = subtotal;

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

      const combinedNote = `
ORDER TYPE: ${orderType}
${orderType === "DELIVERY" ? `SHIP TO: ${formattedAddress}` : "METHOD: Pickup at Store"}
PHONE: ${formData.phone}
${formData.notes ? `CUSTOMER NOTE: ${formData.notes}` : ""}
      `.trim();

      const payload = {
        items: cart,
        customer: {
          firstName,
          lastName,
          email: formData.email,
          phoneNumber: formData.phone,
        },
        orderType,
        address: combinedNote,
      };

      const { data } = await axios.post("/api/clover/create-checkout", payload);

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
                    placeholder="Joe Doe"
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
                <div
                  key={item.product.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div className="flex-1 text-slate-600">
                    <span className="mr-2 font-bold text-orange-600">
                      {item.quantity}×
                    </span>
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
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-lg font-black text-slate-900">Total</span>
                <span className="text-3xl font-black text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              form="checkout-form"
              disabled={loading || cart.length === 0}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-orange-600 px-6 text-sm font-black text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
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
