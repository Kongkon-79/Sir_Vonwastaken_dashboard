
"use client"
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react'
import React from 'react'
import { UserProfileApiResponse } from './user-data-type';
import ProfilePicture from './profile-picture';
import { SettingSidebarSkeleton } from './setting-sidebar-skeleton';
import { StateError } from '@/components/shared/async-states';

const SettingSidebar = () => {
  const session = useSession();
  const status = session?.status;
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, isError, refetch } = useQuery<UserProfileApiResponse>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch(`/api/auth-backend/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      return await res.json();
    },
    enabled: !!token
  })

  const fullName =
    data?.data?.fullName ||
    [data?.data?.firstName, data?.data?.lastName].filter(Boolean).join(" ") ||
    "N/A";

  if (status === "loading" || isLoading) {
    return <SettingSidebarSkeleton />;
  }
  if (isError) return <StateError message="Your profile details could not be loaded." action={{ label: "Try again", onClick: refetch }} />;


  return (
    <div>
      <div className="h-auto pb-5 bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
        <div className="w-full h-[187px] rounded-t-lg bg-primary" />
        {/* profile picture  */}
        <div>
          <ProfilePicture />
        </div>
        {/* user info  */}
        <div className='pt-6 pb-10'>
          <h4 className="text-xl md:text-2xl font-semibold leading-[120%] text-primary text-center">{fullName} </h4>
          <p className='text-sm font-normal leading-[120%] text-[#68706A] text-center pt-1'>{data?.data?.email || "N/A"}</p>
        </div>
        <div className='px-6'>
          <ul>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] "><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Name :</strong> {fullName} </li>
             <li className="text-base font-normal text-[#5B6574] leading-[120%] pt-3"><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Bio :</strong> {data?.data?.bio || "N/A"}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] py-3"><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Email :</strong> {data?.data?.email || "N/A"}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] "><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Phone :</strong> {data?.data?.phoneNumber || "N/A"}</li>
            <li className="text-base font-normal text-[#5B6574] leading-[120%] py-3"><strong className="text-base font-semibold leading-[120%] text-[#5B6574]">Location :</strong> {data?.data?.address || "N/A"}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingSidebar
