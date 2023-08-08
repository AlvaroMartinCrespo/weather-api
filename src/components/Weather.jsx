import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Loading
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    setCity(data.city);
    if (data.city === '' || data.city === undefined) {
      setLoading(false);
      toast.error('La ciudad esta en blanco.', {
        position: 'bottom-right',
        autoClose: 1000,
      });
      return;
    }

    // Fetch
    try {
      const request = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=eaf2898ffb444f4097373555230808&q=${data.city}`
      );
      const response = await request.json();
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      if (response.error) throw new Error(response.error);
      setWeather(response);
      console.log(response);
    } catch (error) {
      toast.error('Ha ocurrido un error.', {
        position: 'bottom-right',
        autoClose: 1000,
      });
      console.error(error);
      setCity('');
      setLoading(false);
    }
  };
  return (
    <div className="bg-white border rounded-xl shadow-xl w-64 p-5 transition-all duration-300 ease-in-out">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {city && weather ? (
            <>
              <section className="flex items-center flex-col ">
                <h1 className="text-center my-2">
                  {weather.location.name}, {weather.location.region} ({weather.location.country})
                </h1>
                <h2 className="font-bold">{weather.location.localtime}</h2>
                <img className="w-20" src={weather.current.condition.icon} alt={weather.current.condition.text} />
                {/* <span>{weather.current.condition.text}</span> */}
                <h2 className="font-bold text-4xl mb-5">{weather.current.temp_c}°C</h2>
                <div className="flex flex-col">
                  <span>Humedad: {weather.current.humidity}%</span>
                  <span>Presión: {weather.current.pressure_mb}</span>
                  <span>Viento: {weather.current.wind_kph} km/h</span>
                  <span>Precipitaciones: {weather.current.precip_mm} mm</span>
                </div>
              </section>
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setCity('')}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Volver
                </button>
              </div>
            </>
          ) : (
            <>
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <label htmlFor="city">Introduce la ciudad</label>
                <input
                  className="p-3 outline-none rounded-xl bg-slate-100"
                  type="text"
                  placeholder="Ciudad"
                  name="city"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                  Buscar
                </button>
              </form>
            </>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
}
