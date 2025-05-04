import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";
import { basedURL } from "@/lib";

// const USER_API = "http://localhost:8080/api/v1/user/"
// const USER_API = "/api/v1/user/"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        // baseUrl:USER_API,
        baseUrl: (`${basedURL}/api/v1/user`),
        credentials:'include'
    }),
    endpoints: (builder) => ({

        // 🔵 Instructor Form Submission
        submitInstructorApplication: builder.mutation({
            query: (formData) => ({
            url: "/submit-instructor-application",
            method: "POST",
            body: formData,
            }),
        }),

        // 🔵 Submit Contact Form to Advisor (Updated Route)
        submitContactFormAdvisor: builder.mutation({
            query: (formData) => ({
            url: "/contact-advisor", // Updated to /contact-advisor
            method: "POST",
            body: formData,
            }),
        }),

        // Mutation for submitting contact form
        submitContactForm: builder.mutation({
            query: (formData) => ({
            url: "contact",
            method: "POST",
            body: formData,
            }),
        }),

        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});
export const {
    useSubmitContactFormAdvisorMutation,
    useSubmitInstructorApplicationMutation,
    useSubmitContactFormMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;
