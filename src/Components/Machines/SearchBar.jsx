function SearchBar({ value, onChange }) {
  return (
    <label className="search-field">
      <span aria-hidden="true">⌕</span>
      <input
        aria-label="Rechercher une machine"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher par nom ou identifiant"
        type="search"
        value={value}
      />
    </label>
  );
}

export default SearchBar;
