import { useState, useEffect } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CustomLink, Main, Title } from "./HomeStyles";
import useAPI from "../../Services/APIs/Common/useAPI";
import Persons from "../../Services/APIs/Persons/Persons";
import { allPersons, IPersons } from "../../Interfaces/IPerson";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { useGeolocated } from "react-geolocated";

function App() {
  const [currentPersons, setCurrentPersons] = useState<IPersons | null>(null);
  const getPersonAPI = useAPI(Persons.getPersons);

  let userCoordinates: GeolocationCoordinates | null = null;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    console.log(coords);
    userCoordinates = coords;
  }

  useEffect(() => {
    getPersonAPI
      .requestPromise()
      .then((allPersons: allPersons) => {
        //Conexao com sucesso
        setCurrentPersons(allPersons.persons[0]);
      })
      .catch((info: any) => {
        //Conexao com erro
        console.log(info);
      });
  }, []);

  return (
    <Main>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Title> Person {currentPersons?.lastName}</Title>
        <CustomLink to="detail/1"> Detalhe 1</CustomLink>
        <CustomLink to="detail/2"> Detalhe 2</CustomLink>
      </Grid>
    </Main>
  );
}

export default App;
