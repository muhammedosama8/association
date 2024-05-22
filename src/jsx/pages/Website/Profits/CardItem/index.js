import { useState } from "react";
import ShareholdersService from "../../../../../services/ShareholdersService";
import DeleteModal from "../../../../common/DeleteModal";

const CardItem = ({item, index, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const shareholdersService = new ShareholdersService()

    return(
        <tr key={index} className='text-center'>
            <td>
                <strong>{item.id}</strong>
            </td>
            <td>
                {item?.name}
            </td>
            <td>{item.civil_id}</td>
            <td>{item.box_number}</td>
            <td>{item.profit}</td>
            <td>{item.year}</td>
            {/* <td>
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
            </td> */}
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