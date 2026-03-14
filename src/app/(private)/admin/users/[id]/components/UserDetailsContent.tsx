"use client";

import { useGetUserDetails } from "@/lib/actions/users/details.user";

import Header from "../../../component/layouts/header";
import AdminActions from "./admin-actions";
import BookingHistory from "./booking-history";
import FullProfile from "./full-profile";
import JobHistory from "./job-history";
import ReviewsSubmitted from "./reviews-submitted";
import { UserDetailsPageSkeleton } from "./skeletons";

interface UserDetailsContentProps {
  userId: string;
}

export default function UserDetailsContent({ userId }: UserDetailsContentProps) {
  const { data, isLoading, isError } = useGetUserDetails(userId);

  if (isLoading) {
    return <UserDetailsPageSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">User not found</p>
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="space-y-6">
      <Header title={user.name} subtitle="Complete user profile and activity history" />
      <div className="space-y-6">
        <FullProfile user={user} />
        <AdminActions userId={user.id} userStatus={user.status} />
        <JobHistory jobs={user.jobs} />
        <BookingHistory bookings={user.bookings} />
        <ReviewsSubmitted reviews={user.reviews ?? []} />
      </div>
    </div>
  );
}
