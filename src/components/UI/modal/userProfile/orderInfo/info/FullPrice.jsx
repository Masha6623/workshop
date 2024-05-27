import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";

const FullPrice = ({ fullPrice }) => {
  return (
    <Box>
      <ListItem>
        <ListItemText primary="Общая сумма:" secondary={fullPrice} />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default FullPrice;
