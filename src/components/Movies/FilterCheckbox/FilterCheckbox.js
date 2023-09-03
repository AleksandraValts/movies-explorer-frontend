function FilterCheckbox() {
  return (
    <div className="checkbox">
    <div className="checkbox__container">
      <label className="checkbox__switch" for="checkbox">
        <input type="checkbox" id="checkbox" />
        <span className="checkbox__slider checkbox__round"></span> 
      </label>
    </div>
    <span className="checkbox__span">Короткометражки</span>
  </div>
  );
}

export default FilterCheckbox;
