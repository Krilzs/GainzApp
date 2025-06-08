import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TagSearcher = ({ handleTagFilter }) => {
  const tags = [
    "Ninguno",
    "piernas",
    "cuádriceps",
    "isquiotibiales",
    "glúteos",
    "core",
    "pecho",
    "hombros",
    "tríceps",
    "espalda",
    "bíceps",
    "brazos",
    "cuerpo completo",
    "antebrazos",
    "equilibrio",
    "gemelos",
    "abdominales",
    "flexores de cadera",
    "oblicuos",
    "explosividad",
    "agarrar",
  ];

  const ITEM_HEIGHT = 48;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.2,
        width: 250,
      },
    },
  };
  return (
    <FormControl fullWidth sx={{ mt: 2 }} color="secondary">
      <InputLabel color="secondary">Musculos Estimulados</InputLabel>
      <Select
        fullWidth
        sx={{ width: "100%" }}
        onChange={handleTagFilter}
        defaultValue={"Ninguno"}
        color="secondary"
        MenuProps={MenuProps}
        label="Musculos Estimulados"
      >
        {tags.map((tag, i) => (
          <MenuItem component="li" key={i} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSearcher;
