import { useLocation, useNavigate } from "react-router-dom"
import {
    Row,
    Col,
    Card,
    Table,
    Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Translate } from "../../../../Enums/Tranlate";
import { useSelector } from "react-redux";

const People = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=> {
        setData(location?.state?.people)
    },[])

    return <>
    <Card className="mb-3">
        <Card.Body>
        <Table responsive>
            <thead>
                <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.membership_number}</strong>
                    </th>
                </tr>
            </thead>
            <tbody className="table-body">
                {data?.map((item,index)=>{
                    return <tr key={index} className='text-center'>
                        <td>
                            <strong>{item.id}</strong>
                        </td>
                        <td>
                            {item?.name}
                        </td>
                        <td>{item.membership_number}</td>
                    </tr>
                })}
            </tbody>
        </Table>
            <Button variant="secondary" type='button' onClick={()=> navigate("/family_card")} className='mt-5' >
                {Translate[lang]?.cancel}
            </Button>
        </Card.Body>
    </Card>
    </>
}
export default People