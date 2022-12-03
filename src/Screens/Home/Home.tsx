import { useState, useEffect, useContext  } from "react";
import { useGeolocated } from "react-geolocated";

import "./Home.css";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CustomLink, Main, Title, TableHeaderStyle, TableRowStyle, TableSearchFieldStyle } from "./HomeStyles";

import useAPI from "../../Services/APIs/Common/useAPI";
import Persons from "../../Services/APIs/Persons/Persons";

import { allPersons, IPersons } from "../../Interfaces/IPerson";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import MaterialTable, { QueryResult } from "material-table";

import Header from "../../Components/Header/Header";
import UserInfoContext, { UserInfoContextType } from "../../Store/UserInfo/UserInfoContext";

function App() {
 // const [currentPersons, setCurrentPersons] = useState<IPersons | null>(null);
  const getPersonAPI = useAPI(Persons.getAllPersons);
  let userCoordinates: GeolocationCoordinates | null = null;
  const navigate: NavigateFunction = useNavigate();
  const context = useContext<UserInfoContextType>(UserInfoContext);

  const [allPersons, setAllPersons] = useState<IPersons[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    { title: "SobreNome", field: "lastName" },
    { title: "Nome", field: "firstName" },
    { title: "Telefone", field: "phone" },
  ];

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  if (isGeolocationAvailable && isGeolocationEnabled && coords) {
    //console.log(coords);
    userCoordinates = coords;
  }

  /*useEffect(() => {
    setIsLoading(true)
    getPersonAPI
      .requestPromise()
      .then((allPersons: allPersons) => {
        setIsLoading(false);
        let auxAllPersons: IPersons[] = [];
        allPersons.persons.forEach(person => {
          auxAllPersons.push(person);
        })
        setAllPersons(auxAllPersons)
      })
      .catch((info: any) => {
        setIsLoading(false);
        console.log(info);
      });
  }, []);*/

  const getData = (query: any): Promise<QueryResult<{ [x: string]: {} }>> => {
    return new Promise((resolve, reject) => {
      console.log(query);
  
      let page = query.page + 1;
      let info = `page=${page}&perPage=${query.pageSize}`;
      if (query.orderBy !== undefined && query.orderBy !== "") {
        info += `&orderBy=${query.orderBy.field}`;
      }
      if (query.orderDirection !== undefined && query.orderDirection !== "") {
        info += `&orderDirection=${query.orderDirection}`;
      }
      if (query.search !== undefined && query.search !== "") {
        info += `&search=${query.search}`;
      }
      //console.log(info);
      getPersonAPI
        .requestPromise(info)
        .then((info: any) => {
          console.log(info);
          resolve({
            data: info.persons,
            page: info.page - 1,
            totalCount: info.totalItems,
          });
        })
        .catch((error: string) => {
          console.log(error);
        });
    });
  };

  const onChangePage = (person: IPersons) => {
    navigate("Detail/" + person._id, {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
        personStr: JSON.stringify(person),
      },
    });
  };

  const onAddPage = () => {
    navigate("add/", {
      state: {
        lat: userCoordinates!.latitude,
        lng: userCoordinates!.longitude,
      },
    });
  };

  return (
    <>
      <Header />
    
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="left"
        alignItems="left"
      >
        <Grid item xs={12}>
          <Title gutterBottom variant="h1" color="primary.dark">
            Lista de Colaboradores
          </Title>
        </Grid>
        <Grid item xs={12} ml={2} mb={2}>
          <Button variant="primary" onClick={() => onAddPage()}>
            Adicionar Colaborador
          </Button>
        </Grid>
        <Grid item lg={12}>
          <MaterialTable
            columns={columns}
            data={getData}
            actions={[
              {
                icon: "visibility",
                tooltip: "See Detail",
                onClick: (event, rowData) => {
                  onChangePage(rowData as unknown as IPersons);
                },
              },
            ]}
            options={{
              showTitle: false,
              search: true,
              actionsColumnIndex: -1,
              headerStyle: TableHeaderStyle,
              rowStyle: TableRowStyle,
              searchFieldStyle: TableSearchFieldStyle,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
