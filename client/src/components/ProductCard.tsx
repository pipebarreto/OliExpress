import React from "react";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Grid } from "@mui/material";

export default function ProductCard (props:any){

  return(   

  <div style ={{margin:10}}>

    <Card variant="elevation" sx={{ width: 250, height:300}}>


      <CardContent>



      </CardContent>

      <CardActions>

      <Grid container direction="column"
        alignItems="center"  justifyContent="flex-end">



      </Grid>

      </CardActions>

    </Card>
  </div>

    );
}
