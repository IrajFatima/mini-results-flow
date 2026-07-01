import AppRoutes from './routes/AppRoutes';
import MainLayout from './layout/MainLayout';
import { FormProvider } from './context/FormContext';
function App() {

  return (
    <>
      <FormProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </FormProvider>
    </>
  )
}

export default App
