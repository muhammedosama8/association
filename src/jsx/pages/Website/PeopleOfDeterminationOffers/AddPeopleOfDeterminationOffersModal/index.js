import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.png';
import BaseService from "../../../../../services/BaseService";
import Loader from "../../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import PeopleOfDeterminationOffersService from "../../../../../services/PeopleOfDeterminationOffersService";

const AddPeopleOfDeterminationOffersModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        cover_image: ""
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingImg, setLoadingImg] = useState(false)
    const peopleOfDeterminationOffersService = new PeopleOfDeterminationOffersService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                title: item?.title,
                image: item?.image,
                cover_image: item?.cover_image,
            })
        }
    },[item])

    const submit = () =>{
        let data ={
            title: formData?.title,
            image: formData?.image,
            cover_image: formData?.cover_image
        }

        if(isAdd){
            peopleOfDeterminationOffersService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Offer Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            peopleOfDeterminationOffersService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Offer Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
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
                    <Col md={6}>
                            <div className='form-group w-100'>
                                <label className="mx-4">{Translate[lang]?.image}</label>
                                <div className="image-placeholder">	
                                            <div className="avatar-edit">
                                                <input type="file" onChange={(e) => {
                                                    let files = e.target.files
                                                    const filesData = Object.values(files)
                                                    if (filesData.length) {
                                                        setLoadingImg(true)
                                                        new BaseService().postUpload(filesData[0]).then(res=>{
                                                            if(res?.data?.status){
                                                                setFormData({...formData, image: res.data.url})
                                                                setFiles(filesData[0])
                                                            }
                                                            setLoadingImg(false)
                                                        })
                                                    }
                                                }} id={`imageUpload1`} /> 					
                                                <label htmlFor={`imageUpload1`}  name=''></label>
                                            </div>
                                            <div className="avatar-preview2 m-auto">
                                                <div id={`imagePreview1`}>
                                                {!!formData?.image && 
                                                    <img alt='icon'
                                                        id={`saveImageFile1`} 
                                                        className='la la-check w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.image}
                                                    />}
                                                {/* {files[0]?.name && <img id={`saveImageFile`} className='w-100 h-100' style={{borderRadius: '30px'}} src={URL.createObjectURL(files[0])} alt='icon' />} */}
                                                {(!formData?.image && !loadingImg) && 
                                                    <img 
                                                        id={`saveImageFile1`} 
                                                        src={uploadImg} alt='icon'
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                        }}
                                                    />}
                                                    {(!formData?.img && loadingImg) && <Loader />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </Col>
                        <Col md={6}>
                            <div className='form-group w-100'>
                                <label className="mx-4">{Translate[lang]?.offer}</label>
                                <div className="image-placeholder">	
                                            <div className="avatar-edit">
                                                <input type="file" accept=".pdf, .txt,.doc, .docx" onChange={(e) => {
                                                    let files = e.target.files
                                                    const filesData = Object.values(files)
                                                    if (filesData.length) {
                                                        setLoading(true)
                                                        new BaseService().postUpload(filesData[0]).then(res=>{
                                                            if(res?.data?.status){
                                                                setFormData({...formData, cover_image: res.data.url})
                                                                setFiles(filesData[0])
                                                            }
                                                            setLoading(false)
                                                        })
                                                    }
                                                }} id={`imageUpload`} /> 					
                                                <label htmlFor={`imageUpload`}  name=''></label>
                                            </div>
                                            <div className="avatar-preview2 m-auto">
                                                <div id={`imagePreview`} className='d-flex align-items-center justify-content-center' style={{fontSize: '61px', color: '#03447b'}}>
                                                {!!formData?.cover_image &&  <i className="la la-check-circle" />}
                                                {(!formData?.cover_image && !loading) && 
                                                    <img 
                                                        id={`saveImageFile`} 
                                                        src={uploadImg} alt='icon'
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                        }}
                                                    />}
                                                    {(!formData?.pdf && loading) && <Loader />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </Col>
                        <Col md={12}>
                            <AvField
                                label={Translate[lang]?.title}
                                type='text'
                                placeholder={Translate[lang]?.title}
                                bsSize="lg"
                                name='title'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
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

export default AddPeopleOfDeterminationOffersModal;