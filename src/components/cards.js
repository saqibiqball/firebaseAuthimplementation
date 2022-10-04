import * as React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import { listOfCards } from "../Assets/cardsArray";
function Cards() {
  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 3, mr:0 }}
      >
        {listOfCards.map((cards) => {
          console.log(cards);
          return (
            <Grid
              xs={6}
              sx={{ display: "flex", justifyContent: "center", mr: 0 }}
            >
              <Card sx={{ maxWidth: 400, cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={cards.path}
                  alt={cards.name}
                />
                {/* <CardActions></CardActions> */}
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Cards;
