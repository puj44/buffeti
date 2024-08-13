import getTimeValues from "@/commonjs/getTimeValues";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useMemo } from "react";
const customDropdownTheme = {
  content: "py-0",
  floating: {
    divider: "my-1 h-px ",
    item: {
      container: "bg-white ",
      base: "flex p-0 cursor-pointer px-0 py-0 bg-white focus:outline-none",
      icon: "mr-2 h-4 w-4",
    },

    style: {
      dark: "p-0 bg-white rounded-lg   mt-1",
      light: "p-0 bg-white rounded-lg   mt-1",
      auto: "p-0 bg-white rounded-lg   mt-1",
    },
  },
};
function OrderTimePicker({ handleChangeTime, value }) {
  const timeValues = useMemo(() => {
    return getTimeValues();
  }, []);
  const timeValue = (val) => {
    const split = val?.split(":")?.[0];
    const timeStamp =
      parseInt(split) >= 12 || parseInt(split) <= 10 ? "pm" : "am";
    return `${val} ${timeStamp}`;
  };
  return (
    <div className="border-[1px] border-[#E3E5E5] rounded-lg flex   py-2 px-2 md:px-4">
      {
        <Dropdown
          theme={{ ...customDropdownTheme }}
          label=""
          renderTrigger={() => (
            <div className="flex flex-row gap-3 w-full justify-start items-center cursor-pointer">
              <Image
                src={"/icons/clock.webp"}
                width={24}
                height={24}
                priority
                alt=""
              />
              <div className="">{timeValue(value)}</div>
            </div>
          )}
          placement="bottom"
        >
          <Dropdown.Item
            as="div"
            className="flex flex-col py-3 px-3 max-h-[300px] overflow-y-scroll"
          >
            {timeValues.map((tv, idx) => {
              return (
                <div
                  key={"time-" + idx}
                  onClick={() => {
                    handleChangeTime(tv);
                  }}
                  className="hover:bg-gray-200 p-1.5 rounded-md"
                >
                  {timeValue(tv)}
                </div>
              );
            })}
          </Dropdown.Item>
        </Dropdown>
      }
    </div>
  );
}

export default OrderTimePicker;
