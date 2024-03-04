// @components
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/shared/navbar/NavBar';
import Footer from './components/shared/footer/Footer';

function App() {

  return (
    <div className="App">
      <NavBar />
      <AppRoutes />
      <Footer />
    </div>
  );
}
export default App;
