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
import AddOffersModal from "./AddOffersModal";
import CardItem from "./CardItem";
import './style.scss'
import OfferService from "../../../../services/OfferService";

const Offers = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const tabs = [
      {value: "service offers", name: "service_offers"},
      {value: "social offers", name: "social_offers"},]
    const [selectedTab, setSelectedTab] = useState({value: "service offers", name: "service_offers"})
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [search, setSearch] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const offerService = new OfferService()
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
          {isExist('website') && <Button variant="primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.offer}
          </Button>}
        </Card.Body >
        <div className="tabs-div mt-4 px-2">
            {tabs?.map((tab, index) => {
              return <span 
                key={index}
                onClick={()=> {
                  setSelectedTab(tab)
                  setShouldUpdate(prev => !prev)
                }}
                className={`mx-2 tab ${tab.name === selectedTab.name ? 'active-tab' : ''}`}
              >
                {Translate[lang][tab?.name]}
              </span>
            })}
        </div>
      </Card>
      
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
                      <strong>{Translate[lang]?.image}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.image} {Translate[lang]?.offer}</strong>
                    </th>
                    <th>
                      <strong>{Translate[lang]?.title}</strong>
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
              <Pagination
                  setData={setData}
                  service={offerService}
                  shouldUpdate={shouldUpdate}
                  setHasData={setHasData}
                  setLoading={setLoading}
                  search={search}
                  type={selectedTab?.value}
              />
            </Card.Body>
        </Card>

      {addModal && 
        <AddOffersModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default Offers;
