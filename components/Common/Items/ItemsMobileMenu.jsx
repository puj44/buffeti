import React from "react";
import { Dropdown, Flowbite } from "flowbite-react";
import Image from "next/image";
const customMenuTheme = {
  content: "py-0 pt-1 focus:outline-none w-max",
  floating: {
    divider: "my-1 h-px bg-[#E3E5E5]",
    item: {
      container: "",
      base: "flex  cursor-pointer px-0 py-1.5 pe-4 items-center justify-start small-title focus:outline-none",
      icon: "mr-2 h-4 w-4",
    },

    style: {
      dark: "menu-box focus:outline-none",
      light: "menu-box focus:outline-none",
      auto: "menu-box focus:outline-none",
    },
  },
};

function ItemsMobileMenu({
  show,
  activeItem,
  itemsSelected,
  items,
  handleChangeActiveItem,
}) {
  const onClick = (subCategory) => {
    const element = document.getElementById("body-" + subCategory);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  if (show)
    return (
      <div className="fixed right-[26px] bottom-[20px] flex justify-end  z-20">
        <Dropdown
          label=""
          placement="top"
          theme={customMenuTheme}
          renderTrigger={() => (
            <div className="flex flex-row justify-center px-3 py-2 gap-1 items-center bg-primary rounded-[30px]  ">
              <div className="w-[18px] h-[14px] my-auto">
                <Image
                  src={"/icons/menu_i.webp"}
                  width={76}
                  height={57}
                  priority
                  alt="menu"
                />
              </div>
              <p className="placeholder font-bold text-white">{"Menu"}</p>
            </div>
          )}
        >
          {items &&
            Object.keys(items)?.length > 0 &&
            Object.keys(items).map((i, idx) => {
              const item = items[i];
              return (
                <>
                  <Dropdown.Item
                    key={"category-" + i}
                    as="div"
                    className={` flex  flex-col gap-1`}
                  >
                    <div
                      className={`relative self-baseline  flex h-[34px] w-full items-center flex-row gap-1 package-title font-medium sidebar ${
                        activeItem === i
                          ? "active-sidebar font-medium my-auto"
                          : ""
                      }`}
                      onClick={() => {
                        console.log("HERE222", i);

                        handleChangeActiveItem(i);
                        scrollToTop();
                      }}
                    >
                      <h4 className="w-fit">{items[i]?.name ?? items[i]}</h4>
                      {itemsSelected?.[i] &&
                        Object.keys(itemsSelected?.[i]).length > 0 && (
                          <div
                            className={`w-[24px] h-[24px] rounded-full  flex justify-content align-middle items-center z-10 ${
                              activeItem === i
                                ? "bg-white text-color-primary"
                                : "bg-primary text-white"
                            }`}
                          >
                            <p className=" number flex self-center m-auto">
                              {Object.keys(itemsSelected?.[i]).length}
                            </p>
                          </div>
                        )}
                    </div>
                    {activeItem === i &&
                    item.sub_categories &&
                    Object.keys(item.sub_categories).length > 0 ? (
                      <div className="ps-2 flex self-baseline flex-col gap-2">
                        {Object.keys(item.sub_categories).map((sub) => {
                          return (
                            <p
                              key={sub}
                              onClick={() => {
                                onClick(sub);
                              }}
                              className="text-color-primary cursor-pointer package-title"
                            >
                              {item.sub_categories[sub]}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </Dropdown.Item>
                </>
              );
            })}
        </Dropdown>
      </div>
    );
}

export default ItemsMobileMenu;
