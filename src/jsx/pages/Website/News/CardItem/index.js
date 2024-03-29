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
            <td>
                        <img
                          src={item?.image}
                          className="rounded-lg"
                          width="40"
                          height="40"
                          alt={item.id}
                        />
                    </td>
            <td>{item.title}</td>
            <td>
                <p>{item.description}</p>
            </td>
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
                      modelService={newsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;