import { useSelector } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Translate } from "../Enums/Tranlate";

const YearDropDown = ({params, changeParams}) => {
    const [yearOptions, setYearOptions] = useState([])
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const years = [];
        for(let i = currentYear+5; i >= currentYear-20; i--){
            years.push({label: `${i}`, value: i})
        }
        setYearOptions([...years])
    },[lang])

    return <Select
        placeholder={Translate[lang]?.select}
        options={yearOptions}
        value={params}
        onChange={changeParams}
    />
}
export default YearDropDown;