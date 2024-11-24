import Image from "next/image";
import Link from "next/link";
import React from "react";

function MiniThaliCard() {
  return (
    <div className="rounded-lg bg-primary p-3 w-full overflow-hidden sm:p-7 min-h-[266px] relative">
      <div className="absolute bottom-[-8px] right-[-68px] ">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/mini_meals_card.webp`}
          width={300}
          height={300}
          alt="Snackbox"
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-2 sm:gap-0">
          <div className="flex flex-col gap-0">
            <p className="text-color-offwhite w-fit font-medium md:font-bold card-heading">
              {"View"}
            </p>
            <p className="text-white w-fit font-medium md:font-bold card-heading">
              {"Mini Meals"}
            </p>
          </div>
          <p className="small-title text-white max-w-[60%] sm:max-w-[100%]">
            {"View the Mini Meal combos designed only for you"}
          </p>
        </div>
        <Link
          href={"/packages/mini-meals"}
          className="flex text-white items-center flex-row gap-2"
        >
          <p className="flex">View</p>
          <div className="flex">
            <Image
              src={"/arrows/r_arrow.webp"}
              width={9}
              height={14}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt={"arrow"}
              priority
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MiniThaliCard;
