import { useLocation, useNavigate } from "react-router-dom"
import {
    Row,
    Col,
    Card,
    Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { Translate } from "../../../../Enums/Tranlate";
import { useSelector } from "react-redux";
import ShareholdersRequestsService from "../../../../../services/ShareholdersRequestsService";
import { toast } from "react-toastify";

const Attachments = () =>{
    const [data, setData] = useState({  })
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const lang = useSelector(state=> state.auth.lang)
    const shareholdersRequestsService = new ShareholdersRequestsService()

    useEffect(()=> {
        let res = location?.state?.item
        setData(res)
    },[])

    const acceptRequest = () => {
        let body ={ 
            name: data?.name,
            civil_id: data?.civil_id,
            phone: data?.phone,
            shareholder_attach: data?.shareholder_attach?.map(res=> res.url),
            status: true,
        }
        setLoading(true)
        shareholdersRequestsService.update(data?.id, body)?.then(res=>{
            if(res && res?.status === 200){
                toast.success('Shareholder Requests Accepted Successfully')
                navigate('/shareholders_requests')
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    return <>
    <Card className="mb-3">
        <Card.Body>
            <Row>
                {data?.shareholder_attach?.map((attachment, index)=> {
                    return <Col md={6} sm={6} key={index} className='mb-3'>
                        <a href={attachment?.url} target='_blank'>
                            <img src={attachment?.url} alt={index} className='w-100' />
                        </a>
                    </Col>
                })}
            </Row>
            {!data?.status && <Button variant="primary" type='button' onClick={acceptRequest} disabled={loading} className='mt-5' >
                {Translate[lang]?.add}
            </Button>}
        </Card.Body>
    </Card>
    </>
}
export default Attachments