import { RefreshCcw, TriangleAlert } from "lucide-react";

interface ErrorContainerProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

const ErrorContainer = ({ message, title = "Something went wrong", onRetry }: ErrorContainerProps) => {
  return (
    <div role="alert" className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl border border-[#F2D4D7] bg-white px-5 py-10 text-center shadow-[0_4px_18px_rgba(50,59,44,0.05)]">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F1] text-[#D92D20]">
        <TriangleAlert className="h-7 w-7" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-[#2D312B]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#747A70]">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl border border-primary px-4 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30">
          <RefreshCcw className="h-4 w-4" /> Try again
        </button>
      )}
    </div>
  );
};

export default ErrorContainer;
