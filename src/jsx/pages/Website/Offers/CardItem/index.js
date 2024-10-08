import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import OfferService from "../../../../../services/OfferService";
import DeleteModal from "../../../../common/DeleteModal";
import { Translate } from "../../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const offerService = new OfferService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                <img
                    src={item?.image}
                    className="rounded-lg"
                    width="50"
                    height="50"
                    alt={item.id}
                />
            </td>
            <td>{(item.cover_image.endsWith('.pdf') || item.cover_image.endsWith('.docx') || 
                item.cover_image.endsWith('.doc') || item.cover_image.endsWith('.txt')) ? 
                <a href={item?.cover_image} target="_blank" rel="noreferrer">
                    <i className="la la-file-pdf" style={{fontSize: "35px", color: '#03447b'}}/>
                </a> :  <a href={item?.cover_image} target="_blank" rel="noreferrer">
                <img src={item.cover_image} alt='offer' className="rounded-lg" width="50" height="50"/>
                </a>}
            </td>
            <td>{item.title}</td>
            <td>
                {isExist('website') && <Dropdown>
                    <Dropdown.Toggle
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> {
                            setItem(item)
                            setAddModal(true)
                        }}> {Translate[lang]?.edit}</Dropdown.Item>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang]?.delete}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>
            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={item.title}
                      deletedItem={item}
                      modelService={offerService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;