"use client"

import { trpc } from "@/trpc/client";
// import {   useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
 
export default function AdminDashboard() {
  // const user = useUser();
  // If the user does not have the admin role, redirect them to the home page
  // if (sessionClaims?.metadata.role !== "admin") {
  //   redirect("/");
  // }

  const { mutate, isLoading } = trpc.tvShows.add.useMutation({
    onError: (err) => {
      console.log(err)
    },
    onSuccess: () => {
     console.log('success')
    }
  })

  const onSubmit = async () => {
  mutate({ 
    name: 'superman',
    posterLink: 'https://google.com'
  })
  }

 
  return (
    <>
      <h1>This is the admin dashboard</h1>      
      <p>This page is restricted to users with the 'admin' role.</p>
      <button onClick={onSubmit}>cool button</button>
    </>
  );
}