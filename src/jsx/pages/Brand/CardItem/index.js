import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import BrandsService from "../../../../services/BrandsService";
import DeleteModal from "../../../common/DeleteModal";
import { Translate } from "../../../Enums/Tranlate";

const CardItem = ({item, setItem, index, setAddModal, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const brandsService = new BrandsService()

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
            <td>{lang ==='en' ? item.name_en : item.name_ar}</td>
            {/* <td>
                <Form.Check
                    type="switch"
                    id={`custom-switch${index}`}
                    checked={status}
                    disabled={!isExist('categories')}
                    onChange={(e)=> changeStatusToggle(e)}
                />
            </td> */}
            <td>
                {isExist('brands') && <Dropdown>
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
                      titleMsg={lang==='en' ? item.name_en : item.name_ar}
                      deletedItem={item}
                      modelService={brandsService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            </tr>
    )
}
export default CardItem;