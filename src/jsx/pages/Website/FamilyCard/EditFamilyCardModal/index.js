import { Fragment, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import FamilyCardService from "../../../../../services/FamilyCardService";

const EditFamilyCardModal = ({editModal, setEditModal, item, data, setData})=>{
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const familyCardService = new FamilyCardService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        setFormData({
            id: item?.id,
            name: item?.name,
            membership_number: item.membership_number
        })
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let body ={ 
                name: formData?.name,
                membership_number: formData?.membership_number
        }
        setLoading(true)

        familyCardService.updateFamilyMember(formData?.id, body)?.then(res=>{
            if(res && res?.status === 200){
                toast.success(Translate[lang].updated_successfully)
                let update = data?.map(d=>{
                    if(d.id === formData.id){
                        return formData
                    } else{
                        return d
                    }
                })
                setData(update)
                setEditModal()
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
            <Modal.Title>{Translate[lang]?.edit}</Modal.Title>
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
                            <AvField
                                label={Translate[lang]?.name}
                                type='text'
                                placeholder={Translate[lang]?.name}
                                bsSize="lg"
                                name='name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </Col>
                        <Col md={12}>
                            <AvField
                                label={Translate[lang]?.membership_number}
                                type='text'
                                placeholder={Translate[lang]?.membership_number}
                                bsSize="lg"
                                name='membership_number'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.membership_number}
                                onChange={(e) => setFormData({...formData, membership_number: e.target.value})}
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