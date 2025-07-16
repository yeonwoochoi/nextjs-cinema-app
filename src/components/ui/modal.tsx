"use client"

import { ReactNode, useRef, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import style from "./modal.module.css"

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
      dialog.scrollTo({ top: 0 })
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    }
  }, [])

  const onClickHandler = (e: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (dialog && e.target !== null && e.target === dialogRef.current as EventTarget) {
      dialog.close()
    }
  };

  const onCloseHandler = () => {
    router.back();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={clsx('bg-black text-white w-[80%] max-w-[600px] mx-auto p-6 my-5 rounded-md border-none', style.modal)}
      onClick={onClickHandler}
      onClose={onCloseHandler}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  )
}