import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";

const OrderDate = ({ orderDate }) => {

  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Дата оформления заказа:"
          secondary={orderDate}
        />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default OrderDate;