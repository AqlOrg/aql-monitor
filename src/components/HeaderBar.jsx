import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function HeaderBar(props) {
  const { handleSubmit, control } = useForm();

  return (
    <div id="header-bar">
      <span id="project-name">Dashboard</span>
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            props.handleDateChange(data);
          })}
        >
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

export default HeaderBar;
