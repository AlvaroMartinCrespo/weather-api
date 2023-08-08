import './App.css';
import Layout from './components/Layout';
import Weather from './components/Weather';

function App() {
  return (
    <>
      <Layout title="inicio">
        <section className="container mx-auto py-10">
          <h1 className="text-center flex items-center gap-1 justify-center">
            <span className="text-3xl font-bold">Weather</span>
            <span>
              <img className="w-10" src="../public/icons/weather.png" alt="weather-icon" />
            </span>
            <span className="text-3xl font-bold">App</span>
          </h1>
        </section>
        <section className="container mx-auto flex justify-center">
          <Weather />
        </section>
      </Layout>
    </>
  );
}

export default App;
