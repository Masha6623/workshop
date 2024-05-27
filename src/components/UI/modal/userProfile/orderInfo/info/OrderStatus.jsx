import { Box, ListItem, ListItemText } from "@material-ui/core";

const OrderStatus = ({ orderStatus }) => {
  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Статус заказа:"
          secondary={orderStatus}
        />
      </ListItem>
    </Box>
  );
};

export default OrderStatus;
