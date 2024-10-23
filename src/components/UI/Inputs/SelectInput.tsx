import * as React from "react";
import axios from "axios";
import closeIcon from '/img/filter/close-input.svg';

interface Props {
  type: string;
  name: string;
  title: string;
  placeholder: string;
  inputValue: string;
  updateValue: (value: string) => void;
  validateValue: boolean;
  isNull: boolean;
  textError: string;
}

const SelectInput: React.FC<Props> = (Props) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [unitsList, setUnitsList] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLDivElement | null>(null);

  const departmentsList = async () => {
    try {
      const response = await axios.get("src/api/units.json")
      const list = response.data || [];
      setUnitsList(list);
      setFilteredSuggestions(list);
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
  }

  React.useEffect(() => {
    departmentsList()
  }, []);

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    Props.updateValue(userInput)

    const filtered = unitsList.filter((item) =>
        item.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const clearInput = () => {

    Props.updateValue('')

    setFilteredSuggestions(unitsList);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {

    Props.updateValue(suggestion)

    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
      setIsFocused(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="input_box" style={{ position: "relative" }} ref={inputRef}>
        <input
            className={'input_field ' + ((Props.isNull || Props.validateValue) ? 'error_border' : '')}
            type={Props.type}
            name={Props.name}
            id={Props.name}
            placeholder={Props.placeholder}
            value={Props.inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            autoComplete="off"
        />
        <label htmlFor={Props.name}>{Props.title}</label>

        {isFocused && Props.inputValue && (
            <img
                src={closeIcon}
                alt="Очистить поле"
                className="clear-icon"
                onClick={clearInput}
            />
        )}

        {Props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}
        {Props.validateValue ? <div className="error">{Props.textError}</div> : ''}

        {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => (
                  <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default SelectInput;
