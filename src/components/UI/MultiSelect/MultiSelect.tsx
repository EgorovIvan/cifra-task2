import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './multi_select.scss';

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [dropDirectionUp, setDropDirectionUp] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionToggle = (value: string) => {
        setSelectedOptions((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const checkPosition = () => {
            if (containerRef.current && dropdownRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const dropdownHeight = dropdownRef.current.offsetHeight;
                const windowHeight = window.innerHeight;

                // console.log(containerRect.bottom)
                // console.log(dropdownHeight)
                // console.log(windowHeight)
                // Проверка, влезает ли список вниз
                setDropDirectionUp(
                    ((windowHeight - containerRect.bottom) < windowHeight * 0.35) && (dropdownHeight > windowHeight * 0.2)
                );
            }
        };

        if (isOpen) {
            checkPosition();
            window.addEventListener('resize', checkPosition);
        }

        return () => {
            window.removeEventListener('resize', checkPosition);
        };
    }, [isOpen]);

    return (
        <div className="multi_select_container" ref={containerRef}>

            <div className="multi_select_input" onClick={toggleDropdown}>
                <input
                    type="text"
                    readOnly
                    value={selectedOptions.join(', ')}
                    placeholder="Select options"
                />
                <div className={`arrow ${isOpen ? 'open' : ''}`}>
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41074 0.827486C4.73616 0.502069 5.26382 0.502069 5.58924 0.827486L9.75592 4.99415C10.0814 5.3196 10.0814 5.84723 9.75592 6.17267C9.43048 6.49811 8.90285 6.49811 8.57741 6.17267L4.99999 2.59524L1.42257 6.17267C1.09715 6.49811 0.569481 6.49811 0.244063 6.17267C-0.0813541 5.84723 -0.0813541 5.3196 0.244063 4.99415L4.41074 0.827486Z" fill="black"/>
                    </svg>

                </div>
            </div>

            {isOpen && (
                <div
                    className={`multi_select_dropdown ${dropDirectionUp ? 'up' : 'down'}`}

                >
                    <div className="multi_select_options" ref={dropdownRef}>
                        {options.map((option) => (
                            <label key={option.value} className="multi_select_option">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option.value)}
                                    onChange={() => handleOptionToggle(option.value)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
