import * as React from "react";
import Header from "@/components/Header/Header.tsx";
import {useState} from "react";
import {useParams} from "react-router-dom";

const VznItemInfo: React.FC = () => {

    const [vznNum, setVznNum] = useState('№132313')
    const { vznItemId } = useParams();


    return (
        <>
            <Header
                headline={"ВЗН " + vznNum +" (Расход)"}
                showCloseButton={false}
                hasBorder={true}
                isBlueBackground={true}
            />
            <main className={'main'}>
                test {vznItemId}
            </main>
        </>
    )
}

export default VznItemInfo
