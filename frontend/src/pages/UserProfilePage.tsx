// import React from 'react'

import { useGetMyuser, useUpdateMyUser } from "@/api/MyUserApi";
import { UserProfileForm } from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyuser();
  const { updateUser, isLoading: isupdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading.</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user Profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isupdateLoading}
    />
  );
};

export default UserProfilePage;
