import { Button, Col, Modal, Row } from "react-bootstrap"
import { useSelector } from "react-redux";
import { Translate } from "../../Enums/Tranlate";

const DetailsModal = ({modal, setModal, item})=>{
    const lang = useSelector(state=> state.auth.lang);

    return(
        <Modal className={lang === 'en' ? "en fade addActivity" : "ar fade addActivity"} style={{textAlign: lang === 'en' ? 'left' : 'right'}} show={modal} onHide={()=>{
            setModal()
            }}>
            <Modal.Header>
            <Modal.Title>{Translate[lang]?.details}: {item?.title}</Modal.Title>
            <Button
                variant=""
                className="close"
                style={{right: lang === 'en' ? '0' : 'auto', left: lang === 'ar' ? '0' : 'auto'}}
                onClick={()=>{
                    setModal()
                }}
                >
                <span>&times;</span>
            </Button>
            </Modal.Header>
            <Modal.Body>
                    <Row>
                    <Col md={12}>
                        <div className='w-100'>
                            {item?.description}
                        </div>
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={setModal} variant="danger light">
                {Translate[lang]?.close}
                </Button>
            </Modal.Footer>
        </Modal>)
}

export default DetailsModal;