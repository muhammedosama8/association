import { Fragment, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import FamilyCardService from "../../../../../services/FamilyCardService";

const AddShareholdersRequestsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        civil_id: '',
        number_of_people: "",
        people: []
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const familyCardService = new FamilyCardService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            // setFormData({
            //     id: item?.id,
            //     name: item?.name,
            //     civil_id: item?.civil_id,
            //     phone: item?.phone,
            //     shareholder_code_number: item?.shareholder_code_number,
            //     box_number: item?.box_number,
            //     family_card: item?.family_card
            // })
        }
    },[item])

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
                name: formData?.name,
                civil_id: formData?.civil_id,
                phone: formData?.phone,
                shareholder_code_number: formData?.shareholder_code_number,
                box_number: formData?.box_number,
                family_card: formData?.family_card
        }
        setLoading(true)

        if(isAdd){
            familyCardService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Shareholder Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        } else {
            familyCardService.update(formData?.id, data)?.then(res=>{
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
                                label={Translate[lang]?.number_of_people}
                                type='number'
                                placeholder={Translate[lang]?.number_of_people}
                                min='0'
                                bsSize="lg"
                                name='number_of_people'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.number_of_people}
                                onChange={(e) => {
                                    let arr = []
                                    for(let i = 0; i< e.target.value; i++){
                                        arr.push({name: "", membership_number: ""})
                                    }
                                    setFormData({
                                        ...formData, 
                                        number_of_people: e.target.value,
                                        people: arr
                                    })
                                }}
                            />
                        </Col>
                        <Col md={12}><hr/></Col>
                        
                        {formData?.people?.map((item,index)=>{
                            return <Fragment key={index}>
                            <Col md={6}>
                            <AvField
                                label={`${index+1}) ${Translate[lang]?.name}`}
                                type='text'
                                placeholder={Translate[lang]?.name}
                                bsSize="lg"
                                name={`name${index}`}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={item.name}
                                onChange={(e) => {
                                    let update = formData.people?.map((res, ind)=> {
                                        if(ind === index){
                                            return {
                                                ...res,
                                                name: e.target.value
                                            }
                                        } else {
                                            return res
                                        }
                                    })
                                    setFormData({...formData, people: update})
                                }}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={`${index+1}) ${Translate[lang]?.membership_number}`}
                                type='text'
                                placeholder={Translate[lang]?.membership_number}
                                bsSize="lg"
                                name={`membership_number${index}`}
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={item.membership_number}
                                onChange={(e) => {
                                    let update = formData.people?.map((res, ind)=> {
                                        if(ind === index){
                                            return {
                                                ...res,
                                                membership_number: e.target.value
                                            }
                                        } else {
                                            return res
                                        }
                                    })
                                    setFormData({...formData, people: update})
                                }}
                            />
                        </Col>
                            </Fragment>
                        })}
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

export default AddShareholdersRequestsModal;