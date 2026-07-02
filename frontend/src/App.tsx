import AppRoutes from './routes/AppRoutes';
import MainLayout from './layout/MainLayout';
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored" />
    </>
  )
}

export default App
