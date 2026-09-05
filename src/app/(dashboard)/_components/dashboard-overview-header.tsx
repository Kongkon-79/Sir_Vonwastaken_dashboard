import React from "react";

const DashboardOverviewHeader = ({title, description}:{title: string, description:string}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E7E2DA] bg-[#F6F1EA]/95 py-4 shadow-[0_2px_10px_rgba(50,59,44,0.04)] backdrop-blur-md sm:py-5">
      <div className="mx-auto w-full max-w-[1600px] px-4 pl-16 sm:px-6 sm:pl-6 lg:px-6">
        <h1 className="text-xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-2xl lg:text-[28px]">
          {title}
        </h1>
        <p className="mt-1 max-w-3xl text-xs font-normal leading-relaxed text-primary/75 sm:text-sm">
          {description}
        </p>
      </div>
    </header>
  );
};

export default DashboardOverviewHeader;

















// "use client";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import React from "react";
// import admin from "../../../../public/assets/images/no-user.jpeg";
// import { UserProfileApiResponse } from "../settings/_components/user-data-type";
// import { useQuery } from "@tanstack/react-query";

// const DashboardOverviewHeader = () => {
//   const session = useSession();
//   const token = (session?.data?.user as { accessToken: string })?.accessToken;

//   // get api
//   const { data } = useQuery<UserProfileApiResponse>({
//     queryKey: ["profile-img"],
//     queryFn: () =>
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((res) => res.json()),
//     enabled: !!token,
//   });

//   return (
//     <div className="sticky top-0  z-50">
//       {/* Header */}
//       <div className="bg-white p-6 flex items-center justify-end">
//         <div className="flex items-center gap-2">
//           <div>
//             <h1 className="text-base lg:text-lg font-bold text-[#191919] leading-normal text-right">
//               {data?.data?.name || "N/A"}
//             </h1>
//             <p className="text-sm font-normal text-[#191919] leading-normal text-right">
//               {data?.data?.email || "N/A"}
//             </p>
//           </div>
//           <div>
//             <Image
//               src={data?.data?.profileImage || admin}
//               alt={data?.data?.name || "Admin"}
//               width={200}
//               height={200}
//               className="w-12 h-12 rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverviewHeader;
