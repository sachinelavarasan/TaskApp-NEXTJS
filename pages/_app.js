import "../styles/globals.css";
import { store } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";
import AuthWrapper from "../components/AuthWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <AuthWrapper>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
        </AuthWrapper>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
