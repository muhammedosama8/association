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
    },[location?.state?.item])

    const acceptRequest = (stat) => {
        let body ={ 
            name: data?.name,
            civil_id: data?.civil_id,
            phone: data?.phone,
            image_front: data?.image_front,
            image_back: data?.image_back,
            status: stat,
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
                <Col md={6} sm={6} className='mb-3'>
                    <a href={data?.image_front} target='_blank' rel="noreferrer">
                        <img src={data?.image_front} alt='image_front' className='w-100' />
                    </a>
                </Col>
                <Col md={6} sm={6} className='mb-3'>
                    <a href={data?.image_back} target='_blank' rel="noreferrer">
                        <img src={data?.image_back} alt='image_back' className='w-100' />
                    </a>
                </Col>
            </Row>
            {data?.status === 'pending' && <div className="d-flex justify-content-between"> 
                <Button variant="primary" type='button' onClick={()=> acceptRequest('accept')} disabled={loading} className='mt-5' >
                    {Translate[lang]?.accept}
                </Button>
                <Button variant="danger" type='button' onClick={()=> acceptRequest('reject')} disabled={loading} className='mt-5' >
                    {Translate[lang]?.reject}
                </Button>
            </div>}
        </Card.Body>
    </Card>
    </>
}
export default Attachments