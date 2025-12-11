import React, { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api";
import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";

const updateProfile = async (userData) => {
  const { id: _, ...data } = userData;
  const { data: updatedUser } = await apiClient.patch(`/users/me`, data);
  return updatedUser;
};

const ProfilePage = () => {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user", updatedUser.id], updatedUser);
      alert("Profile updated!");
      navigate("/");
    },
    onError: (error) => {
      console.error("Update failed", error);
      alert("Failed to update profile.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: user._id, name: name });
  };

  if (isUserLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Your Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={user?.email || ""} disabled />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={styles.saveButton}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
