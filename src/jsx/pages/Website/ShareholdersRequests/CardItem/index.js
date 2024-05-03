import { useState } from "react";
import { Dropdown ,Form} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShareholdersService from "../../../../../services/ShareholdersService";
import DeleteModal from "../../../../common/DeleteModal";
import { Translate } from "../../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const shareholdersService = new ShareholdersService()

    const changeStatus = (stat) => {}

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
            <td>
                <Link to='/shareholders_requests/attachments' state={{attachments: item.attachments}}>
                    {Translate[lang].attachments}
                </Link>
            </td>
            <td>
                <Form.Check
                    type="switch"
                    id={`status${item?.id}`}
                    checked={item.status}
                   onChange={(e)=> changeStatus(e.target.checked)}
                 />
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
                      modelService={shareholdersService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;