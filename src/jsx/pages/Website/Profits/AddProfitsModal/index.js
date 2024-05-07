import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProfitsService from "../../../../../services/ProfitsService";
import { Translate } from "../../../../Enums/Tranlate";
import DateRangePicker from "react-bootstrap-daterangepicker";

const AddProfitsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        from: '',
        to: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const profitsService = new ProfitsService()
    const lang = useSelector(state=> state.auth.lang)
    const range = useRef()

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
        let data ={ }
        setLoading(true)

        if(isAdd){
            profitsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Shareholder Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        } else {
            profitsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Shareholder Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        }
    }

    const getDate= (theDate)=>{
        const date = new Date(theDate);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed, so add 1
        const year = date.getFullYear();

        if(month<10 && day < 10){
            return `${year}-0${month}-0${day}`;
        }
        if(month<10){
            return `${year}-0${month}-${day}`;
        }
        if(day<10){
            return `${year}-${month}-0${day}`;
        }
        return `${year}-${month}-${day}`;
    }

    const handleCallback=(start, end)=> {
        let startDate = start?._d
        let endDate = end?._d

        setFormData({
            from: getDate(startDate),
            to: getDate(endDate),
        })
    }

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.profits}</Modal.Title>
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
                        <DateRangePicker onCallback={handleCallback} ref={range} >
                            <input type="text" className="form-control w-100 input-daterange-timepicker" />
                        </DateRangePicker>
                        </Col>
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

export default AddProfitsModal;