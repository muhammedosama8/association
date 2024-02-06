import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import uploadImg from "../../../images/upload-img.png";
import "./style.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BaseService from "../../../services/BaseService";
import BannerService from "../../../services/BannerService";
import Loader from "../../common/Loader";
import { Translate } from "../../Enums/Tranlate";

const Banners = () => {
  const [files, setFiles] = useState([{}, {}, {}, {}, {}]);
  const [isAdd, setIsAdd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [submitLoading, setSumbitLoading] = useState(false);
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth?.lang);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);
  const bannerService = new BannerService();

  const [formData, setFormData] = useState([
    { src: "", loading: false },
    { src: "", loading: false },
    { src: "", loading: false },
    { src: "", loading: false },
    { src: "", loading: false },
  ]);

  useEffect(() => {
    bannerService?.getList()?.then((res) => {
      if (res && res?.status === 200) {
        if (res?.data.meta?.data?.length > 0) {
          setIsAdd(false);
        }
        let data = res?.data.meta?.data?.map((item) => {
          return {
            id: item.id,
            src: item?.image,
            loading: false,
          };
        });
        if (data?.length < 5) {
          let complete = [];
          for (let i = data?.length; i < 5; i++) {
            complete.push({ src: "", loading: false });
          }
          setFormData([...data, ...complete]);
        } else {
          setFormData([...data]);
        }
      }
      setLoading(false);
    });
  }, [shouldUpdate]);

  function updateFormData(index) {
    let update = formData?.map((item, ind) => {
      if (ind === index) {
        return {
          src: "",
          loading: false,
        };
      } else {
        return item;
      }
    });
    setFormData([...update]);
  }

  const fileHandler = (e, index) => {
    let filesAll = e.target.files;
    if (filesAll?.length === 0) {
      return;
    }
    let updateImages = formData.map((item, ind) => {
      if (ind === index) {
        return {
          ...item,
          loading: true,
        };
      } else {
        return { ...item };
      }
    });
    setFormData([...updateImages]);

    const filesData = Object.values(filesAll);
    let update = files?.map((file, updateIndex) => {
      if (updateIndex === index) {
        return e.target.files[0];
      } else {
        return file;
      }
    });

    new BaseService().postUpload(filesData[0]).then((res) => {
      if (res && res?.data?.status) {
        let updateImages = formData.map((item, ind) => {
          if (ind === index) {
            return {
              src: res.data.url,
              loading: false,
            };
          } else {
            return { ...item };
          }
        });
        setFormData([...updateImages]);
        setFiles([...update]);
      } else {
        updateFormData(index);
      }
    });
  };

  const onSubmit = () => {
    let data = {
      banners: formData
        ?.filter((res) => !!res.src)
        ?.map((item, index) => {
          let res = {
            image: item?.src,
          };
          return res;
        }),
    };

    if (isAdd) {
      if (data.banners?.length === 0) {
        toast.error(`${Translate[lang].add} ${Translate[lang].image}`);
        return;
      }
      setSumbitLoading(true);
      bannerService.create(data)?.then((res) => {
        if (res && res?.status === 201) {
          toast.success(Translate[lang].banners_added_successfully);
          setIsAdd(false);
        }
        setSumbitLoading(false);
        setShouldUpdate((prev) => !prev);
      });
    } else {
      setSumbitLoading(true);
      bannerService.update(data)?.then((res) => {
        if (res && res?.status === 200) {
          toast.success(Translate[lang].banners_updated_successfully);
          setIsAdd(false);
        }
        setSumbitLoading(false);
        setShouldUpdate((prev) => !prev);
      });
    }
  };

  const deleteBannar = (index, id) => {
    if (id) {
      bannerService.remove(id).then((res) => {
        if (res && res?.status === 200) {
          updateFormData(index);
          toast.success(Translate[lang].remove_image);
        }
      });
    } else {
      updateFormData(index);
    }
  };

  if (loading) {
    return (
      <Card className="py-5">
        <Card.Body>
          <Loader />
        </Card.Body>
      </Card>
    );
  }
  return (
    <>
      {formData?.map((data, index) => {
        return (
          <Card className="p-4" key={index}>
            <Row>
              <Col md={12}>
                <h4>
                  {Translate[lang].banner} {index + 1}
                </h4>
                <div className="image-placeholder">
                  <div className="avatar-edit">
                    <input
                      type="file"
                      onChange={(e) => {
                        if (!isExist("banners")) {
                          toast.error("Not Allowed, Don`t have Permission");
                          return;
                        }
                        fileHandler(e, index);
                      }}
                      id={`imageUpload${index}`}
                    />
                    <label htmlFor={`imageUpload${index}`} name=""></label>
                  </div>
                  {data.src && (
                    <button
                      className="delete"
                      type="button"
                      onClick={() => deleteBannar(index, data.id)}
                    >
                      <i className="la la-trash text-danger"></i>
                    </button>
                  )}
                  <div className="avatar-preview">
                    <div id={`imagePreview${index}`}>
                      {!!data?.src && !data.loading && (
                        <img
                          id={`saveImageFile${index}`}
                          src={data?.src}
                          alt="icon"
                        />
                      )}
                      {!data?.src && !data.loading && (
                        <img
                          id={`saveImageFile${index}`}
                          src={uploadImg}
                          alt="icon"
                          style={{
                            width: "80px",
                            height: "80px",
                          }}
                        />
                      )}
                      {data.loading && <Loader />}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        );
      })}
      {isExist("banners") && (
        <div className="d-flex justify-content-end mb-4">
          <Button
            variant="primary"
            className="px-5"
            disabled={submitLoading}
            onClick={() => onSubmit()}
          >
            {Translate[lang].submit}
          </Button>
        </div>
      )}
    </>
  );
};
export default Banners;
