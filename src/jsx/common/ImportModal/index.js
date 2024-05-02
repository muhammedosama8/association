import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../images/upload-img.png';
import Loader from "../Loader";
import { useSelector } from "react-redux";
import BaseService from "../../../services/BaseService";
import { Translate } from "../../Enums/Tranlate";

const ImportModal = ({addModal, setAddModal, name, service, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        file: ''
    })
    const [loading, setLoading] = useState(false)
    const lang = useSelector(state=> state.auth.lang)

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
            setLoading(true)
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.data?.status){
                    setFormData({ file: res.data.url})
                }
                setLoading(false)
            })
        }
    }

    const submit = () =>{
        let data ={...formData}

        setLoading(true)
        service.create(data).then(res=>{
            if(res && res?.status === 201){
                toast.success('Added Successfully')
                setShouldUpdate(prev=> !prev)
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
            <Modal.Title>{Translate[lang]?.add} {Translate[lang][name]}</Modal.Title>
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
                        <div className='form-group w-100'>
                            <label className="m-0">{Translate[lang]?.file}</label>
                            <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload`} /> 					
                                            <label htmlFor={`imageUpload`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2 m-auto">
                                            <div id={`imagePreview`}>
                                            {!!formData?.file && 
                                                <img alt='icon'
                                                    id={`saveImageFile`} 
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.img}
                                                />}
                                            {(!formData?.file && !loading) && 
                                                <img 
                                                    id={`saveImageFile`} 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.img && loading) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                >{Translate[lang]?.add}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default ImportModal;