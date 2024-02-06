import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NoData from "../../../common/NoData";
// import BlockDateService from "../../../../services/BlockDateService";

import { Translate } from "../../../Enums/Tranlate";
import AddSpecificBlockModal from "../AddSpecificBlockModal";

const SpecificBlock = () => {
  const [specificBlock, setSpecificBlock] = useState([]);
  const [modal, setModal] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  // const blockDateService = new BlockDateService()
  const lang = useSelector((state) => state.auth.lang);

  // useEffect(()=>{
  //     blockDateService.getList().then(res=>{
  //         if(res?.status === 200){
  //             setSpecificBlock(res.data.data)
  //         }
  //     })
  // },[shouldUpdate])

  const remove = (id) => {
    // blockDateService.remove(id).then(res=>{
    //     if(res?.status === 200){
    //         toast.success('Deleted Successfully')
    //         setShouldUpdate(prev=> !prev)
    //     }
    // })
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <div></div>
        <Button
          variant="primary"
          className="me-2 h-75"
          onClick={() => setModal(true)}
        >
          {Translate[lang].add} {Translate[lang].specific_block}
        </Button>
      </div>
      <Card>
        <Card.Body>
          <Row>
            {specificBlock?.length > 0 ? (
              specificBlock?.map((item, index) => {
                return (
                  <Col md={3} className="col-sm-6">
                    <Card
                      className="position-relative"
                      style={{ border: "1px solid #dedede" }}
                    >
                      <Card.Body>
                        <Card.Title>{index + 1}</Card.Title>
                        <Card.Text>{item.date.split("T00")[0]}</Card.Text>
                        <Button
                          onClick={() => remove(item.id)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: lang === "en" ? "8px" : "auto",
                            left: lang === "en" ? "auto" : "8px",
                            padding: "2px 6px",
                            borderRadius: "50%",
                          }}
                          variant="danger"
                        >
                          <i className="la la-times"></i>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div className="m-auto">
                <NoData />
              </div>
            )}
          </Row>

          {modal && (
            <AddSpecificBlockModal
              modal={modal}
              setModal={() => setModal(false)}
              setShouldUpdate={setShouldUpdate}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
export default SpecificBlock;
