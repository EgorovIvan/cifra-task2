import * as React from "react";
import folderIcon from '/img/filter/folder-input.svg';
import { useDivisionsStore } from "@/stores/useDivisionsStore";
import { useAuthStore } from "@/stores/useAuthStore";

interface Props {
  type: string;
  name: string;
  title: string;
  placeholder: string;
  inputValue?: string;
  updateValue: (value?: string) => void;
  validateValue: boolean;
  isNull: boolean;
  textError: string;
  onFolderIconClick?: () => void;
}

const SelectInput: React.FC<Props> = (props) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState<boolean>(false);
  const {divisions, fetchDivisions} = useDivisionsStore();
  const authToken = useAuthStore((state) => state?.authToken);
  const inputRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (authToken) {
        fetchDivisions(authToken);
    }
  }, [authToken, fetchDivisions]);

  const handleInputFocus = () => {
    console.log("Input focused");
    setShowSuggestions(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    props.updateValue(userInput);

    const filtered = divisions
      .map(d => d.Name)
      .filter(n => n.toLowerCase().includes(userInput.toLowerCase()));

    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    props.updateValue(suggestion);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      console.log("Click outside detected, closing suggestions");
      setShowSuggestions(false);
    }
  };

  const handleFolderIconClick = () => {
    if (props.onFolderIconClick) {
      setShowSuggestions(false);
      props.onFolderIconClick();
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="input_box" style={{ position: "relative" }} ref={inputRef}>
      <div className="input-wrapper">
        <input
          className={'input_field ' + ((props.isNull || props.validateValue) ? 'error_border' : '')}
          type={props.type}
          name={props.name}
          id={props.name}
          placeholder={props.placeholder}
          value={props.inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />

        <img
          src={folderIcon}
          alt="Просмотреть список"
          className="folder-icon"
          onClick={handleFolderIconClick}
        />
      </div>

      <label htmlFor={props.name}>{props.title}</label>

      {props.isNull ? <div className="error">Поле ввода не должно быть пустым</div> : ''}
      {props.validateValue ? <div className="error">{props.textError}</div> : ''}

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

