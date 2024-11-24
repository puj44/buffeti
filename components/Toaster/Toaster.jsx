import { resetUiAction } from "@/redux/reducers/uiReducer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Toaster() {
  const { toasterPayload } = useSelector((state) => state.ui);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer = null;
    if (toasterPayload?.message && toasterPayload.message !== "") {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
        dispatch(resetUiAction());
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toasterPayload]);
  if (show && toasterPayload?.message) {
    return (
      <div className={`toaster toaster-${toasterPayload?.type}`}>
        <span>
          <Image
            src={`/icons/${toasterPayload.type}_t.webp`}
            width={20}
            height={20}
            alt="Icon"
          />
        </span>
        <p className="font-semibold">{toasterPayload?.message ?? ""}</p>
        <span
          className="self-center cursor-pointer ms-2"
          onClick={() => {
            setShow(false);
            dispatch(resetUiAction());
          }}
        >
          <Image src={`/icons/close.webp`} width={14} height={14} alt="Close" />
        </span>
      </div>
    );
  }
}

export default Toaster;
