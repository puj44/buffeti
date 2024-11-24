import moment from "moment";
import Image from "next/image";
import React from "react";

function OrderInformation({ packs, deliveryDate, deliveryTime, address }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <div className="information-box">
        <div>
          <Image src={"/icons/pax.webp"} width={20} height={18} alt="pax" />
        </div>
        <p>{packs + " Pax"}</p>
      </div>
      <div className="information-box">
        <div>
          <Image
            src={"/icons/calender.webp"}
            width={20}
            height={20}
            alt="delivery-date"
            style={{
              maxWidth: "20px",
              maxHeight: "20px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <p>{moment(new Date(deliveryDate)).format("DD/MM/YY")}</p>
      </div>
      <div className="information-box">
        <div>
          <Image
            src={"/icons/clock.webp"}
            width={20}
            height={20}
            alt="delivery-time"
            style={{
              maxWidth: "20px",
              maxHeight: "20px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <p>{deliveryTime}</p>
      </div>
      {/* <div className="information-box ">
        <div>
          <Image
            src={"/icons/address.webp"}
            width={18}
            height={20}
            style={{
              minWidth: "18px",
              minHeight: "20px",
            }}
            alt="address"
          />
        </div>
        <p>{address ?? "1st Floor, Moon Appartments, Sobo, Ahmedabad"}</p>
      </div> */}
    </div>
  );
}

export default OrderInformation;
