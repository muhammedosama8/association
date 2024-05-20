import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ShareholdersRequestsService from "../../../../../services/ShareholdersRequestsService";
import { Translate } from "../../../../Enums/Tranlate";
import Loader from "../../../../common/Loader";
import uploadImg from '../../../../../images/upload-img.png';
import BaseService from "../../../../../services/BaseService";

const AddShareholdersRequestsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        civil_id: '',
        phone: "",
        image_front: '',
        image_back: "",
        expire_date: '',
        status: true
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const shareholdersRequestsService = new ShareholdersRequestsService()
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
                phone: item?.phone,
                image_back: item?.image_back,
                image_front: item?.image_front,
                expire_date: item?.expire_date?.split('T')[0],
                status: item?.status
            })
        }
    },[item])

    const fileHandler = (e, ind) => {
        let files = e.target.files
        const filesData = Object.values(files)

        if (filesData?.length) {
            if(ind === 0){
                setLoading(true)
            } else {
                setLoading1(true)
            }
            
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    if(ind === 0){
                        setFormData({...formData, image_front: res?.data?.url })
                    } else {
                        setFormData({...formData, image_back: res?.data?.url })
                    }
                }
                if(ind === 0){
                    setLoading(false)
                } else {
                    setLoading1(false)
                }
            })
        }
    }

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
                name: formData?.name,
                civil_id: formData?.civil_id,
                phone: formData?.phone,
                image_front: formData?.image_front,
                image_back: formData?.image_back,
                expire_date: formData?.expire_date,
        }
        setLoading(true)

        if(isAdd){
            shareholdersRequestsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Shareholder Requests Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
                setLoading(false)
            }).catch(()=> setLoading(false))
        } else {
            data['status'] = formData?.status
            shareholdersRequestsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Shareholder Requests Updated Successfully')
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
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.shareholders_requests}</Modal.Title>
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
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.expire_date}
                                type='date'
                                placeholder={Translate[lang]?.expire_date}
                                bsSize="lg"
                                name='expire_date'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.expire_date}
                                onChange={(e) => setFormData({...formData, expire_date: e.target.value})}
                            />
                        </Col>
                        <Col md={6} className='mt-3'></Col>
                        <Col md={6} className='mt-3'>
                            <div className='form-group w-100'>
                                <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_front}</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" onChange={(e) => fileHandler(e, 0)} id={`imageUpload1`} /> 					
                                        <label htmlFor={`imageUpload1`}  name=''></label>
                                    </div>
                                    <div className="avatar-preview2 m-auto">
                                        <div id={`imagePreview`}>
                                        {!!formData?.image_front && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.image_front}
                                                />}
                                                {!!formData?.image_front && <button
                                                    style={{
                                                        border: '1px solid #dedede',
                                                        borderRadius:' 50%',
                                                        padding: '2px 5px',
                                                        position: 'absolute',
                                                        zIndex: '999'
                                                    }}
                                                    type="button"
                                                    onClick={() => setFormData({...formData, image_front: ""})}
                                                    >
                                                    <i className="la la-trash text-danger"></i>
                                                </button>}
                                        {(!formData?.image_front && !loading) && 
                                            <img  
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px', height: '80px',
                                                }}
                                            />}
                                            {(!formData?.image_front && loading) && <Loader />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className='mt-3'>
                            <div className='form-group w-100'>
                                <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_back}</label>
                                <div className="image-placeholder">	
                                    <div className="avatar-edit">
                                        <input type="file" multiple onChange={(e) => fileHandler(e, 1)} id={`imageUpload`} /> 					
                                        <label htmlFor={`imageUpload`}  name=''></label>
                                    </div>
                                    <div className="avatar-preview2 m-auto">
                                        <div id={`imagePreview`}>
                                        {!!formData?.image_back && 
                                            <img alt='icon'
                                                className='w-100 h-100' 
                                                style={{borderRadius: '30px'}} 
                                                src={formData?.image_back}
                                        />}
                                        {!!formData?.image_back && <button
                                            style={{
                                                border: '1px solid #dedede',
                                                borderRadius:' 50%',
                                                padding: '2px 5px',
                                                position: 'absolute',
                                                zIndex: '999'
                                            }}
                                            type="button"
                                            onClick={() => setFormData({...formData, image_back: ""})}
                                            >
                                            <i className="la la-trash text-danger"></i>
                                        </button>}
                                        {(!formData?.image_back && !loading1) && 
                                            <img 
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                }}
                                        />}
                                        {(!formData?.image_back && loading1) && <Loader />}
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
                    disabled={loading || loading1}
                >{isAdd ? Translate[lang]?.add : Translate[lang]?.edit}</Button>
            </Modal.Footer>
            </AvForm>
        </Modal>)
}

export default AddShareholdersRequestsModal;