import { useState } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DetailsWeather from "./components/DetailsWeather";

const BASE_WEATHER_API = `https://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&lang=es&q=`;

function App() {
  const [city, setCity] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState({
    message: "",
    error: false,
  });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    conditionText: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    console.log("funciona");

    console.log(city);

    try {
      if (!city.trim()) throw { message: "Campo ciudad es obligatorio" };

      const response = await fetch(BASE_WEATHER_API + city);
      const data = await response.json();

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });
    } catch (error) {
      console.log(error);
      setError({
        message: error.message,
        error: true,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <div className="WeatherApp">
        <Container maxWidth="xs" sx={{ mt: 2 }}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Weather-Api-App
          </Typography>

          <Box
            sx={{ display: "grid", gap: 2 }}
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="city"
              label="Ciudad"
              variant="outlined"
              size="small"
              required
              fullWidth
              onChange={(event) => setCity(event.target.value)}
              error={error.error}
              helperText={error.message}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              loadingIndicator="Searching..."
            >
              Buscar
            </LoadingButton>
          </Box>

          {weather.city && <DetailsWeather weather={weather} />}

          <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
            Powered by{" "}
            <a target="_blanc" href="https://www.weatherapi.com/">
              WeatherApi.com
            </a>
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default App;
