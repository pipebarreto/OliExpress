import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CategoryIcon from '@mui/icons-material/Category';

export function SideBar({filterCategory}:any) {

  const[category, setCategory]=useState('');

  useEffect(() => {
    filterCategory(category)
  }, [category])

  const ButtonStyle = {
    fontSize: 30
  };

  return (
    <Card variant="elevation" elevation={20} sx={{ width: 280, height:'auto', padding:6, backgroundColor: '#ffd6c9'}}>
      <Typography gutterBottom variant="h5" style={ButtonStyle}>
        CATEGORIES <CategoryIcon />
      </Typography>
      {category!=""?
      <Typography gutterBottom variant="body1" fontStyle='italic'>
        Filtering by: {category}
      </Typography>:
      <Typography gutterBottom variant="body1" fontStyle='italic'>
      Showing All
      </Typography>}

      <ul>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("")}>All</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Beauty")}>Beauty</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Fashion")}>Fashion</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Furniture")}>Furniture</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Technology")}>Technology</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Toys")}>Toys</Button></li>
      <li><Button style={ButtonStyle} onClick={()=>setCategory("Other")}>Other</Button></li>
      </ul>
    </Card>

  )
}

