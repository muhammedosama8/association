import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.png';
import BaseService from "../../../../../services/BaseService";
import Loader from "../../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import OfferService from "../../../../../services/OfferService";

const AddOffersModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        pdf: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingImg, setLoadingImg] = useState(false)
    const offerService = new OfferService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                title: item?.title,
                img: item?.image,
            })
        }
    },[item])

    const submit = () =>{
        if(!formData?.pdf || !formData?.img){
            toast.error(`Upload ${!formData?.pdf ? 'Offer' : ''} ${!formData?.pdf && !formData?.img ? "&" : ''} ${!formData?.img ? 'Image' : ''} First`)
            return
        }

        let data ={
            title: formData?.title,
            image: formData?.pdf,
            cover_image: formData?.img
        }

        if(isAdd){
            offerService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Brand Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            offerService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Brand Updated Successfully')
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
                                                                setFormData({...formData, img: res.data.url})
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
                                                {!!formData?.img && 
                                                    <img alt='icon'
                                                        id={`saveImageFile1`} 
                                                        className='la la-check w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.img|| URL.createObjectURL(files)}
                                                    />}
                                                {/* {files[0]?.name && <img id={`saveImageFile`} className='w-100 h-100' style={{borderRadius: '30px'}} src={URL.createObjectURL(files[0])} alt='icon' />} */}
                                                {(!formData?.img && !loadingImg) && 
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
                                                <input type="file" onChange={(e) => {
                                                    let files = e.target.files
                                                    const filesData = Object.values(files)
                                                    if (filesData.length) {
                                                        setLoading(true)
                                                        new BaseService().postUpload(filesData[0]).then(res=>{
                                                            if(res?.data?.status){
                                                                setFormData({...formData, pdf: res.data.url})
                                                                setFiles(filesData[0])
                                                            }
                                                            setLoading(false)
                                                        })
                                                    }
                                                }} id={`imageUpload`} /> 					
                                                <label htmlFor={`imageUpload`}  name=''></label>
                                            </div>
                                            <div className="avatar-preview2 m-auto">
                                                <div id={`imagePreview`}>
                                                {!!formData?.pdf && 
                                                    <img alt='icon'
                                                        id={`saveImageFile`} 
                                                        className='la la-check w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.pdf|| URL.createObjectURL(files)}
                                                    />}
                                                {/* {files[0]?.name && <img id={`saveImageFile`} className='w-100 h-100' style={{borderRadius: '30px'}} src={URL.createObjectURL(files[0])} alt='icon' />} */}
                                                {(!formData?.pdf && !loading) && 
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

export default AddOffersModal;