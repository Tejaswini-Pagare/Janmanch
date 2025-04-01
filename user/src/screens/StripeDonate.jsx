import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe("pk_test_51QdSigATOtobaEjqUTdDr9XHXDkGlV3v6W8rhdTqZGXhkIKR2keoApoPFHn2lvEA70eKJdWHvyrDQ1PHkXVLeqAZ00VeLd3GcS");

const StripeDonate = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    if (!amount || !name || !contact || !email) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const stripe = await stripePromise;
      const response = await fetch("https://janmanch-cep.onrender.com/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, contact, email }),
      });
      
      const session = await response.json();
      if (!session.id) {
        throw new Error("Payment session creation failed.");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) toast.error(result.error.message);
      toast.success("Payment Done Successfully! You will receive a confirmation email.");
    } catch (error) {
      toast.error("Payment failed. Try again.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Your Contact" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (INR)" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
      <button onClick={handlePayment} className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
        {loading ? "Processing..." : "Donate via Stripe"}
      </button>
    </div>
  );
};

export default StripeDonate;
