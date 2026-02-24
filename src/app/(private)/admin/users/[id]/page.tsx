import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { usersData } from "../data/users";
import {
  AdminActions,
  BookingHistory,
  FullProfile,
  JobHistory,
  ReviewsSubmitted
} from "./components";
import { UserDetailsPageSkeleton } from "./components/skeletons";

interface UserPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function UserDetails({ userId }: { userId: string }) {
  const user = usersData.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header title={user.name} subtitle="Complete user profile and activity history" />
      <div className="space-y-6">
        <FullProfile
          email={user.email}
          phone={user.phone}
          details={user.details}
          registered={user.registered}
        />
        <AdminActions userId={user.id} />
        <JobHistory jobs={user.details?.jobHistory ?? []} />
        <BookingHistory bookings={user.details?.bookingHistory ?? []} />
        <ReviewsSubmitted reviews={user.details?.reviews ?? []} />
      </div>
    </div>
  );
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<UserDetailsPageSkeleton />}>
      <UserDetails userId={id} />
    </Suspense>
  );
}
