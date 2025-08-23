import { CgMenuLeft } from "react-icons/cg";
import { FaRegSmile } from "react-icons/fa";
import logo from "./../../../Assets/Images/photo_2024-05-15_11-32-10.jpg";
import { LuLayoutDashboard, LuLayoutList } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { PiGearBold } from "react-icons/pi";

import "./Sidebar.scss";
import GroupLinks from "./sidebarCompo/SidebarGroupLinks/SidebarGroupLinks.component";
import { useSelector } from "react-redux";

const listLinks = [
  { title: "الصفحة الرئيسية", url: "/dashboard", icon: LuLayoutDashboard },
  {
    title: "الذاتية",
    url: "#",
    icon: LuLayoutDashboard,
    type: "list",
    content: [
      // {
      //   title: "البحث عن مشترك",
      //   url: "/dashboard/search",
      //   icon: LuLayoutDashboard,
      // },
      {
        title: "إضافة مهندس جديد",
        url: "/dashboard/adduser",
        icon: LuLayoutDashboard,
      },
      {
        title: "إضافة  فرد عائلة جديد",
        url: "/dashboard/addmember",
        icon: LuLayoutDashboard,
      },
    
     
      // {
      //   title: "تجديد الاشتراك",
      //   url: "/dashboard/renewal",
      //   icon: LuLayoutDashboard,
      // },
      {
        title: " مشتركين عام 2024",
        url: "/dashboard/alleng",
        icon: LuLayoutDashboard,
      },
      // {
      //   title: "بحث وتعديل بيانات المؤمنين",
      //   url: "/dashboard/searchre",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: " المشتركين منذ عام 2017",
      //   url: "/dashboard/alleng",
      //   icon: LuLayoutDashboard,
      // },
    ],
  },
  {
    title: "الاشتراكات",
    url: "#",
    icon: LuLayoutDashboard,
    type: "list",
    content: [
      {
        title: "الاشتراكات السنوية",
        url: "/dashboard/addnew",
        icon: LuLayoutDashboard,
      },
      {
        title: "تجديد الاشتراك",
        url: "/dashboard/renewal",
        icon: LuLayoutDashboard,
      },
     
    ],
  },
  {
    title: "الإدارة",
    url: "#",
    icon: LuLayoutDashboard,
    type: "list",
    content: [
      {
        title: "الوحدات الهندسية",
        url: "/dashboard/unitworkplace",
        icon: LuLayoutDashboard,
      },
      
      {
        title: " أماكن العمل",
        url: "/dashboard/workplaces",
        icon: LuLayoutDashboard,
      },
      {
        title: " الأقسام الهندسية",
        url: "/dashboard/engdepars",
        icon: LuLayoutDashboard,
      },
      {
        title: "الاختصاصات الهندسية",
        url: "/dashboard/specializatio",
        icon: LuLayoutDashboard,
      },

      {
        title: "عرض المدن والمشافي ",
        url: "/dashboard/allhospital",
        icon: LuLayoutDashboard,
      },
      // {
      //   title: "الإجراءات المرضية",
      //   url: "/dashboard/surgicalpro",
      //   icon: LuLayoutDashboard,
      // },
      {
        title: "إعدادات السنة ",
        url: "/dashboard/agepage",
        icon: LuLayoutDashboard,
      },
      {
        title: "عرض إعدادات السنة  ",
        url: "/dashboard/agepage/show",
        icon: LuLayoutDashboard,
      },
      // {
      //   title: "الدراسات السنوية",
      //   url: "/dashboard/annualstudy",
      //   icon: LuLayoutDashboard,
      // },
    ],
  },
  {
    title: "تحميل ملفات excel ",
    url: "#",
    icon: LuLayoutDashboard,
    type: "list",
    content: [
      {
        title: " الاستردادات",
        url: "/dashboard/uploadclaims",
        icon: LuLayoutDashboard,
      },
      {
        title: " المطالبات",
        url: "/dashboard/claims",
        icon: LuLayoutDashboard,
      },
      // {
      //   title: "  ملف كاش",
      //   url: "/dashboard/uploadsubscribes",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: " ملف تقسيط خزانةالتقاعد",
      //   url: "/dashboard/retexc",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: "  ملف تقسيط الصندوق ",
      //   url: "/dashboard/boxexc",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: "تحميل ملف يدوي",
      //   url: "/dashboard/uploadmanual",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: " ملف تقسيط الوحدات ",
      //   url: "/dashboard/uploadunits",
      //   icon: LuLayoutDashboard,
      // },
      // {
      //   title: "تحميل ملف المشافي",
      //   url: "/dashboard/uploadhospital",
      //   icon: LuLayoutDashboard,
      // },
    ],
  },
  // {
  //   title: "الوحدات الهندسية واماكن العمل",
  //   url: "/dashboard/unitworkplace",
  //   icon: FaRegSmile,
  // },
];

const listLinks2 = [{ title: "Logout", url: "#", icon: MdLogout }];

export default function Sidebar({ handleStateSidebar }) {
  const sidebarState = useSelector((state) => state.layout.layoutState);

  return (
    <>
      {sidebarState == "openSmall" ? (
        <div
          className="fixed top-0 left-0 z-30 w-full h-full bg-gray-900/50 right-0"
          onClick={() => handleStateSidebar()}
        ></div>
      ) : null}
      <aside
        className={`${sidebarState} fixed top-0 ltr:left-0 rtl:right-0-0 z-40 lg:w-64 md:w-16 w-0 h-full duration-150 sidebar`}
      >
        <div
          className="grid grid-cols-1 h-full md:px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 sidebar-content"
          style={{ gridTemplateRows: "min-content auto min-content" }}
        >
          <div
            className={`w-full flex md:flex-col lg:flex-row items-center justify-between overflow-hidden  sidebar-head`}
          >
            <button
              className="text-xl hover:bg-slate-600 hover:text-white rounded-md p-2 duration-200 text-gray-600 dark:text-gray-300 dark:hover:bg-blue-600"
              onClick={handleStateSidebar}
            >
              <CgMenuLeft />
            </button>
            <h1 className="text-4xl font-extrabold text-black dark:text-blue-600">
              <div className="flex flex-row-reverse gap-2 mt-1 ">
                <div className="w-full flex flex-col justify-center">
                  <h2 className="text-xs">التأمين الصحي - عقد الاستشفاء </h2>
                  <h3 className="text-sm text-center">فرع حمص</h3>
                </div>
                <div className="w-10 mr-2">
                  <img src={logo} className="w-full" />
                </div>
              </div>
            </h1>
          </div>
          <GroupLinks list={listLinks} />
          <GroupLinks list={listLinks2} />
        </div>
      </aside>
    </>
  );
}
