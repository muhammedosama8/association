import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { AvForm } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
// import BlockDateService from "../../../../services/BlockDateService";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

const AddSpecificBlockModal = ({ modal, setModal, setShouldUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([""]);
  // const blockDateService = new BlockDateService()
  const lang = useSelector((state) => state.auth.lang);

  const submit = () => {
    // let data ={
    //     blockDate: [...formData.filter(item => !!item)]
    // }
    // setLoading(true)
    // blockDateService.create(data)?.then(res=>{
    //     if(res?.status === 201){
    //         toast.success('Added Successfully')
    //         setModal()
    //         setShouldUpdate(prev=> !prev)
    //     }
    //     setLoading(false)
    // })
  };

  return (
    <Modal className="fade" show={modal} onHide={setModal}>
      <AvForm className="form-horizontal" onValidSubmit={submit}>
        <Modal.Header>
          <Modal.Title>
            {Translate[lang].add} {Translate[lang].specific_block}
          </Modal.Title>
          <Button variant="" className="close" onClick={setModal}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <label>{Translate[lang].specific_block}</label>
            {formData.map((item, index) => {
              return (
                <Col md={12} key={index}>
                  <div className="form-group w-100">
                    <input
                      type="date"
                      style={{
                        width: "85%",
                        padding: "8px 12px",
                        border: "1px solid #dedede",
                        borderRadius: "5px",
                      }}
                      value={item}
                      onChange={(e) => {
                        const update = formData.map((res, ind) => {
                          if (index === ind) {
                            return e.target.value;
                          } else {
                            return res;
                          }
                        });
                        setFormData(update);
                      }}
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        style={{
                          background: "var(--danger)",
                          color: " #fff",
                          border: "0",
                          marginLeft: "8px",
                          marginRight: "8px",
                          borderRadius: "50%",
                          padding: "2px 6px",
                        }}
                        onClick={() => {
                          let update = formData.filter(
                            (_, ind) => index !== ind
                          );
                          setFormData(update);
                        }}
                      >
                        <i className="la la-times"></i>
                      </button>
                    )}
                  </div>
                </Col>
              );
            })}
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                marginTop: "10px",
                color: "blue",
              }}
              onClick={() => setFormData([...formData, ""])}
            >
              {Translate[lang].add_new_value}
            </button>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={setModal} variant="danger light">
            {Translate[lang].close}
          </Button>
          <Button disabled={loading} variant="primary" type="submit">
            {Translate[lang].add}
          </Button>
        </Modal.Footer>
      </AvForm>
    </Modal>
  );
};

export default AddSpecificBlockModal;
