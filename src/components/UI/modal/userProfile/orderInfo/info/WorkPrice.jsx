import { Box, Divider, ListItem, ListItemText } from '@material-ui/core';

const WorkPrice = ({ workPrice }) => {

  return (
    <Box>
      <ListItem>
        <ListItemText 
          primary="Цена работы:" 
          secondary={workPrice} 
        />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default WorkPrice;
