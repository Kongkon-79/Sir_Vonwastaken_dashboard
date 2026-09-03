

import { SearchX } from "lucide-react";
import React from "react";

interface Props {
  message: string;
  title?: string;
  action?: React.ReactNode;
}

const NotFound = ({ message, title = "Nothing found", action }: Props) => {
  return (
    <div className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#CDD3C8] bg-white px-5 py-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F3EE] text-primary">
        <SearchX className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-[#2D312B]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#747A70]">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default NotFound;
