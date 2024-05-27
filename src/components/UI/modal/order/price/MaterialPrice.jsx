import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";

const MaterialPrice = ({ materialPrice }) => {

  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Цена материала:"
          secondary={materialPrice}
        />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default MaterialPrice;