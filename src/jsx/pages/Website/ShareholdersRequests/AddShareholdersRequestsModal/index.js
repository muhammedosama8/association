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
        shareholder_attach: ["", ""],
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
                shareholder_attach: item?.shareholder_attach?.map(res=> res?.url),
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
                    let update = formData.shareholder_attach?.map((att, index)=>{
                        if(index === ind){
                            return res?.data?.url 
                        } else{
                            return att
                        }
                    })
                    setFormData({...formData, shareholder_attach: [...update]})
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
                shareholder_attach: formData?.shareholder_attach,
                status: formData?.status,
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

    const deleteAttachment = (index) => {
        let update = formData?.shareholder_attach?.map((att, ind) => {
            if(index === ind){
                return ""
            } else {
                return att
            }
        })
        setFormData({...formData, shareholder_attach: update})
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
                                        {!!formData?.shareholder_attach[0] && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.shareholder_attach[0]}
                                                />}
                                                {!!formData?.shareholder_attach[0] && <button
                                                    style={{
                                                        border: '1px solid #dedede',
                                                        borderRadius:' 50%',
                                                        padding: '2px 5px',
                                                        position: 'absolute',
                                                        zIndex: '999'
                                                    }}
                                                    type="button"
                                                    onClick={() => deleteAttachment(0)}
                                                    >
                                                    <i className="la la-trash text-danger"></i>
                                                </button>}
                                        {(!formData?.shareholder_attach[0] && !loading) && 
                                            <img  
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px', height: '80px',
                                                }}
                                            />}
                                            {(!formData?.shareholder_attach[0] && loading) && <Loader />}
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
                                        {!!formData?.shareholder_attach[1] && 
                                            <img alt='icon'
                                                className='w-100 h-100' 
                                                style={{borderRadius: '30px'}} 
                                                src={formData?.shareholder_attach[1]}
                                        />}
                                        {!!formData?.shareholder_attach[1] && <button
                                            style={{
                                                border: '1px solid #dedede',
                                                borderRadius:' 50%',
                                                padding: '2px 5px',
                                                position: 'absolute',
                                                zIndex: '999'
                                            }}
                                            type="button"
                                            onClick={() => deleteAttachment(1)}
                                            >
                                            <i className="la la-trash text-danger"></i>
                                        </button>}
                                        {(!formData?.shareholder_attach[1] && !loading1) && 
                                            <img 
                                                src={uploadImg} alt='icon'
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                }}
                                        />}
                                        {(!formData?.shareholder_attach[1] && loading1) && <Loader />}
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

export default AddShareholdersRequestsModal;