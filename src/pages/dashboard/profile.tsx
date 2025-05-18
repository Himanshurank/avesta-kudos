import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { motion } from "framer-motion";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.auth_token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ProfilePage = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("profile");

  // Form state with extended user information
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the profile page");
      router.push("/auth/login");
    }

    // Populate form data with user info when available
    if (user) {
      // Extract first and last name from user's full name
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData({
        name: user.name || "",
        email: user.email || "",
        firstName: firstName,
        lastName: lastName,
        bio: "",
        phoneNumber: "",
      });
    }
  }, [user, loading, router]);

  // Validate form fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (formData.phoneNumber && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (!formTouched) {
      setFormTouched(true);
    }
  };

  // Handle blur events for validation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    
    // Validate specific field
    const fieldErrors: Record<string, string> = {};
    
    if (name === 'firstName' && !formData.firstName.trim()) {
      fieldErrors.firstName = "First name is required";
    }
    
    if (name === 'lastName' && !formData.lastName.trim()) {
      fieldErrors.lastName = "Last name is required";
    }
    
    if (name === 'phoneNumber' && formData.phoneNumber && 
        !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phoneNumber)) {
      fieldErrors.phoneNumber = "Please enter a valid phone number";
    }
    
    setErrors(prev => ({
      ...prev,
      ...fieldErrors
    }));
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      // Here you would implement the API call to update the profile
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Profile information updated successfully!");
      setFormTouched(false);
      setSuccessMessage("Your profile has been updated successfully!");
      
      // Update the user's name in context if necessary
      // (This would depend on your auth context implementation)
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If still loading or no user, show loading screen
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="relative">
              {/* Header Background with Decorative Elements */}
              <div className="h-64 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/30 blur-xl"></div>
                  <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-pink-500/20 blur-xl"></div>
                  <div className="absolute bottom-10 left-1/3 w-40 h-40 rounded-full bg-yellow-500/20 blur-xl"></div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/30"></div>
              </div>

              {/* Profile Info Section */}
              <div className="p-8 sm:p-10 flex flex-col md:flex-row gap-8 relative">
                {/* Avatar Container */}
                <div className="absolute -top-20 left-8 sm:left-10 md:left-10">
                  <div className="relative group">
                    <div className="w-40 h-40 bg-white rounded-2xl p-1.5 shadow-xl ring-4 ring-white transition-transform group-hover:scale-105 duration-300">
                      <div className="w-full h-full bg-indigo-600 rounded-xl flex items-center justify-center text-4xl font-bold text-white">
                        {`${formData.firstName?.[0] || ""}${formData.lastName?.[0] || ""}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="mt-20 md:mt-0 md:ml-44 flex-grow">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
                    <span className="font-medium">Product Designer</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                    <span>Design Team</span>
                  </div>

                  <div className="flex flex-wrap mt-5 gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Active
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Joined {user.createdAt && new Date(user.createdAt) instanceof Date ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recently'}
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section Navigation Tabs */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          

            <div className="p-6 sm:p-8">
              {/* Personal Information Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl"
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Personal Information</h2>
                    <p className="text-sm text-gray-500">Update your personal details and how others see you on the platform</p>
                  </div>

                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`block w-full rounded-lg shadow-sm px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.firstName 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : formData.firstName 
                                ? 'border-green-300' 
                                : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`block w-full rounded-lg shadow-sm px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.lastName 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : formData.lastName 
                                ? 'border-green-300' 
                                : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 bg-gray-50"
                          disabled
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Email cannot be changed. Contact admin for assistance.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="e.g. +1 (555) 123-4567"
                          className={`block w-full rounded-lg shadow-sm px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 ${
                            errors.phoneNumber 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : formData.phoneNumber 
                                ? 'border-green-300' 
                                : 'border-gray-300'
                          }`}
                        />
                        {errors.phoneNumber && (
                          <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                        )}
                      </div>
                    </div>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-start">
                        <span className="bg-white pr-3 text-sm font-medium text-gray-500">Additional Information</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2 md:col-span-2">
                        <label
                          htmlFor="bio"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          id="bio"
                          rows={4}
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself"
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3 resize-none"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Brief description for your profile. URLs are hyperlinked.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {successMessage}
                        </div>
                      )}
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          disabled={isSubmitting || !formTouched}
                          onClick={() => {
                            if (user) {
                              const nameParts = user.name ? user.name.split(" ") : ["", ""];
                              const firstName = nameParts[0] || "";
                              const lastName = nameParts.slice(1).join(" ") || "";
                              
                              setFormData({
                                name: user.name || "",
                                email: user.email || "",
                                firstName: firstName,
                                lastName: lastName,
                                bio: "",
                                phoneNumber: "",
                              });
                              setErrors({});
                              setFormTouched(false);
                              setSuccessMessage("");
                            }
                          }}
                          className={`inline-flex justify-center items-center rounded-lg border py-3 px-6 text-sm font-medium shadow-sm focus:outline-none transition-all ${
                            isSubmitting || !formTouched
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          }`}
                        >
                          Reset
                        </button>
                        <motion.button
                          whileHover={{ scale: formTouched && !isSubmitting ? 1.02 : 1 }}
                          whileTap={{ scale: formTouched && !isSubmitting ? 0.98 : 1 }}
                          type="submit"
                          disabled={isSubmitting || !formTouched}
                          className={`inline-flex justify-center items-center rounded-lg border border-transparent py-3 px-6 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
                            isSubmitting 
                              ? "bg-indigo-500" 
                              : !formTouched 
                                ? "bg-indigo-400 cursor-not-allowed" 
                                : "bg-indigo-600 hover:bg-indigo-700"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
