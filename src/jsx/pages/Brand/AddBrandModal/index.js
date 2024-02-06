import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../images/upload-img.png';
import BaseService from "../../../../services/BaseService";
import BrandsService from "../../../../services/BrandsService";
import Loader from "../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

const AddBrandModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        en: '',
        ar: '',
        img: ''
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const brandsService = new BrandsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                ar: item?.name_ar,
                en: item?.name_en,
                img: item?.image,
            })
        }
    },[item])

    const fileHandler = (e) => {
        // setFiles([e.target.files[0]])
		// setTimeout(function(){
		// 	var src = document.getElementById(`saveImageFile`)?.getAttribute("src");
		// 	setFormData({...formData, img: {id: '', path: src}})
		// }, 200);

        setLoading(true)
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
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
            name_en: formData?.en,
            name_ar: formData?.ar,
            image: formData?.img
        }
        if(isAdd){
            brandsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Brand Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            brandsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Brand Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade" : "ar fade"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
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
                            <AvField
                                label={Translate[lang]?.english}
                                type='text'
                                placeholder={Translate[lang]?.english}
                                bsSize="lg"
                                name='en'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    },
                                    pattern: {
                                        value: '/^[A-Za-z0-9 ]+$/',
                                        errorMessage: `English format is invalid`
                                    }
                                }}
                                value={formData.en}
                                onChange={(e) => setFormData({...formData, en: e.target.value})}
                            />
                        </Col>

                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.arabic}
                                type='text'
                                placeholder={Translate[lang]?.arabic}
                                value={formData.ar}
                                name='ar'
                                validate={{
                                    required: {
                                        value:true,
                                        errorMessage: Translate[lang].field_required
                                    },
                                    pattern: {
                                        value: '/^[\u0621-\u064A0-9 ]+$/',
                                        errorMessage: `Arabic format is invalid`
                                    }
                                }}
                                onChange={(e) => setFormData({...formData, ar: e.target.value})}
                            />
                        </Col>
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

export default AddBrandModal;