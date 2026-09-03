import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  desc: string;
};

const DeleteModal = ({ isOpen, onClose, onConfirm, title, desc }: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[420px] !rounded-[12px] border-[#E8EAE6] bg-white p-5 shadow-xl sm:p-6">
        <DialogHeader className="">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0F1] text-[#D92D20]"><Trash2 className="h-6 w-6" /></span>
          <DialogTitle className="text-center text-xl font-semibold text-[#292D27]">{title}</DialogTitle>
          <DialogDescription className="pt-1 text-center text-sm font-normal leading-6 text-[#747A70]">
            {desc}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="col-span-1">
            <button
              className="h-11 w-full rounded-xl border border-[#CDD2C9] bg-white px-5 text-sm font-semibold text-[#4E554A] transition hover:bg-[#F2F4F0]"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
          <div className="col-span-1">
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D92D20] px-6 text-sm font-semibold text-white transition hover:bg-[#B42318] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D92D20]/30"
              onClick={onConfirm}
            >
             <Trash2 className="h-4 w-4"/> Delete
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
