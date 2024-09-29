import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap"
import {AvField, AvForm} from "availity-reactstrap-validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";
import uploadImg from "../../../../../images/upload-img.png";
import Select from "react-select";
import FamilyCardRequestService from "../../../../../services/FamilyCardRequestService";
import BaseService from "../../../../../services/BaseService";
import Loader from "../../../../common/Loader";
import { useNavigate } from "react-router-dom";

const AddFamilyCardRequest = ()=>{
    const [formData, setFormData] = useState({
        name: '',
        civil_id: '',
        phone: "",
        type: '',
        father_image_front: "",
        father_image_back: "",
        mother_image_front: "",
        mother_image_back: "",
        custody_decision: "",
        divorce_document: "",
        husband_death_certificate: "",

        civilian_boys:[
            {image_back: '', image_front: '', image_back_loading: false, image_front_loading: false}
        ]
    })
    const [loading, setLoading] = useState(false)
    const [loadingImages, setLoadingImages] = useState({
        father_image_front: false,
        father_image_back: false,
        mother_image_front: false,
        mother_image_back: false,
        custody_decision: false,
        divorce_document: false,
        husband_death_certificate: false
    })
    const familyCardService = new FamilyCardRequestService()
    const lang = useSelector(state=> state.auth.lang)
    const types = [
        {label: "head of household", value: "head_of_household"},
        {label: "divorced", value: "divorced"},
        {label: "widow", value: "widow"},
    ]
    const navigate = useNavigate()

    const submit = (e) =>{
        e.preventDefault();
        if(!formData?.type.label){
            toast.error("Select Type")
            return
        }
        let data ={ 
                name: formData?.name,
                civil_id: formData?.civil_id,
                phone: formData?.phone,
                type: formData?.type.label,
        }
        if(formData?.type.value === "head_of_household"){
            if(!!formData?.father_image_front) data['father_image_front'] = formData?.father_image_front
            if(!!formData?.father_image_back) data['father_image_back'] = formData?.father_image_back
            if(!!formData?.mother_image_front) data['mother_image_front'] = formData?.mother_image_front
            if(!!formData?.mother_image_back) data['mother_image_back'] = formData?.mother_image_back
            if(!!formData?.marriage_certificate) data['marriage_certificate'] = formData?.marriage_certificate
        }
        if(formData?.type.value === "divorced"){
            if(!!formData?.divorce_document) data['divorce_document'] = formData?.divorce_document
            if(!!formData?.custody_decision) data['custody_decision'] = formData?.custody_decision
        }
        if(formData?.type.value === "widow"){
            if(!!formData?.husband_death_certificate) data['husband_death_certificate'] = formData?.husband_death_certificate
        }
        if(!!formData?.civilian_boys?.filter(res=> !!res?.image_front || !!res?.image_back)?.length){
            data['civilian_boys'] = formData?.civilian_boys?.map(res=> {
                let info = {}
                if(!!res?.image_front) info['image_front'] = res?.image_front
                if(!!res?.image_back) info['image_back'] = res?.image_back

                return info
            })
        }

        setLoading(true)
        familyCardService.create(data)?.then(res=>{
            if(res && res?.status === 201){
                toast.success('Family Card Request Added Successfully')
                navigate('/family_card_request')
            }
            setLoading(false)
        }).catch(()=> setLoading(false))
    }

    const fileHandler = (e, type) => {
        let files = e.target.files
        const filesData = Object.values(files)
        if (filesData?.length) {
            setLoadingImages({...loadingImages, [type]: true})
            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    setFormData({...formData, [type]: res?.data?.url })
                }
                setLoadingImages({...loadingImages, [type]: false})
            })
        }
    }

    const fileHandlerCivilianBoys = (e, index, type) => {
        let files = e.target.files
        const filesData = Object.values(files)
        if (filesData?.length) {
            let update = formData?.civilian_boys?.map((boys, ind) => {
                if(index === ind){
                    return {
                        ...boys,
                        [`${type}_loading`]: true
                    }
                } else {
                    return boys
                }
            })
            setFormData({...formData, civilian_boys: update})

            new BaseService().postUpload(filesData[0]).then(res=>{
                if(res?.status === 200){
                    let update = formData?.civilian_boys?.map((boys, ind) => {
                        if(index === ind){
                            return {
                                ...boys,
                                [type]: res?.data?.url ,
                                [`${type}_loading`]: false
                            }
                        } else {
                            return boys
                        }
                    })
                    setFormData({...formData, civilian_boys: update})
                }
            })
        }
    }

    return(<Card>
        <Card.Body>
            <AvForm className='form-horizontal' onValidSubmit={submit}>
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
                            type='number'
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
                        <label>{Translate[lang]?.type}</label>
                        <Select
                        value={formData.type}
                        name="type"
                        placeholder={Translate[lang]?.select}
                        options={types}
                        onChange={(e) => setFormData({ ...formData, type: e })}
                        />
                    </Col>
                    <Col md={6}></Col>

                    {formData?.type?.value === 'head_of_household' && <>
                        <Col md={12} className='mt-4'>
                            <label className="m-0 d-block">{Translate[lang]?.father}</label>
                        </Col>
                        <Col md={6}>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_front}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e, 'father_image_front')} id={`father_image_front`} /> 					
                                            <label htmlFor={`father_image_front`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.father_image_front && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.father_image_front}
                                                    />}
                                                    {!!formData?.father_image_front && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, father_image_front: ""})}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!formData?.father_image_front && !loadingImages?.father_image_front) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.father_image_front && loadingImages?.father_image_front) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6}>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_back}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file"  onChange={(e) => fileHandler(e, 'father_image_back')} id={`father_image_back`} /> 					
                                            <label htmlFor={`father_image_back`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.father_image_back && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.father_image_back}
                                            />}
                                            {!!formData?.father_image_back && <button
                                                style={{
                                                    border: '1px solid #dedede',
                                                    borderRadius:' 50%',
                                                    padding: '2px 5px',
                                                    position: 'absolute',
                                                    zIndex: '999'
                                                }}
                                                type="button"
                                                onClick={() => setFormData({...formData, father_image_back: ""})}
                                                >
                                                <i className="la la-trash text-danger"></i>
                                            </button>}
                                            {(!formData?.father_image_back && !loadingImages?.father_image_back) && 
                                                <img 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                            />}
                                            {(!formData?.father_image_back && loadingImages?.father_image_back) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={12} className='mt-4'>
                            <label className="m-0 d-block">{Translate[lang]?.mother}</label>
                        </Col>
                        <Col md={6}>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_front}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e, 'mother_image_front')} id={`mother_image_front`} /> 					
                                            <label htmlFor={`mother_image_front`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.mother_image_front && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.mother_image_front}
                                                    />}
                                                    {!!formData?.mother_image_front && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, mother_image_front: ""})}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!formData?.mother_image_front && !loadingImages?.mother_image_front) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.mother_image_front && loadingImages?.mother_image_front) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6}>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_back}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file"  onChange={(e) => fileHandler(e, 'mother_image_back')} id={`mother_image_back`} /> 					
                                            <label htmlFor={`mother_image_back`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.mother_image_back && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.mother_image_back}
                                            />}
                                            {!!formData?.mother_image_back && <button
                                                style={{
                                                    border: '1px solid #dedede',
                                                    borderRadius:' 50%',
                                                    padding: '2px 5px',
                                                    position: 'absolute',
                                                    zIndex: '999'
                                                }}
                                                type="button"
                                                onClick={() => setFormData({...formData, mother_image_back: ""})}
                                                >
                                                <i className="la la-trash text-danger"></i>
                                            </button>}
                                            {(!formData?.mother_image_back && !loadingImages?.mother_image_back) && 
                                                <img 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                            />}
                                            {(!formData?.mother_image_back && loadingImages?.mother_image_back) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6} className='mt-4'>
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.marriage_certificate}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e, 'marriage_certificate')} id={`marriage_certificate`} /> 					
                                            <label htmlFor={`marriage_certificate`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.marriage_certificate && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.marriage_certificate}
                                                    />}
                                                    {!!formData?.marriage_certificate && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, marriage_certificate: ""})}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!formData?.marriage_certificate && !loadingImages?.marriage_certificate) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.marriage_certificate && loadingImages?.marriage_certificate) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6}></Col>
                    </>}

                    {formData?.type?.value === 'divorced' && <>
                        <Col md={6} className="mt-3">
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.divorce_document}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e, 'divorce_document')} id={`divorce_document`} /> 					
                                            <label htmlFor={`divorce_document`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.divorce_document && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.divorce_document}
                                                    />}
                                                    {!!formData?.divorce_document && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, divorce_document: ""})}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!formData?.divorce_document && !loadingImages?.divorce_document) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.divorce_document && loadingImages?.divorce_document) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6} className="mt-3">
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.custody_decision}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file"  onChange={(e) => fileHandler(e, 'custody_decision')} id={`custody_decision`} /> 					
                                            <label htmlFor={`custody_decision`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.custody_decision && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={formData?.custody_decision}
                                            />}
                                            {!!formData?.custody_decision && <button
                                                style={{
                                                    border: '1px solid #dedede',
                                                    borderRadius:' 50%',
                                                    padding: '2px 5px',
                                                    position: 'absolute',
                                                    zIndex: '999'
                                                }}
                                                type="button"
                                                onClick={() => setFormData({...formData, custody_decision: ""})}
                                                >
                                                <i className="la la-trash text-danger"></i>
                                            </button>}
                                            {(!formData?.custody_decision && !loadingImages?.custody_decision) && 
                                                <img 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                            />}
                                            {(!formData?.custody_decision && loadingImages?.custody_decision) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                    </>}

                    {formData?.type?.value === 'widow' && <>
                        <Col md={6} className="mt-3">
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.husband_death_certificate}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandler(e, 'husband_death_certificate')} id={`husband_death_certificate`} /> 					
                                            <label htmlFor={`husband_death_certificate`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!formData?.husband_death_certificate && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={formData?.husband_death_certificate}
                                                    />}
                                                    {!!formData?.husband_death_certificate && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => setFormData({...formData, husband_death_certificate: ""})}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!formData?.husband_death_certificate && !loadingImages?.husband_death_certificate) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!formData?.husband_death_certificate && loadingImages?.husband_death_certificate) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6} className="mt-3"></Col>
                    </>}

                    <Col md={12} className='mt-4 mb-3'>
                        <label className="m-0 d-block">{Translate[lang]?.civilian_boys}</label>
                    </Col>
                    {formData?.civilian_boys?.map((boys, index) =>{
                        return <>
                        <Col md={6} className="mb-3">
                                <div className='form-group w-100'>
                                    <label className="m-0">{index+1} )  {Translate[lang]?.image} {Translate[lang]?.from_front}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file" onChange={(e) => fileHandlerCivilianBoys(e, index, 'image_front')} id={`image_front${index}`} /> 					
                                            <label htmlFor={`image_front${index}`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!boys?.image_front && 
                                                    <img alt='icon'
                                                        className='w-100 h-100' 
                                                        style={{borderRadius: '30px'}} 
                                                        src={boys?.image_front}
                                                    />}
                                                    {!!boys?.image_front && <button
                                                        style={{
                                                            border: '1px solid #dedede',
                                                            borderRadius:' 50%',
                                                            padding: '2px 5px',
                                                            position: 'absolute',
                                                            zIndex: '999'
                                                        }}
                                                        type="button"
                                                        onClick={() => {}}
                                                        >
                                                        <i className="la la-trash text-danger"></i>
                                                    </button>}
                                            {(!boys?.image_front&& !boys?.image_front_loading) && 
                                                <img  
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px', height: '80px',
                                                    }}
                                                />}
                                                {(!boys?.image_front && boys?.image_front_loading) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        <Col md={6} className="mb-3">
                                <div className='form-group w-100'>
                                    <label className="m-0">{Translate[lang]?.image} {Translate[lang]?.from_back}</label>
                                    <div className="image-placeholder">	
                                        <div className="avatar-edit">
                                            <input type="file"  onChange={(e) => fileHandlerCivilianBoys(e, index, 'image_back')} id={`mage_back${index}`} /> 					
                                            <label htmlFor={`mage_back${index}`}  name=''></label>
                                        </div>
                                        <div className="avatar-preview2">
                                            <div id={`imagePreview`}>
                                            {!!boys?.image_back && 
                                                <img alt='icon'
                                                    className='w-100 h-100' 
                                                    style={{borderRadius: '30px'}} 
                                                    src={boys?.image_back}
                                            />}
                                            {!!boys?.image_back && <button
                                                style={{
                                                    border: '1px solid #dedede',
                                                    borderRadius:' 50%',
                                                    padding: '2px 5px',
                                                    position: 'absolute',
                                                    zIndex: '999'
                                                }}
                                                type="button"
                                                onClick={() => {}}
                                                >
                                                <i className="la la-trash text-danger"></i>
                                            </button>}
                                            {(!boys?.image_back && !boys?.image_back_loading) && 
                                                <img 
                                                    src={uploadImg} alt='icon'
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                    }}
                                            />}
                                            {(!boys?.image_back && boys?.image_back_loading) && <Loader />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </Col>
                        </>
                    })}
                    <Button 
                        className="mt-2"
                        variant="secondary" 
                        type='button'
                        onClick={()=>{
                            setFormData({
                                ...formData, 
                                civilian_boys: [
                                    ...formData.civilian_boys,
                                    {image_back: '', image_front: '', image_back_loading: false, image_front_loading: false}
                                ]
                            })
                        }}
                    >
                        {Translate[lang]?.add_new_value}
                    </Button>

                    <Col md={12}><hr/></Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <Button onClick={()=>{}} variant="danger light">
                        {Translate[lang]?.close}
                    </Button>
                    <Button 
                        variant="primary" 
                        type='submit'
                        disabled={loading}
                    >
                        {Translate[lang]?.add}
                    </Button>
                </div>
            </AvForm>
        </Card.Body>
    </Card>)
}

export default AddFamilyCardRequest;