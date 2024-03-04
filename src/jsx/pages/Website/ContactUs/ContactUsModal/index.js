import { Button, Modal } from "react-bootstrap"
import { useSelector } from "react-redux";
import { Translate } from "../../../../Enums/Tranlate";

const ContactUsModal = ({addModal, setAddModal, item})=>{
    const lang = useSelector(state=> state.auth.lang)

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={addModal} onHide={()=>{
            setAddModal()
            }}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.message}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setAddModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <p className="m-0 text-black">{item?.message}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={setAddModal} variant="danger light">
            {Translate[lang]?.close}
            </Button>
            </Modal.Footer>
        </Modal>)
}

export default ContactUsModal;