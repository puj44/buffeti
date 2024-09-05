import { resetAction } from "@/redux/reducers/uiReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Toaster() {
  const { toasterPayload } = useSelector((state) => state.ui);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (toasterPayload?.message && toasterPayload.message !== "") {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(resetAction());
      }, 4000);
    }
  }, [toasterPayload]);
  if (show && toasterPayload?.message) {
    return <div className="toaster">{toasterPayload?.message ?? ""}</div>;
  }
}

export default Toaster;
