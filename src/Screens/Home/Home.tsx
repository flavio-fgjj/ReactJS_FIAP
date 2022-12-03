import { useState, useEffect } from "react";
import "./Home.css";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CustomCard } from "./HomeStyles";
import useAPI from "../../Services/APIs/Common/useAPI";
import Persons from "../../Services/APIs/Persons/Persons";
import { allPersons, IPersons } from "../../Interfaces/IPerson";
import { CardActions, CardContent, CardMedia } from "@mui/material";

function App() {
  const [count, setCount] = useState<number>(0);
  const [cards, setCards] = useState<JSX.Element[]>([]);

  const getPersonAPI = useAPI(Persons.getPersons);

  const addCount = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    getPersonAPI
      .requestPromise()
      .then((allPersons: allPersons) => {
        //Conexao com sucesso
        let mountCards: JSX.Element[] = [];
        allPersons.persons.forEach((person: IPersons) => {
          mountCards.push(
            <Grid item key={person._id} lg={4} md={6} sm={12}>
              <CustomCard>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://placeimg.com/640/480/tech"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {person.firstName} {person.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.jobTitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </CustomCard>
            </Grid>
          );
        });
        setCards(mountCards);
      })
      .catch((info: any) => {
        //Conexao com erro
        console.log(info);
      });
  }, []);

  return (
    <div>
      <Grid container>{cards}</Grid>
    </div>
  );
}

export default App;
