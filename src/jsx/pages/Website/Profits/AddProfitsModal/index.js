import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import { AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import ProfitsService from "../../../../../services/ProfitsService";
import YearDropDown from "../../../../common/YearDropDown";

const AddProfitsModal = ({addModal, setAddModal})=>{
    const [formData, setFormData] = useState({
        from: '',
        to: ''
    })
    const [loading, setLoading] = useState(false)
    const profitsService = new ProfitsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(()=>{
        setLoading(true)
        profitsService.getProfitDate()?.then(res=>{
            if(res?.status === 200){
                let data = res.data.data
                setFormData({
                    from: {
                        label: `${data.profit_from}`,
                        value: data.profit_from
                    },
                    to: {
                        label: `${data.profit_to}`,
                        value: data.profit_to
                    }
                })
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    },[])

    const submit = (e) =>{
        e.preventDefault();
        if(!formData.from || !formData.to){
            toast.error('Select Year First!')
            return
        }
        let data ={
            profit_from: formData.from?.value,
            profit_to: formData.to?.value
        }

        setLoading(true)
        profitsService.setProfitDate(data)?.then(res=>{
            if(res?.status === 200){
                toast.success('Profit Years Updated Successfully')
                setAddModal()
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.choose_a_year_of_offer}</Modal.Title>
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
                        <Col md={4}>
                            <label>{Translate[lang].from}</label>
                            <YearDropDown
                                params={formData.from}
                                changeParams={(e)=> setFormData({...formData, from: e})}
                            />
                        </Col>
                        <Col md={4}>
                            <label>{Translate[lang].to}</label>
                            <YearDropDown
                                params={formData.to}
                                changeParams={(e)=> setFormData({...formData, to: e})}
                            />
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
                >{Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddProfitsModal;