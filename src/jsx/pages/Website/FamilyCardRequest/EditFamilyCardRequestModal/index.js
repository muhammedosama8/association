import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import { AvForm} from "availity-reactstrap-validation";
import Select from "react-select";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import FamilyCardRequestService from "../../../../../services/FamilyCardRequestService";

const EditFamilyCardModal = ({editModal, setEditModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        status: ''
    })
    const [loading, setLoading] = useState(false)
    const familyCardService = new FamilyCardRequestService()
    const lang = useSelector(state=> state.auth.lang)
    const types = [
        {label: Translate[lang].pending, value: 'pending'},
        {label: Translate[lang].accept, value: 'accept'},
        {label: Translate[lang].reject, value: 'reject'},
    ]

    useEffect(() => {
        setFormData({status: {label: Translate[lang][item.status], value: item.status}})
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let body ={ 
            status: formData?.status?.value,
        }

        setLoading(true)
        familyCardService.updateStatus(item?.id, body)?.then(res=>{
            if(res && res?.status === 200){
                toast.success(Translate[lang].updated_successfully)
                setShouldUpdate(prev => !prev)
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={editModal} onHide={()=>{
            setEditModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.edit} {Translate[lang]?.status}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setEditModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                        <Col md={12}>
                            <label>{Translate[lang]?.status}</label>
                            <Select
                            value={formData.status}
                            name="status"
                            placeholder={Translate[lang]?.select}
                            options={types}
                            onChange={(e) => setFormData({status: e })}
                            />
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setEditModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default EditFamilyCardModal;