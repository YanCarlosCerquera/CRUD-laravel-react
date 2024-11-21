import { Box, Chip, MenuItem, Select} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ccVar2Color, ccLargeFontColor } from "components/mui-customizations/styleCustomization";



// const renderSelectValue = (selected, items) => (
//   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//     {selected.map((selectedValue) =>
//       items.filter(itemValue => itemValue.id === selectedValue).map(itemValue => (
//         <Chip key={itemValue.id} label={itemValue.value} sx={{ height: "23px" }} />
//       ))
//     )}
//   </Box>
// );

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(currentItemValue, selectedItemsValue, theme) {
  return {
    fontWeight:
      selectedItemsValue.indexOf(currentItemValue) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ccMultiSelectStyle = (props) => {
  return {
    fieldset: {
      borderColor: ccVar2Color+"!important",
      color: ccVar2Color+"important",
    },
    label: {
      color: ccVar2Color,
      "&:hover": {
        color: ccLargeFontColor+"!important",
      },
    },
    ...props.sx,
  }
};

const CCMultiSelect = ({...props}) => {
  const theme = useTheme();

  const renderValue = (selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((selectedValue) => (
        props.items.filter(itemValue => itemValue.id === selectedValue).map(itemValue => (
          <Chip key={itemValue.id} label={itemValue.value} sx={{ height: "23px" }} />
        ))
      ))}
    </Box>
  );

  return (
    <Select
      onChange={props.onChange}
      renderValue={renderValue}
      MenuProps={MenuProps}
      sx={ccMultiSelectStyle(props)}
      // renderValue={(selected) => renderSelectValue(selected, props.items)}
      {...props}
    >
      {/* <MenuItem value="">
      <em>None</em>
      </MenuItem> */}
      {props.items.map((currentItem) => (
        <MenuItem
          key={currentItem.id}
          value={currentItem.id}
          style={getStyles(currentItem.id, props.value, theme)}
        >
          {currentItem.value}
        </MenuItem>
      ))}
      {props.children}
    </Select>
  );
};

export default CCMultiSelect;