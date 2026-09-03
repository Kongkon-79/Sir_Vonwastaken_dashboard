import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TableSkeletonWrapperProps {
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

const TableSkeletonWrapper: React.FC<TableSkeletonWrapperProps> = ({
  width = "100%", 
  height = "120px", 
  className = "", 
  count = 1
}) => {
  return (
    <div aria-label="Loading content" aria-busy="true" className="flex flex-col gap-3 overflow-hidden rounded-xl border border-[#E8EAE6] bg-white p-4">
      {[...Array(count)].map((_, index) => (
        <Skeleton 
          key={index} 
          className={`rounded-lg bg-[#E9ECE7] ${className}`} 
          style={{ width, height }} 
        />
      ))}
    </div>
  );
};

export default TableSkeletonWrapper;
