import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../../../common/Loader";
import NoData from "../../../../common/NoData";
import Pagination from "../../../../common/Pagination/Pagination";
import { Translate } from "../../../../Enums/Tranlate";
import AddJobsModal from "./AddJobsModal";
import CardItem from "./CardItem";
import JobTitleService from "../../../../../services/JobTitleService";

const Jobs = () => {
    const [data, setData] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [item, setItem] = useState({})
    const [hasData, setHasData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const Auth = useSelector(state=> state.auth?.auth)
    const lang = useSelector(state=> state.auth?.lang)
    const jobTitleService = new JobTitleService()
    const isExist = (data)=> Auth?.admin?.admin_roles?.includes(data)

    useEffect(()=>{
      setLoading(true)
      jobTitleService.getList().then(res=>{
        if(res?.status){
          let response = res?.data?.data
          if(!!response?.length){
            setHasData(1)
            setData(response)
          } else {
            setHasData(0)
          }
        }
        setLoading(false)
      })
    },[shouldUpdate])

  return (
    <Fragment>
      <Card>
            <Card.Body style={{textAlign: lang === 'en' ? 'right' : 'left'}}>
              {isExist('website') && <Button variant="outline-primary" className='me-2 h-75' onClick={()=> { 
              setItem({})
              setAddModal(true) }}>
              <i className="la la-plus mx-1"></i>
              {Translate[lang]?.add} {Translate[lang]?.job}
            </Button>}
            </Card.Body>
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
            </Card.Body>
      </Card>

      {addModal && 
        <AddJobsModal
          item={item} 
          addModal={addModal} 
          setShouldUpdate={setShouldUpdate}
          setAddModal={()=> setAddModal(false)}
      />}
    </Fragment>
  );
};

export default Jobs;
