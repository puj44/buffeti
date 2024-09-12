import React, { useEffect, useState } from "react";
import PageHead from "./Common/PageHead";
import Header from "./Common/Header";
import Footer from "@/components/Common/Footer";
import LoginModel from "./Common/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModel } from "@/redux/reducers/homeReducer";

function Layout({ children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [visited, setVisited] = useState(false);
  const { loginModel } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const handleModelClick = (val) => {
    setModalOpen(val);
    if (val === false) {
      dispatch(setLoginModel({ open: false }));
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isModalOpen]);
  useEffect(() => {
    if (loginModel) {
      setModalOpen(true);
    }
  }, [loginModel]);

  useEffect(() => {
    const visited = localStorage?.getItem("visited");
    if (!visited) {
      setTimeout(() => {
        setModalOpen(true);

        setVisited(true);
      }, 8000);
    }
  }, []);
  return (
    <>
      <PageHead />
      <Header handleModelClick={handleModelClick} />
      <main className="page-content min-h-[80vh]">{children}</main>
      <Footer />
      {isModalOpen && (
        <LoginModel
          isFirstTime={visited ?? false}
          isModalOpen={isModalOpen}
          handleModelClick={handleModelClick}
        />
      )}
    </>
  );
}

export default Layout;
