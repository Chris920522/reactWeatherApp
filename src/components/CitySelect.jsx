function CitySelect({ selectedCity,  setSelectedCity }) {

  return (
    <select
      name="city"
      id="city"
      value={selectedCity}
      onChange={e => setSelectedCity(e.target.value)}
    >
      <option value="Taipei">台北</option>
      <option value="Tokyo">東京</option>
      <option value="London">倫敦</option>
      <option value="NewYork">紐約</option>
      <option value="Paris">巴黎</option>
    </select>
  );
}

export default CitySelect;
