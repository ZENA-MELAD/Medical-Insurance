import { createAlert } from "components/Alert/Alert";
import NavigationCard from "components/NavigationCard/NavigationCard";
import { useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";

const listLinks = [
  // { title: "البحث عن مشترك", url: "/dashboard/search", icon: LuLayoutDashboard },
  {
    title: " إضافة مهندس جديد",
    url: "/dashboard/adduser",
    icon: LuLayoutDashboard,
  },
  {
    title: " إضافة فرد عائلة جديد",
    url: "/dashboard/addmember",
    icon: LuLayoutDashboard,
  },
  {
    title:"الاشتراكات السنوية",
    url: "/dashboard/addnew",
    icon: LuLayoutDashboard,
  },
  {
    title:"تجديد الاشتراك",
    url: "/dashboard/renewal",
    icon: LuLayoutDashboard,
  },
   
  {
    title: "مشتركين عام 2024",
    
    url: "/dashboard/alleng",
    icon: LuLayoutDashboard,
  },
  // {
  //   title: "المشتركين منذ عام 2017",
    
  //   url: "/dashboard/alleng",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title:"الاشتراكات السنوية",
  //   url: "/dashboard/addnew",
  //   icon: LuLayoutDashboard,
  // },

  {
    title: "الوحدات الهندسية ",
    url: "/dashboard/unitworkplace",
    // icon: FaRegSmile,
    icon: LuLayoutDashboard,
  },
  {
    title: "الأقسام الهندسية ",
    url: "/dashboard/engdepars",
    // icon: FaRegSmile,
    icon: LuLayoutDashboard,
  },
  {
    title: "أماكن العمل",
    url: "/dashboard/workplaces",
    // icon: FaRegSmile,
    icon: LuLayoutDashboard,
  },

  {
    title: "الاختصاصات الهندسية ",
    url: "/dashboard/specializatio",
    icon: LuLayoutDashboard,
  },
  { title: "عرض المدن والمشافي" , url: "/dashboard/allhospital",  icon: LuLayoutDashboard, },
//  {
//     title: "الإجراءات المرضية",
//     url: "/dashboard/surgicalpro",
//     icon: LuLayoutDashboard,
//   },
 {
    title: "إعدادات السنة",
    url: "/dashboard/agepage",
    icon: LuLayoutDashboard,
  },
//  {
//     title: "الدراسات السنوية",
//     url: "/dashboard/annualstudy",
//     icon: LuLayoutDashboard,
//   },
  {
    title: "الاستردادات",
    url: "/dashboard/uploadclaims",
    icon: LuLayoutDashboard,
  },
  {
    title: "المطالبات",
    url: "/dashboard/claims",
    icon: LuLayoutDashboard,
  },
  // {
  //   title: " ملف كاش",
  //   url: "/dashboard/uploadsubscribes",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "   ملف تقسيط",
  //   description:"  خزانة التقاعد",
  //   url: "/dashboard/retexc",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: " ملف تقسيط   ",
  //   description:" الصندوق المشترك",
  //   url: "/dashboard/boxexc",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "تحميل ملف يدوي ",
  //   url: "/dashboard/uploadmanual",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "  ملف تقسيط  ",
  //   description:"الوحدات الهندسية",
  //   url: "/dashboard/uploadunits",
  //   icon: LuLayoutDashboard,
  // },
  // {
  //   title: "تحميل ملف المشافي ",
  //   url: "/dashboard/uploadhospital",
  //   icon: LuLayoutDashboard,
  // },
];

export default function Dashboard() {
  // useEffect(() => {
  //   createAlert("success", "0000");
  //   createAlert("error", "0000");
  //   createAlert("warning", "0000");
  // }, []);

  return (
    <>
      <div className="flex flex-wrap w-full gap-3 h-fit">
      {listLinks.map((link, i) => (<NavigationCard key={i} data={link} />))}
      </div>
    </>
  );
}
