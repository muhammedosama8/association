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
import Loader from "../../../common/Loader";
import NoData from "../../../common/NoData";
import Pagination from "../../../common/Pagination/Pagination";
import { Translate } from "../../../Enums/Tranlate";
import CardItem from "./CardItem";
import './style.scss'
import FamilyCardRequestService from "../../../../services/FamilyCardRequestService";
import { useNavigate } from "react-router-dom";

const FamilyCardRequest = () => {
    const [data, setData] = useState([])
    const tabs = ["head of household", "divorced", "widow"]
    const [selectTab, setSelectTab] = useState("head of household")
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const familyCardService = new FamilyCardRequestService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)
    const navigate = useNavigate()

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
            <Button variant="primary" className='me-2 h-75' onClick={()=> navigate('/add_family_card_request')}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.family_card}
            </Button>
          </div>}
        </Card.Body >
        <div className="tabs-div mt-4 px-2">
          {tabs?.map((tab, index) => {
            return <span 
              key={index}
              onClick={()=> {
                setShouldUpdate(prev => !prev)
                setSelectTab(tab)
              }}
              className={`mx-2 tab ${tab === selectTab ? 'active-tab' : ''}`}
            >
              {Translate[lang][tab?.replaceAll(' ','_')]}
            </span>
          })}
        </div>
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
                    {selectTab === "head of household" && <>
                      <th>
                        <strong>{Translate[lang]?.father}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.mother}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.marriage_certificate}</strong>
                      </th>
                    </>}
                    {selectTab === "divorced" && <>
                      <th>
                        <strong>{Translate[lang]?.divorce_document}</strong>
                      </th>
                      <th>
                        <strong>{Translate[lang]?.custody_decision}</strong>
                      </th>
                    </>}
                    {selectTab === "widow" && <>
                      <th>
                        <strong>{Translate[lang]?.husband_death_certificate}</strong>
                      </th>
                    </>}
                    <th>
                      <strong>{Translate[lang]?.civilian_boys}</strong>
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
                            type={selectTab}
                            setShouldUpdate={setShouldUpdate}
                        />
                    })}
                </tbody>
              </Table>}
              {hasData === 0 && <NoData />}
              <Pagination
                  setData={setData}
                  service={familyCardService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  type={selectTab}
                  search={search}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default FamilyCardRequest;
