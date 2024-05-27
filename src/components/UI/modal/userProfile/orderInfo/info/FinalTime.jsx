import { Box, Divider, ListItem, ListItemText } from "@material-ui/core";

const FinalTime = ({ finalTime }) => {
  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Время изготовления:"
          secondary={finalTime + " рабочих дней"}
        />
      </ListItem>
      <Divider component="li" />
    </Box>
  );
};

export default FinalTime;
