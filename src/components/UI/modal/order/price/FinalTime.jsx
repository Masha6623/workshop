import { Box, ListItem, ListItemText } from "@material-ui/core";

const FinalTime = ({ finalTime }) => {
  return (
    <Box>
      <ListItem>
        <ListItemText
          primary="Сколько времени займет изготовление:"
          secondary={finalTime + " рабочих дней"}
        />
      </ListItem>
    </Box>
  );
};

export default FinalTime;
