import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { toast } from "react-toastify";
// import TimeSlotService from "../../../../services/TimeSlotService";
import { useSelector } from "react-redux";
import { Translate } from "../../../Enums/Tranlate";

const EditTimeSlotModal = ({ modal, setModal, item, setShouldUpdate }) => {
  const [formData, setFormData] = useState({
    capacity: item.capacity,
    interval_min: item.interval_min,
    to: item.to,
    from: item.from,
    isOpen: item.isOpen,
    id: item.id,
  });
  const [loading, setLoading] = useState(false);
  // const timeSlotService = new TimeSlotService()
  const lang = useSelector((state) => state.auth.lang);

  const submit = () => {
    // if(!formData.from || !formData.to){
    //     toast.error('Select Time')
    //     return
    // }
    // setLoading(true)
    // timeSlotService.create({
    //     availableDays:[{
    //         capacity: parseFloat(formData.capacity),
    //         interval_min: parseFloat(formData.interval_min),
    //         to: formData.to?.slice(0,5),
    //         from: formData.from?.slice(0,5),
    //         isOpen: formData.isOpen,
    //         id: formData.id
    //     }]
    // }).then(res=>{
    //     if(res?.status === 201){
    //         toast.success('TimeSlot Updated Successfully')
    //         setShouldUpdate(prev=> !prev)
    //         setModal()
    //     }
    //     setLoading(false)
    // })
  };

  return (
    <Modal
      className="fade"
      show={modal}
      onHide={() => {
        setModal();
      }}
    >
      <AvForm className="form-horizontal" onValidSubmit={submit}>
        <Modal.Header>
          <Modal.Title>
            {Translate[lang].edit} {item.name}
          </Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => {
              setModal();
            }}
          >
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <AvField
                label={Translate[lang].capacity}
                type="number"
                placeholder={Translate[lang].capacity}
                bsSize="lg"
                name="capacity"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                  pattern: {
                    value: "/^[0-9 ]+$/",
                    errorMessage: `Capacity format is invalid`,
                  },
                }}
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <AvField
                label={Translate[lang].interval}
                type="number"
                placeholder={Translate[lang].interval}
                bsSize="lg"
                name="interval_min"
                validate={{
                  required: {
                    value: true,
                    errorMessage: Translate[lang].field_required,
                  },
                }}
                value={formData.interval_min}
                onChange={(e) =>
                  setFormData({ ...formData, interval_min: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <label className="d-block">{Translate[lang].form}</label>
              <input
                type="time"
                name="from"
                className="w-100"
                style={{
                  border: "1px solid #dedede",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                required
                min="00:00"
                max="24:00"
                pattern="[0-9]{2}:[0-9]{2}"
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
              />
            </Col>
            <Col md={6}>
              <label className="d-block">{Translate[lang].to}</label>
              <input
                type="time"
                name="to"
                required
                style={{
                  border: "1px solid #dedede",
                  padding: "8px",
                  borderRadius: "5px",
                }}
                className="w-100"
                min="00:00"
                max="24:00"
                pattern="[0-9]{2}:[0-9]{2}"
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
              />
            </Col>
            <Col md={3} className="mt-3">
              <label>{Translate[lang].open}</label>
              <Form.Check
                type="switch"
                id={`custom-switch`}
                checked={formData.isOpen}
                onChange={(e) =>
                  setFormData({ ...formData, isOpen: e.target.checked })
                }
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={setModal} variant="danger light">
            {Translate[lang].close}
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {Translate[lang].edit}
          </Button>
        </Modal.Footer>
      </AvForm>
    </Modal>
  );
};

export default EditTimeSlotModal;
