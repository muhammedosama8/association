import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import NewsService from "../../../../../services/NewsService";
import DeleteModal from "../../../../common/DeleteModal";
import { Translate } from "../../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const newsService = new NewsService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>{item?.f_name} {item?.l_name}</td>
            <td>
                <p>{item.gmail}</p>
            </td>
            <td>
                <p>{item.phone}</p>
            </td>
            <td>
                <p onClick={()=> {
                    setItem(item)
                    setAddModal(true)
                }}>{item.message?.substr(0, 30)} {item?.message?.length > 30 && '...'}</p>
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
                      titleMsg={item.title}
                      deletedItem={item}
                      modelService={newsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;