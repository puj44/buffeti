import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import navbar from "@/json/navbar.json";
import { useRouter } from "next/router";
import { store } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import dynamic from "next/dynamic";
import { signout } from "@/redux/reducers/authReducer";
const Location = dynamic(() => import("../DynamicComponents/Location"), {
  ssr: false,
});
const customTheme = {
  floating: {
    divider: "my-1 h-px bg-[#E3E5E5]",
    item: {
      container: "",
      base: "flex  cursor-pointer px-0 py-1.5 pe-4 items-center justify-start small-title focus:outline-none",
      icon: "mr-2 h-4 w-4",
    },

    style: {
      dark: "dropdown-box focus:outline-none",
      light: "dropdown-box focus:outline-none",
      auto: "dropdown-box focus:outline-none",
    },
  },
};

function Header({ handleModelClick }) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cartDetails } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isPathActive = (url) => {
    if (url === "") {
      if (router.asPath === "/") {
        return true;
      }
    } else {
      if (router.asPath.includes(url)) return true;
    }
    return false;
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [mobileMenu]);

  return (
    <div className="page-spacing bg-primary">
      <div id="navbar" className="navbar flex justify-between ">
        <div className="flex flex-row gap-[85px]">
          <div className="w-[66.9px] h-[44px] md:w-[76.01px] md:h-[50px]">
            <Link href="/" className="focus:outline-none">
              <Image
                loader={({ src }) => src}
                src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/logo/primary_white.webp`}
                alt="Buffeti"
                width={2049}
                height={1354}
                className="cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                priority
              />
            </Link>
          </div>
          {/* <div className='hidden md:block my-auto'>
                    <Location />
                </div> */}
          <div
            className={`${
              mobileMenu
                ? "flex flex-col fixed left-0 top-0 w-screen h-screen z-50  py-5 bg-white z-50"
                : "hidden"
            } md:flex md:items-center`}
          >
            <div
              className="flex justify-end md:hidden w-full pb-5"
              style={{ borderBottomColor: "#F2F4F7", borderBottomWidth: "1px" }}
            >
              <div
                className="pe-5 "
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                <Image
                  src={"/icons/cross.webp"}
                  width={12}
                  height={12}
                  alt="cross"
                  priority
                />
              </div>
            </div>
            <div
              className={`flex flex-col w-fit md:flex-row h-fit gap-4 md:gap-5 xl:gap-7 py-5 md:py-0 px-5 md:my-auto`}
            >
              {navbar.map((n, idx) => {
                return n.isDropdown ? (
                  <div
                    className="hidden md:flex md:items-center my-auto"
                    key={"navbar-" + idx}
                  >
                    <Dropdown
                      label=""
                      theme={customTheme}
                      className={`hidden md:flex md:items-center cursor-pointer`}
                      renderTrigger={() => (
                        <div className="flex flex-row my-auto gap-2 cursor-pointer">
                          <h4
                            className="font-medium text-white"
                            id={`nav-dropdown-label `}
                          >
                            {n.title}
                          </h4>
                          <div
                            className=" w-[13px] h-[8px] my-auto"
                            id={`nav-dropdown-arrow`}
                          >
                            <Image
                              src={"/arrows/arrow_down.webp"}
                              width={41}
                              height={25}
                              alt="arrow"
                              style={{ width: "100%", height: "100%" }}
                              priority
                            />
                          </div>
                        </div>
                      )}
                    >
                      {n.dropdownData.map((data, index) => {
                        const isActive = isPathActive(data.slug);
                        return (
                          <>
                            <Dropdown.Item
                              as="div"
                              className={`${
                                isActive
                                  ? "active-path border-b-[0px] border-none"
                                  : ""
                              } `}
                              key={`item-` + data.slug}
                            >
                              <Link
                                href={data.url}
                                className={`w-full font-semibold ${
                                  isActive ? "text-color-primary" : ""
                                }`}
                              >
                                {data.title}
                              </Link>
                            </Dropdown.Item>
                            {index + 1 !== n.dropdownData.length && (
                              <Dropdown.Divider key={`item-` + index} />
                            )}
                          </>
                        );
                      })}
                    </Dropdown>
                  </div>
                ) : (
                  <Link
                    key={"navbar-" + idx}
                    href={"/" + n.url}
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                    className={`${
                      n.isMobile ? "flex md:hidden" : ""
                    } md:text-white   relative  md:flex flex-row gap-2 xl:gap-3 align-middle my-auto ${
                      n.className ?? ""
                    }`}
                  >
                    <h4
                      className={`${
                        isPathActive(n.url)
                          ? "active-nav-mobile md:active-path  "
                          : ""
                      } font-semibold my-auto`}
                    >
                      {n.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
            <div
              className="fixed bottom-0 left-0 pb-5 flex w-full pt-5  md:hidden"
              style={{ borderTopColor: "#F2F4F7", borderTopWidth: "1px" }}
            >
              <div
                className={`flex flex-row justify-between px-5 w-full items-center`}
              >
                <p
                  className={`${
                    !auth?.isAuthenticated
                      ? "btn primary-btn w-full h-fit font-semibold"
                      : "hidden"
                  } cursor-pointer`}
                  onClick={() => {
                    setMobileMenu(false);
                    handleModelClick(true);
                  }}
                >
                  {"Login"}
                </p>
                <div
                  className={`flex ${
                    auth?.isAuthenticated ? "" : "hidden"
                  } flex-row gap-3 items-center`}
                >
                  <Link
                    href="/account"
                    className={` flex justify-center cursor-pointer orange-circle text-white w-[38px] h-[38px] items-center align-middle my-auto`}
                    onClick={() => {
                      setMobileMenu(false);
                    }}
                  >
                    {auth?.user?.name?.toString()?.charAt(0) ?? "N"}
                  </Link>
                  <p className="font-semibold">{auth?.user?.name ?? ""}</p>
                </div>
                <div
                  className={`w-[15px] h-[15px] cursor-pointer ${
                    !auth?.isAuthenticated ? "hidden" : ""
                  } `}
                  onClick={() => {
                    dispatch(signout());
                  }}
                >
                  <Image
                    src={"/icons/logout.webp"}
                    width={68}
                    height={68}
                    loading="lazy"
                    alt="Logout"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden my-auto">
          <div
            className={`hamburger cursor-pointer`}
            onClick={() => {
              setMobileMenu(!mobileMenu);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="hidden md:flex flex-row gap-6">
          <div className="hidden md:block my-auto">
            <Location />
          </div>
          {cartDetails?.items && (
            <Link
              className="hidden md:block my-auto"
              onClick={(e) => {
                if (!auth?.isAuthenticated) {
                  e.preventDefault();
                  e.stopPropagation();
                  handleModelClick(true);
                }
              }}
              href="/cart"
            >
              <Image
                src={"/icons/cart.webp"}
                alt={"cart"}
                width={20}
                height={20}
                className="my-auto"
                priority
              />
            </Link>
          )}
          <div className="hidden md:flex md:items-center my-auto">
            <p
              onClick={() => {
                !auth?.isAuthenticated && handleModelClick(true);
              }}
              className={`${
                auth?.isAuthenticated
                  ? "hidden"
                  : "flex btn text-color-primary font-semibold bg-white  justify-center items-center my-auto"
              } `}
            >
              {"Login"}
            </p>

            <Link
              href={"/account"}
              className={`flex ${
                auth?.isAuthenticated ? "" : "md:hidden"
              } justify-center cursor-pointer orange-circle text-white w-[38px] h-[38px] items-center align-middle my-auto`}
            >
              {auth?.user?.name?.toString()?.charAt(0) ?? "N"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
