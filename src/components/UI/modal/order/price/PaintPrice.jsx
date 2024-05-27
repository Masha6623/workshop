import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";

const PaintPrice = ({ paintPrice }) => {

  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Цена покраски:"
          secondary={paintPrice}
        />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default PaintPrice;