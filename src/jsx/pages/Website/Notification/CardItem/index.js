import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import NotificationService from "../../../../../services/NotificationService";
import DeleteModal from "../../../../common/DeleteModal";
import DetailsModal from "../../../../common/DetailsModal";
import { Translate } from "../../../../Enums/Tranlate";
import SendModal from "../SendModal";

const CardItem = ({item, index, setShouldUpdate}) =>{
    const [deleteModal, setDeleteModal] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)
    const [send, setSend] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const notificationService = new NotificationService()

    return(
        <tr key={index} className='text-center'>
            <td>
                {item.id}
            </td>
            <td>{lang==='en' ? item.title_en : item.title_ar}</td>
            <td onClick={()=> setDetailsModal(true)} className='cursor-pointer'>
                {lang==='en' ? item.description_en?.slice(0, 30) : item.description_ar?.slice(0, 30)}...
            </td>
            <td>
                {isExist('website') && <Dropdown>
                    <Dropdown.Toggle
                        // variant="success"
                        className="light sharp i-false"
                    >
                        <i className="la la-ellipsis-v" style={{fontSize: '27px'}}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=> setSend(true)}> {Translate[lang].send} </Dropdown.Item>
                        <Dropdown.Item onClick={()=> setDeleteModal(true)}>{Translate[lang].delete}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            </td>

            {deleteModal && <DeleteModal
                      open={deleteModal}
                      titleMsg={lang==='en' ? item.title_en : item.title_ar}
                      deletedItem={item}
                      modelService={notificationService}
                      onCloseModal={setDeleteModal}
                      setShouldUpdate={setShouldUpdate}
                    />}
            
            {send && <SendModal 
                modal={send}
                setModal={()=> setSend(false)}
                item={item}
            />}
            {detailsModal && 
                <DetailsModal 
                    modal={detailsModal} 
                    setModal={()=> setDetailsModal(false)} 
                    item={{
                        title: lang === 'ar' ? item.title_ar : item.title_en,
                        description: lang === 'ar' ? item.description_ar : item.description_en,
                    }}
                />
            }
            </tr>
    )
}
export default CardItem;