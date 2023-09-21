import React from 'react';

function FilterCheckbox({ isChecked, onChange }) {
  return (
    <div className="checkbox">
    <div className="checkbox__container">
      <label className="checkbox__switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" onChange={onChange} checked={isChecked}/>
        <span className="checkbox__slider checkbox__round"></span> 
      </label>
    </div>
    <span className="checkbox__span">Короткометражки</span>
  </div>
  );
}

export default FilterCheckbox;
