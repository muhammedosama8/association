import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ShareholdersService from "../../../../../services/ShareholdersService";
import { Translate } from "../../../../Enums/Tranlate";

const AddShareholdersModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        civil_id: '',
        // phone: "",
        shareholder_code_number: "",
        box_number: "",
        // family_card: ""
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const shareholdersService = new ShareholdersService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                name: item?.name,
                civil_id: item?.civil_id,
                // phone: item?.phone,
                shareholder_code_number: item?.shareholder_code_number,
                box_number: item?.box_number,
                // family_card: item?.family_card
            })
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
                name: formData?.name,
                civil_id: formData?.civil_id,
                // phone: formData?.phone,
                shareholder_code_number: formData?.shareholder_code_number,
                box_number: formData?.box_number,
                // family_card: formData?.family_card
        }
        setLoading(true)

        if(isAdd){
            shareholdersService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Shareholder Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        } else {
            shareholdersService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Shareholder Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.shareholders}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setAddModal()
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
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.civil_id}
                                type='text'
                                placeholder={Translate[lang]?.civil_id}
                                bsSize="lg"
                                name='civil_id'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.civil_id}
                                onChange={(e) => setFormData({...formData, civil_id: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.box_number}
                                type='text'
                                placeholder={Translate[lang]?.box_number}
                                bsSize="lg"
                                name='box_number'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.box_number}
                                onChange={(e) => setFormData({...formData, box_number: e.target.value})}
                            />
                        </Col>
                        {/* <Col md={6}>
                            <AvField
                                label={Translate[lang]?.phone}
                                type='text'
                                placeholder={Translate[lang]?.phone}
                                bsSize="lg"
                                name='phone'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </Col> */}
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.shareholder_code_number}
                                type='text'
                                placeholder={Translate[lang]?.shareholder_code_number}
                                bsSize="lg"
                                name='shareholder_code_number'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.shareholder_code_number}
                                onChange={(e) => setFormData({...formData, shareholder_code_number: e.target.value})}
                            />
                        </Col>
                        {/* <Col md={6}>
                            <AvField
                                label={Translate[lang]?.family_card}
                                type='text'
                                placeholder={Translate[lang]?.family_card}
                                bsSize="lg"
                                name='family_card'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.family_card}
                                onChange={(e) => setFormData({...formData, family_card: e.target.value})}
                            />
                        </Col> */}
                    </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            <Button 
                    variant="primary" 
                    type='submit'
                    disabled={loading}
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddShareholdersModal;