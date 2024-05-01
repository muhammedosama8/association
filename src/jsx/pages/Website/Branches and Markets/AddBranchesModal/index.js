import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import uploadImg from '../../../../../images/upload-img.png';
import BaseService from "../../../../../services/BaseService";
import BrandsService from "../../../../../services/BrandsService";
import Loader from "../../../../common/Loader";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import '../style.scss'
import BranchesAndMarketsService from "../../../../../services/BranchesAndMarketsService";

const AddBranchesModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        address: '',
        img: '',
        work_time: '',
        address_link: ""
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const branchesAndMarketsService = new BranchesAndMarketsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                phone: item?.phone,
                title: item?.title,
                address: item?.address,
                img: item?.image,
                work_time: item?.work_time,
                address_link: item.address_link
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
            toast.error('Upload Image First')
            return
        }
        let data ={
            image: formData?.img,
            work_time: formData?.work_time,
            title: formData?.title,
            address: formData?.address,
            phone: formData?.phone,
            address_link: formData.address_link
        }
        setLoading(true)
        if(isAdd){
            branchesAndMarketsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Branche Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            })
        } else {
            branchesAndMarketsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Branche Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addBranch" : "ar fade addBranch"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
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
                    <Col md={12}>
                        <AvField
                            label={Translate[lang]?.address}
                            type='text'
                            placeholder={Translate[lang]?.address}
                            value={formData.address}
                            name='address'
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: Translate[lang].field_required
                                }
                            }}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                        />
                    </Col>
                    <Col md={12}>
                        <AvField
                            label={`${Translate[lang]?.address_link}`}
                            type='text'
                            placeholder={`${Translate[lang]?.address_link}`}
                            value={formData.address_link}
                            name='address_link'
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: Translate[lang].field_required
                                }
                            }}
                            onChange={(e) => setFormData({...formData, address_link: e.target.value})}
                        />
                    </Col>
                    <Col md={6}>
                        <AvField
                            label={Translate[lang]?.phone}
                            type='text'
                            placeholder={Translate[lang]?.phone}
                            value={formData.phone}
                            name='phone'
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: Translate[lang].field_required
                                }
                            }}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </Col>
                    <Col md={6}>
                        <AvField
                            label={Translate[lang]?.works_hours}
                            type='text'
                            placeholder={Translate[lang]?.works_hours}
                            value={formData.work_time}
                            name='work_time'
                            validate={{
                                required: {
                                    value:true,
                                    errorMessage: Translate[lang].field_required
                                }
                            }}
                            onChange={(e) => setFormData({...formData, work_time: e.target.value})}
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

export default AddBranchesModal;