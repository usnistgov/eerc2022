import React, { useState } from 'react';

import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import HtmlTooltip from './HtmlTooltip';


export default function MySelect(props) {
  const { name, options, helperText, value, handleChange, isError, tooltip, minwidth, addempty, } = props;

  const labelId = `${name}-label`;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltip = bool => {
      setTooltipOpen(bool);
  }

  const myHandleChange = (e) => {
    setTooltipOpen(false);
    handleChange(e);
  }

  return (
    <HtmlTooltip arrow title={tooltip} open={tooltipOpen}>
      <FormControl variant="standard" style={{minWidth: minwidth}}>
        <InputLabel id={labelId} shrink>{name}</InputLabel>
        <Select
          variant="standard"
          native
          style={{minWidth: minwidth}}
          labelId={labelId}
          margin="dense"
          value={value}
          onChange={myHandleChange}
          error={isError()}
          onMouseEnter={() => {handleTooltip(true)}}
          onMouseLeave={() => {handleTooltip(false)}}
          onOpen={() => {handleTooltip(false)}}>
          {/* filter the 2-letter states from CO2Factors keys */}
          {addempty ? <option key="none" aria-label="None" value="" /> : ""}
          {
            options.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })
          }
        </Select>
        <FormHelperText>{isError() ? helperText : ""}</FormHelperText>
      </FormControl>
    </HtmlTooltip>
  );
};

MySelect.propTypes = {
  name:         PropTypes.string.isRequired,
  options:      PropTypes.array.isRequired,
  helperText:   PropTypes.string.isRequired,
  value:        PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isError:      PropTypes.func.isRequired,
  tooltip:      PropTypes.element.isRequired,
  minwidth:     PropTypes.number,
  addempty:     PropTypes.bool,
};

MySelect.defaultProps = {
  minwidth:     120,
  addempty:     true,
};
