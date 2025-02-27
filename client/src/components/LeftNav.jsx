import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/Constants";

function LeftNav() {
  const { selectcategories, setSelectCategories, mobileMenu } =
    useContext(Context);
  const navigate = useNavigate();

  const clickHandle = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategories(name);
      case "home":
        return setSelectCategories(name);
      case "menu":
        return false;

      default:
        break;
    }
  };
  return (
    <div>
    <div
       className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 hide translate-x-[-240px] md:translate-x-0 transition-all ${
         mobileMenu ? "translate-x-[0px]" : ""}`}>
      <div className="flex px-5 flex-col">
        {categories?.map((item,index) => {
          return (
            <React.Fragment key={`${item.name}-${index}`}>
            <LeftNavMenuItem
              key={`${item.name}-${index}`} 
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandle(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectcategories === item.name
                    ? "bg-black/[0.15] dark:bg-white/[0.15]"
                    : ""
                }`}
              />
              {item.divider && (
                <hr className="my-5 border-white/[0.2] dark:border-black/[0.2]" />
              )}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white[0.2]" />
       
      </div> 
    </div>
    </div>
  );
}

export default LeftNav;
