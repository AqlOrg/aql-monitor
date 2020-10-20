import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Possible query string
// SELECT * FROM aql
// WHERE mutation_received_time BETWEEN $1 AND $2
// ORDER BY mutation_received_time DESC;

function HeaderRow() {
  // Helper function to return obj with UNIX day start and end
  const convertTime = (data) => {
    const rangeObj = {};
    rangeObj.start = new Date(data.ReactDatePicker).getTime();
    rangeObj.end = rangeObj.start + 86400000;
    return rangeObj;
  };

  const { handleSubmit, control } = useForm();

  return (
    <div id="HeaderRow">
      <span id="projectName">Julie's Dashboard</span>
      <div>
        <form onSubmit={handleSubmit((data) => console.log(convertTime(data)))}>
          <Controller
            control={control}
            name="ReactDatepicker"
            render={({ onChange, onBlur, value }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
          <input id="date-picker-button" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default HeaderRow;
