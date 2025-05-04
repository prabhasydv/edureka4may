import { basedURL } from "@/lib";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: COURSE_PURCHASE_API,
    baseUrl: (`${basedURL}/api/v1/purchase`),
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // createCheckoutSession: builder.mutation({
    //   query: ({courseId}) => ({
    //     url: "/checkout/create-checkout-session",
    //     method: "POST",
    //     body: { courseId },
    //   }),
    createCheckoutSession: builder.mutation({
      query: ({ courseId, selectedOptionName }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId, selectedOptionName },  // Send pricingOptionId too
      }),  
    }),
    // getCourseDetailWithStatus: builder.query({
    //   query: (courseId) => ({
    //     url: `/course/${courseId}/detail-with-status`,
    //     method: "GET",
    //   }),
    // }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => {
        if (!courseId) return ''; // prevent malformed URLs
        return {
          url: `/course/${courseId}/detail-with-status`,
          method: "GET",
        };
      },  
    }),
    
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/verify",
        method: "POST",
        body: paymentData,
      }),
    }),

    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
  useVerifyPaymentMutation,
} = purchaseApi;

