import { useState } from "react";
import { Dropdown , Badge} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShareholdersRequestsService from "../../../../../services/ShareholdersRequestsService";
import DeleteModal from "../../../../common/DeleteModal";
import { Translate } from "../../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const shareholdersRequestsService = new ShareholdersRequestsService()


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
            <td>{item.expire_date?.split('T')[0] || '-'}</td>
            <td>
                <Link to='/shareholders_requests/attachments' state={{item: item}}>
                    {Translate[lang].attachments}
                </Link>
            </td>
            <td>
                <Badge 
                    variant={`${item.status === 'accept' ? 'primary' : item.status === 'pending' ? 'warning' : 'danger' }`}
                >{Translate[lang][item?.status]}</Badge>
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
                      titleMsg={item.name}
                      deletedItem={item}
                      modelService={shareholdersRequestsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;