import { useState } from "react";
import { Badge, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import DeleteModal from "../../../../common/DeleteModal";
import { Translate } from "../../../../Enums/Tranlate";
import FamilyCardRequestService from "../../../../../services/FamilyCardRequestService";
import EditFamilyCardModal from "../EditFamilyCardRequestModal";

const CardItem = ({item, index,type, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const familyCardService = new FamilyCardRequestService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{item.civil_id}</td>
            <td>{item.phone}</td>
            {type === "head of household" && <>
                <td>
                    <a 
                        href={item?.father_image_front} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                    <a 
                        href={item?.father_image_back} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
                <td>
                    <a 
                        href={item?.mother_image_front} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                    <a 
                        href={item?.mother_image_back} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
                <td>
                    <a 
                        href={item?.marriage_certificate} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
            </>}
            {type === "divorced" && <>
                <td>
                    <a 
                        href={item?.divorce_document} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
                <td>
                    <a 
                        href={item?.custody_decision} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
            </>}
            {type === "widow" && <>
                <td>
                    <a 
                        href={item?.husband_death_certificate} 
                        target="_blank" 
                        rel="noreferrer">
                            <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                    </a>
                </td>
            </>}
            <td>
                {!!item?.civilian_boys?.length ? item?.civilian_boys?.map((boys) => {
                    return <>
                        <a 
                            href={boys?.image_front} 
                            target="_blank" 
                            rel="noreferrer">
                                <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                        </a>
                        <a 
                            href={boys?.image_back} 
                            target="_blank" 
                            rel="noreferrer">
                                <i className='la la-file-pdf' style={{fontSize: '40px'}}></i>
                        </a>
                    </>
                }) : '-'}
            </td>
            <td>
                <Badge 
                    variant={item?.status === 'accept' ? "primary" : item?.status === 'pending' ? 'warning' : 'danger'}
                    onClick={()=> setEditModal(true)}
                >
                    {Translate[lang][item?.status]}
                </Badge>
            </td>
            <td>
                {isExist('website') && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.name}
                      deletedItem={item}
                      modelService={familyCardService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}

            {editModal && <EditFamilyCardModal
                editModal={editModal}
                item={item}
                setEditModal={() => setEditModal(false)}
                setShouldUpdate={setShouldUpdate}
            />}
        </tr>
    )
}
export default CardItem;