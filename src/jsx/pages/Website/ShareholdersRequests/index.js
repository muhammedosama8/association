import React, { Fragment } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import BrandsService from "../../../../services/BrandsService";
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import Pagination from "../../../common/Pagination/Pagination";
import { Translate } from "../../../Enums/Tranlate";
import CardItem from "./CardItem";
import header from "../../../../images/header.jpeg"
import './style.scss'
import ShareholdersRequestsService from "../../../../services/ShareholdersRequestsService";
import AddShareholdersRequestsModal from "./AddShareholdersRequestsModal";
import ImportModal from "../../../common/ImportModal";

const ShareholdersRequests = () => {
    const [data, setData] = useState([
      {
        id: 1, 
        name: 'Muhammed osama nasser', 
        civil_id: "12312",
        phone: "01002231233",
        attachments: [
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
        ], 
        status: true
      },
      {
        id: 2, 
        name: 'Muhammed nasser', 
        civil_id: "3333",
        phone: "01002231233",
        attachments: [
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
          "https://back.sabahalsalemco-op.com/download-1714570771840.jpeg",
        ], 
        status: false
      },
    ])
    const [addModal, setAddModal] = useState(false)
    const [importModal, setImportModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(1)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const shareholdersRequestsService = new ShareholdersRequestsService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

  return (
    <Fragment>
      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between p-3 align-items-center">
          <div className="input-group w-50">
            <input 
                type="text" 
                style={{borderRadius: '8px',
                color: 'initial',
                padding: '18px 16px'}}
                className="form-control"
                placeholder={`${Translate[lang]?.search_by} I.D, ${Translate[lang]?.name}`}
                value={search}
                onChange={e=> setSearch(e.target.value)} 
            />
            <div className="flaticon-381-search-2"
              style={{position: 'absolute',zIndex:'99', right: lang === 'en' && '16px', left: lang === 'ar' && '16px', top: '50%', transform: 'translate(0, -50%)'}}
            ></div>
          </div>
          {isExist('website') && <div>
            <Button variant="secondary" className='mx-3 h-75' onClick={()=> setImportModal(true)}>
              {Translate[lang]?.import}
            </Button>
            <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.shareholders}
            </Button>
          </div>}
        </Card.Body >
      </Card>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Body className={`${hasData === 0 && 'text-center'} `}>
            {loading && <div style={{height: '300px'}}>
                <Loader />
              </div>}
              {(hasData === 1 && !loading) && <Table responsive>
                <thead>
                  <tr className='text-center'>
                    <th>
                      <strong>I.D</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.name}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.civil_id}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.phone}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.attachments}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.status}</strong>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                    {data?.map((item, index) =>{
                        return <CardItem 
                            index= {index}
                            key= {index}
                            item={item}
                            setItem={setItem}
                            setAddModal={setAddModal}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              {/* <Pagination
                  setData={setData}
                  service={shareholdersService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
              /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {addModal && 
        <AddShareholdersRequestsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}

      {importModal && <ImportModal 
        addModal={importModal} 
        setAddModal={()=> setImportModal(false)} 
        name={'shareholders'} 
        service={shareholdersRequestsService}
        setShouldUpdate={setShouldUpdate}
      />}
    </Fragment>
  );
};

export default ShareholdersRequests;
