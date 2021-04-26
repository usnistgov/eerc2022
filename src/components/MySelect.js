import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Tooltip from '@material-ui/core/Tooltip';

////////////////////////////////////////////////////////////////////////////////
// A tooltip customized to for showing HTML content
const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
////////////////////////////////////////////////////////////////////////////////


export default function MySelect(props) {
  const { name, options, helperText, value, handleChange, isError, tooltip, } = props;

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
      <FormControl>
        <InputLabel id={labelId} shrink>{name}</InputLabel>
        <Select
          native
          labelId={labelId}
          margin="dense"
          value={value}
          onChange={myHandleChange}
          error={isError()}
          onMouseEnter={() => {handleTooltip(true)}}
          onMouseLeave={() => {handleTooltip(false)}}
          onOpen={() => {handleTooltip(false)}}
        >
          {/* filter the 2-letter states from CO2Factors keys */}
          <option key="none" aria-label="None" value="" />
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
};
