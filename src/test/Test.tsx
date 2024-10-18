import * as React from "react";
import MainLayout from "@/layouts/MainLayout.tsx";
import MultiSelect from "@/components/UI/MultiSelect/MultiSelect.tsx";

const options = [
    { label: 'Выбрать все', value: '100' },
    { label: 'Опция 1', value: '1' },
    { label: 'Опция 2', value: '2' },
    { label: 'Опция 3', value: '3' },
    // { label: 'Option 2', value: '2' },
    // { label: 'Option 3', value: '3' },
    // { label: 'Option 4', value: '4' },
    // { label: 'Option 5', value: '5' },
    // { label: 'Option 6', value: '6' },
    // { label: 'Option 7', value: '7' },
    // { label: 'Option 8', value: '8' },
    // { label: 'Option 9', value: '9' },
    // { label: 'Option 10', value: '10' },
    // { label: 'Option 11', value: '11' },
    // { label: 'Option 12', value: '12' },
    // { label: 'Option 13', value: '13' },
    // { label: 'Option 14', value: '14' },
    // { label: 'Option 15', value: '15' },
    // { label: 'Option 16', value: '16' },
];

const Test: React.FC = () => {

    return (
        <>
            <MainLayout
                headline="Test"
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            >
                <ul className="main__list">
                    <MultiSelect options={options}/>
                </ul>
            </MainLayout>
        </>
    )
}

export default Test
