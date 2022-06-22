import React,{useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionData = () => {


  return (

    <div style={{}}>
    <Accordion  style={{ width: 400 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        
      >
        <div>Click to Expand</div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Greetings of the day :)</Typography>
      </AccordionDetails>
    </Accordion>
  </div>
   
  );
}

export default AccordionData;