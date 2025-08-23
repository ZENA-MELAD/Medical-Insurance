import React, { Suspense, lazy, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutPage, Spinner } from "../../components";
import { useSelector } from "react-redux";

// const Settings = lazy(() => import("./Settings/Settings"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Error404 = lazy(() => import("../errors/Error404/Error404"));
const SelfInfo = lazy(() => import("./SelfInfo/SelfInfo"));
const AddUser = lazy(() => import("./AddUser/AddUser"));
const AddNew = lazy(() => import("./AddNew/AddNew"));

const CityHospital = lazy(() => import("./CityHospital/CityHospital"));
const WorkPlaces = lazy(() => import("./WorkPlaces/WorkPlaces"));
const EngineeringeDepars = lazy(() =>
  import("./EngineeringeDepars/EngineeringeDepars")
);
const UploadClaims = lazy(() =>
  import("./UploadClaims/UploadClaims")
);
const AddMember = lazy(() => import("./AddMember/AddMember"));
const UploadSubscribes = lazy(() => import("./UploadSubscribes/UploadSubscribes"));
const RetirementExcel = lazy(() => import("./RetirementExcel/RetirementExcel"));
const BoxExcel = lazy(() => import("./BoxExcel/BoxExcel"));
const SurgicalProcedures = lazy(() =>
  import("./SurgicalProcedures/SurgicalProcedures")
);
const Specializatio = lazy(() => import("./Specializatio/Specializatio"));
const UnitWorkPlace = lazy(() => import("./UnitWorkPlace/UnitWorkPlace"));
const AllUnits = lazy(() => import("./AllUnits/AllUnits"));
const AllWorks = lazy(() => import("./AllWorks/AllWorks"));
const AllDeparts = lazy(() => import("./AllDeparts/AllDeparts"));
const AllSpecialization = lazy(() => import("./AllSpecialization/AllSpecialization"));
const AllSurgicalProced = lazy(() => import("./AllSurgicalProced/AllSurgicalProced"));
const AllHospital = lazy(() => import("./AllHospital/AllHospital"));
const AddClaims = lazy(() => import("./AddClaims/AddClaims"));
const AllClaims=lazy(()=>import("./AllClaims/AllClaims"))
const AllEng=lazy(()=>import("./AllEng/AllEng"))
const AllMember=lazy(()=>import("./AllMember/AllMember"))
const AgePage=lazy(()=>import("./AgePage/AgePage"))
const AllAges = lazy(() => import("./ALLAges/ALLAges"));
const Renewal = lazy(() => import("./Renewal/Renewal"));
const AllRenewall = lazy(() => import("./AllRenewall/AllRenewall"));
const Claims = lazy(() => import("./Claims/Claims"));
const ManualClaims = lazy(() => import("./ManualClaims/ManualClaims"));
const AllClaimsManual=lazy(() => import("./AllClaimsManual/AllClaimsManual"));
const AnnualStudy=lazy(() => import("./AnnualStudy/AnnualStudy"));
const UploadManual = lazy(() => import("./UploadManual/UploadManual"));
const UploadUnits = lazy(() => import("./UploadUnits/UploadUnits"));
const UploadHospital = lazy(() => import("./UploadHospital/UploadHospital"));
const Search=lazy(()=> import ("./Search/Search"))
const AllMemberR=lazy(()=>import("./AllMemberR/AllMemberR"))
const SearchRE=lazy(()=>import("./SearchRE/SearchRE"))
const RenewTest=lazy(()=>import("./RenewTest/RenewTest"))
const Show=lazy(()=>import("./AgePage/Show/Show"))
/** @todo convert lazyLoading to external function to use */

export default function DashboardRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(role);
    if (role == "admin" && role == "SUPER_admin" && role == "employee") {
      navigate("/unauthorized");
    }
  }, [location]);

  if (role !== "admin" && role !== "SUPER_admin" && role !== "employee") {
    return null;
  }

  return (
    <LayoutPage>
      <Suspense fallback={<Spinner page />}>
        {(() => {
          switch (location.pathname) {
            case "/dashboard":
              return <Dashboard />;
            case "/dashboard/adduser":
              return <AddUser />;
            case "/dashboard/addnew":
              return <AddNew />;
            case "/dashboard/workplaces":
              return <WorkPlaces />;
            case "/dashboard/cityhospital":
              return <CityHospital />;
            case "/dashboard/engdepars":
              return <EngineeringeDepars />;
            case "/dashboard/surgicalpro":
              return <SurgicalProcedures />;
            case "/dashboard/unitworkplace":
              return <UnitWorkPlace />;
            case "/dashboard/uploadclaims":
              return <UploadClaims />;
            case "/dashboard/uploadsubscribes":
              return <UploadSubscribes />;
            case "/dashboard/addmember":
              return <AddMember />;
            case "/dashboard/specializatio":
              return <Specializatio/>;
              case "/dashboard/allunits":
              return <AllUnits/>;
              case "/dashboard/allworks":
              return <AllWorks/>;
              case "/dashboard/alldeparts":
                return <AllDeparts/>;
                case "/dashboard/allspecialization":
                  return <AllSpecialization/>;
                case "/dashboard/allsurgicalproced":
                  return <AllSurgicalProced/>;
                case "/dashboard/allhospital":
                  return <AllHospital/>;
                case "/dashboard/addclaims":
                  return <AddClaims/>;
                  case "/dashboard/allclaims":
                    return <AllClaims/>;
                  case "/dashboard/alleng":
                    return <AllEng/>;
                    case "/dashboard/allmember":
                      return <AllMember/>;
                      case "/dashboard/agepage":
                        return <AgePage/>;
                      case "/dashboard/retexc":
                        return <RetirementExcel/>;
                      case "/dashboard/boxexc":
                        return <BoxExcel/>;
                        case "/dashboard/allages":
              return <AllAges />;
              case "/dashboard/renewal":
                return <Renewal />;
                case "/dashboard/allrenewal":
                  return <AllRenewall />;
                  case "/dashboard/claims":
                    return <Claims />;
                    case "/dashboard/manualclaims":
                      return <ManualClaims />;
                    case "/dashboard/allclaimsmanual":
                      return <AllClaimsManual />;
                    case "/dashboard/annualstudy":
                      return <AnnualStudy />;
                    case "/dashboard/uploadmanual":
                      return <UploadManual />;
                    case "/dashboard/uploadunits":
                      return <UploadUnits />;
                    case "/dashboard/uploadhospital":
                      return <UploadHospital />;
                    case "/dashboard/search":
                      return <Search />;
                    case "/dashboard/allmemberr":
                      return <AllMemberR />;
                    case "/dashboard/searchre":
                      return <SearchRE />;
                    case "/dashboard/renewtest":
                      return <RenewTest />;
                    case "/dashboard/agepage/show":
                      return <Show />;
                  
            default:
              return <Error404 navigateTo={"/dashboard"} timer={10000} />;
          }
        })()}
      </Suspense>
    </LayoutPage>
  );
}
