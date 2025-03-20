import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import { toast } from "react-toastify"; // Importing Toastify
import Loading from "./Loading";
import Error from "./Error";

function Checkout(props) {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderState;

  const tokenHandler = (token) => {
    console.log("Stripe Token Received: ", token);
    dispatch(placeOrder(token, props.subtotal));
  };

  // Show toast notifications for loading, error, and success
  React.useEffect(() => {
    if (loading) {
      toast.info("Placing your order, please wait...");
    }
    if (error) {
      toast.error("Payment failed, please try again.");
    }
    if (success) {
      toast.success("Your order was placed successfully!");
      localStorage.removeItem("cartItems");
      window.location.reload();
      window.location.href="/orders?orderplaced=true"
    }
  }, [loading, error, success]);

  return (
    <div>
        <StripeCheckout
        amount={props.subtotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51QdSigATOtobaEjqUTdDr9XHXDkGlV3v6W8rhdTqZGXhkIKR2keoApoPFHn2lvEA70eKJdWHvyrDQ1PHkXVLeqAZ00VeLd3GcS"
        currency="INR"
      >
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow hover:bg-indigo-700 transition duration-300">
          Pay Now: ₹{props.subtotal}
        </button>
      </StripeCheckout>
    </div>
  );
}

export default Checkout;
