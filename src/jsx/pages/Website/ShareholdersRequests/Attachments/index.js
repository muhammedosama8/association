import { useLocation } from "react-router-dom"
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

const Attachments = () =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=> {
        setData(location?.state?.attachments)
    },[])
    console.log(data)
    return <>
    <Card className="mb-3">
        <Card.Body>
            <Row>
                {data?.map((attachment, index)=> {
                    return <Col md={4} sm={6} key={index} className='mb-3'>
                        <a href={attachment} target='_blank'>
                            <img src={attachment} alt={index} className='w-100' />
                        </a>
                    </Col>
                })}
            </Row>
            <Button variant="primary" type='button' disabled={loading} className='mt-5' >
                {Translate[lang]?.add}
            </Button>
        </Card.Body>
    </Card>
    </>
}
export default Attachments