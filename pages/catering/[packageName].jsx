import CreatePackage from "@/components/CustomisePackage/CreatePackage";
import { getCategories, getItemsData } from "@/redux/reducers/itemsReducer";
import React from "react";
import { wrapper } from "../../redux/store";
import { getCookie } from "cookies-next";
import { END } from "redux-saga";
import { getPackage } from "@/redux/reducers/packageReducer";

function CustomisePackage({
  items,
  noOfPeople,
  packageName,
  categories,
  packageData,
}) {
  return (
    <CreatePackage
      packageName={packageName ?? null}
      menuOption={"click2cater"}
      packageDetails={{ ...(items ?? {}) }}
      categories={{ ...(categories ?? {}) }}
      noOfPeople={noOfPeople}
      itemsData={{ ...(packageData?.items_mapping ?? {}) }}
    />
  );
}
async function fetchData(store, location, packageName) {
  await Promise.all([
    await store.dispatch(
      getPackage({
        menuOption: "click2cater",
        packageSlug: packageName,
        location,
      })
    ),
    await store.dispatch(getItemsData({ menuOption: "click2cater", location })),
    await store.dispatch(
      getCategories({ menuOption: "click2cater", location })
    ),
  ]);
  await store.dispatch(END);
  await store.sagaTask.toPromise();
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (props) => {
    const location = await getCookie("location", {
      req: props?.req,
      res: props?.res,
    });
    await fetchData(store, location, props?.params?.packageName);
    const { items, categories } = await store.getState().items;
    const { packageData } = await store.getState().packages;
    const noOfPeople = getCookie("no_of_people", {
      req: props?.req,
      res: props?.res,
    });

    return {
      props: {
        items: items ?? {},
        noOfPeople: noOfPeople ?? 10,
        packageName: props?.params?.packageName,
        categories: categories ?? {},
        packageData: packageData ?? {},
      },
    };
  }
);
export default CustomisePackage;
