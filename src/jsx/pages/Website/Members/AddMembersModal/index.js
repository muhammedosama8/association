import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.png';
import BaseService from "../../../../../services/BaseService";
import Loader from "../../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import "../style.scss"
import BoardOfDirectorsService from "../../../../../services/BoardOfDirectorsService";

const AddMembersModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        job: '',
        img: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const boardOfDirectorsService = new BoardOfDirectorsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                name: item?.name,
                job: item?.job_title,
                img: item?.image
            })
        }
    },[item])

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
            setLoading(true)
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res.data.status){
                    setFormData({...formData, img: res.data.url})
                    setFiles(filesData[0])
                }
                setLoading(false)
            })
        }
    }

    const submit = () =>{
        if(!formData?.img){
            return
        }
        let data ={
            name: formData?.name,
            job_title: formData?.job,
            image: formData?.img
        }
        setLoading(true)
        if(isAdd){
            boardOfDirectorsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Board Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            })
        } else {
            boardOfDirectorsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Board Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addMember" : "ar fade addMember"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.brand}</Modal.Title>
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
                            <label className="m-0">{Translate[lang]?.image}</label>
                            <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload`} /> 					
                                            <label htmlFor={`imageUpload`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2 m-auto">
                                            <div id={`imagePreview`}>
                                            {!!formData?.img && 
                                                <img alt='icon'
                                                    id={`saveImageFile`} 
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.img|| URL.createObjectURL(files)}
                                                />}
                                            {/* {files[0]?.name && <img id={`saveImageFile`} className='w-100 h-100' style={{borderRadius: '30px'}} src={URL.createObjectURL(files[0])} alt='icon' />} */}
                                            {(!formData?.img && !loading) && 
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
                                label={Translate[lang]?.job}
                                type='text'
                                placeholder={Translate[lang]?.job}
                                value={formData.job}
                                name='job'
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                onChange={(e) => setFormData({...formData, job: e.target.value})}
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
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddMembersModal;