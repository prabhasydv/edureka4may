import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateCheckoutSessionMutation, useVerifyPaymentMutation } from "@/features/api/purchaseApi";

const BuyCourseButton = ({ courseId, selectedOption }) => {
  // Hook to create checkout session (RTK Query mutation)
  const [
    createCheckoutSession,
    { isLoading, isError, error },
  ] = useCreateCheckoutSessionMutation();

  // Hook to verify payment status after Razorpay payment
  const [verifyPayment] = useVerifyPaymentMutation();

  // Function to handle course purchase
  const purchaseCourseHandler = async () => {
    // Validate courseId and selectedOption
    if (!courseId) {
      toast.error("Invalid course ID");
      return;
    }

    if (!selectedOption?.optionName) {
      toast.error("Please select a pricing option before proceeding.");
      return;
    }

    console.log("Selected option:", selectedOption);  // Log to ensure correct selectedOption

    try {
      // Request checkout session from the backend API
      const response = await createCheckoutSession({
        courseId,
        selectedOptionName: selectedOption.optionName,  // Send selected option to the backend
      }).unwrap();

      if (!response?.orderId || !response?.key) {
        toast.error("Invalid response from server");
        return;
      }

      // Razorpay payment configuration
      const options = {
        key: response.key, // Razorpay API key
        amount: response.amount, // Amount in paise (1 INR = 100 paise)
        currency: response.currency, // Currency (INR or others)
        name: "The Eduocean", // Company name
        description: response.courseTitle, // Course title description
        image: response.thumbnail, // Course thumbnail
        order_id: response.orderId, // Razorpay order ID
        handler: async function (paymentResponse) {
          // On successful payment, verify the payment with the backend
          try {
            const verifyRes = await verifyPayment({
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              courseId, // Include courseId for verification
              selectedOptionName: selectedOption.optionName, // Verify selected option
            }).unwrap();

            // If payment is verified, show success toast and reload page
            toast.success("Payment verified and course purchased!");
            setTimeout(() => {
              window.location.reload(); // Reload the page after a successful purchase
            }, 2000);
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            toast.error("Payment verification failed!");
          }
        },
        theme: {
          color: "#4F46E5", // Razorpay button color
        },
      };

      // Initialize Razorpay with the payment options
      const rzp = new window.Razorpay(options);
      rzp.open(); // Open the Razorpay payment window
    } catch (err) {
      toast.error("Failed to initiate checkout");
      console.error("Checkout error:", err);
    }
  };

  // Show error toast if any error occurs during mutation
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session");
    }
  }, [isError, error]);

  return (
    <Button
      disabled={isLoading || !selectedOption?.optionName}  // Disable button if no option is selected or loading
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        selectedOption
          ? `Buy - $${selectedOption.price || "N/A"}`  // Display selected price
          : "Select Pricing Option"  // Prompt user to select an option
      )}
    </Button>
  );
};

export default BuyCourseButton;





// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useCreateCheckoutSessionMutation, useVerifyPaymentMutation } from "@/features/api/purchaseApi";

// const BuyCourseButton = ({ courseId }) => {
//   const [
//     createCheckoutSession,
//     { isLoading, isError, error },
//   ] = useCreateCheckoutSessionMutation();
//   const [verifyPayment] = useVerifyPaymentMutation();

//   const purchaseCourseHandler = async () => {
//     if (!courseId) {
//       toast.error("Invalid course ID");
//       return;
//     }

//     try {
//       const response = await createCheckoutSession({ courseId }).unwrap();

//       if (!response?.orderId || !response?.key) {
//         toast.error("Invalid response from server");
//         return;
//       }

//       const options = {
//         key: response.key,
//         amount: response.amount,
//         currency: response.currency,
//         name: "The Eduocean",
//         description: response.courseTitle,
//         image: response.thumbnail,
//         order_id: response.orderId,
//         handler: async function (paymentResponse) {
//           try {
//             const verifyRes = await verifyPayment({
//               razorpay_payment_id: paymentResponse.razorpay_payment_id,
//               razorpay_order_id: paymentResponse.razorpay_order_id,
//               razorpay_signature: paymentResponse.razorpay_signature,
//               courseId,
//             }).unwrap();

//             toast.success("Payment verified and course purchased!");
//             setTimeout(() => {
//               window.location.reload(); // This will reload the page after 2 seconds
//             }, 2000);
//           } catch (verifyError) {
//             console.error("Payment verification failed:", verifyError);
//             toast.error("Payment verification failed!");
//           }
//         },
//         // prefill: {
//         //   // name: "John Doe",
//         //   email: user?.email || "john@example.com",
//         // },
//         theme: {
//           color: "#4F46E5",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       toast.error("Failed to initiate checkout");
//       console.error("Checkout error:", err);
//     }
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(error?.data?.message || "Failed to create checkout session");
//     }
//   }, [isError, error]);

//   return (
//     <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;

