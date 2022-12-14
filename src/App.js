import "./App.scss";
import { BrowserRouter, Route, Router, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "./pages/DashBoard";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebarver";
import Login from "./pages/Login";
import DemographicPage from "./pages/DemographicPage";
import HouseholdPage from "./pages/HouseholdPage";
import TabernaclePage from "./pages/TabernaclePage";
import AbsentPage from "./pages/AbsentPage";
import { Triangle } from "react-loader-spinner";
import About from "./pages/About";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/authSlice";
import { useEffect, useState } from "react";
import UnAuth from "./Routes/unAuthRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Switch } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [component, setComponent] = useState();
  
  const getCurrentView = () => {
    if (isAuthenticated === false) {
      return <UnAuth />;
    } else
      return (
        <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Switch>
            <Route path="/" exact component={DashBoard} />
            <Route path="/demographic" exact component={DemographicPage} />
            <Route path="/household" exact component={HouseholdPage} />
            <Route path="/tabernacle" exact component={TabernaclePage} />
            <Route path="/absent" exact component={AbsentPage}/>
            <Route path="/login" exact component={Login} />
            <Route path="/about" exact component={About} />
            <Route path="/change-password" exact component={ChangePasswordPage} />
            <Route path="*" component={NotfoundPage} />
          </Switch>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
      );
  };
  useEffect(() => {
    dispatch(loadUser());
    setComponent(getCurrentView());
  }, []);
  useEffect(() => {
    setComponent(getCurrentView());
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        {!isLoading ? (
          <>{component}</>
        ) : (
          <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <Triangle
              height="100"
              width="100"
              color="#1877f2"
              ariaLabel="loading"
            />
            <div>Loading data...</div>
          </div>
        )}
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;