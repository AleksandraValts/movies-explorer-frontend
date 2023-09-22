import React from 'react';

function FilterCheckbox({filter, shorts}) {
  return (
    <div className="checkbox">
    <div className="checkbox__container">
      <label className="checkbox__switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" onChange={filter} checked={shorts} />
        <span className="checkbox__slider checkbox__round"></span> 
      </label>
    </div>
    <span className="checkbox__span">Короткометражки</span>
  </div>
  );
}

export default FilterCheckbox;
