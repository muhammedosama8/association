import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import uploadImg from '../../../../../images/upload-img.png';
import ProductsService from "../../../../../services/ProductsService";
import { Translate } from "../../../../Enums/Tranlate";
import Loader from "../../../../common/Loader";
import BaseService from "../../../../../services/BaseService";

const AddProductsModal = ({addModal, setAddModal, item, setShouldUpdate})=>{
    const [formData, setFormData] = useState({
        item_no: '',
        product_name: '',
        price: "",
        code: "",
        barcode: "",
        image: "",
    })
    const [isAdd, setIsAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const productsService = new ProductsService()
    const lang = useSelector(state=> state.auth.lang)

    useEffect(() => {
        if(Object.keys(item)?.length === 0){
            setIsAdd(true)
        } else {
            setIsAdd(false)
            setFormData({
                id: item?.id,
                item_no: item?.item_no,
                product_name: item?.product_name,
                price: item?.price,
                code: item?.code,
                barcode: item?.barcode,
                image: item?.image
            })
        }
    },[item])

    const fileHandler = (e) => {
        let files = e.target.files
        const filesData = Object.values(files)
 
        if (filesData.length) {
            setLoading(true)
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.data?.status){
                    setFormData({...formData, image: res.data.url})
                }
                setLoading(false)
            })
        }
    }

    const submit = (e) =>{
        e.preventDefault();
        let data ={ 
            ...formData
        }

        if(isAdd){
            productsService.create(data)?.then(res=>{
                if(res && res?.status === 201){
                    toast.success('Product Added Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        } else {
            productsService.update(formData?.id, data)?.then(res=>{
                if(res && res?.status === 200){
                    toast.success('Product Updated Successfully')
                    setShouldUpdate(prev=> !prev)
                    setAddModal()
                }
            })
        }
    }

    return(
        <Modal className={lang === 'en' ? "en fade addProduct" : "ar fade addProduct"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
                <AvForm
                    className='form-horizontal'
                    onValidSubmit={submit}>
            <Modal.Header>
            <Modal.Title>{isAdd ? Translate[lang]?.add : Translate[lang]?.edit} {Translate[lang]?.product}</Modal.Title>
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
                                label={Translate[lang]?.product_name}
                                type='text'
                                placeholder={Translate[lang]?.product_name}
                                bsSize="lg"
                                name='product_name'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.product_name}
                                onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.item_no}
                                type='text'
                                placeholder={Translate[lang]?.item_no}
                                bsSize="lg"
                                name='item_no'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.item_no}
                                onChange={(e) => setFormData({...formData, item_no: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.price}
                                type='number'
                                min='0'
                                placeholder={Translate[lang]?.price}
                                bsSize="lg"
                                name='price'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                            <AvField
                                label={Translate[lang]?.code}
                                type='text'
                                placeholder={Translate[lang]?.code}
                                bsSize="lg"
                                name='code'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.code}
                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                            />
                            <AvField
                                label={Translate[lang]?.barcode}
                                type='text'
                                placeholder={Translate[lang]?.barcode}
                                bsSize="lg"
                                name='barcode'
                                validate={{
                                    required: {
                                        value: true,
                                        errorMessage: Translate[lang].field_required
                                    }
                                }}
                                value={formData.barcode}
                                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                            />
                        </Col>
                        <Col md={6}>
                        <div className='form-group w-100'>
                            <label className="m-0">{Translate[lang]?.image}</label>
                            <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e)} id={`imageUpload`} /> 					
                                            <label htmlFor={`imageUpload`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2 m-auto">
                                            <div id={`imagePreview`}>
                                            {!!formData?.image && 
                                                <img alt='icon'
                                                    id={`saveImageFile`} 
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.image}
                                                />}
                                            {(!formData?.image && !loading) && 
                                                <img 
                                                    id={`saveImageFile`} 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.image && loading) && <Loader />}
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

export default AddProductsModal;