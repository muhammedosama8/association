import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import uploadImg from "../../../images/upload-img.png";
import BaseService from "../../../services/BaseService";
import ScreenService from "../../../services/ScreenService";
import { Translate } from "../../Enums/Tranlate";
import Loader from "../../common/Loader";

const AdScreen = () => {
  const [files, setFiles] = useState([{}]);
  const screenService = new ScreenService();
  const [isAdd, setIsAdd] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [formData, setFormData] = useState([{ src: "", loading: false }]);
  const Auth = useSelector((state) => state.auth?.auth);
  const lang = useSelector((state) => state.auth?.lang);
  const isExist = (data) => Auth?.admin?.admin_roles?.includes(data);

  useEffect(() => {
    // setLoading(true)
    screenService?.getList()?.then((res) => {
      if (res?.status === 200) {
        if (res.data?.meta?.data?.length === 0) {
          return;
        }
        if (res.data?.meta?.data?.length > 0) setIsAdd(false);
        let data = res.data?.data?.map((item) => {
          return {
            id: item.id,
            src: item?.image,
            loading: false,
          };
        });
        setFormData([...data]);
      }
      setLoading(false);
    });
  }, [shouldUpdate]);

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
            };
          } else {
            return { ...item };
          }
        });
        setFormData([...updateImages]);
        setFiles([...update]);
      }
    });
  };

  const onSubmit = () => {
    let data = {
      screens: formData
        ?.filter((res) => !!res.src)
        ?.map((item, index) => {
          return {
            image: item?.src,
          };
        }),
    };
    if (data.screens?.length === 0) {
      toast.error("Add Image First");
      return;
    }
    if (isAdd) {
      screenService.create(data)?.then((res) => {
        if (res?.status === 201) {
          toast.success("Screen Added Successfully");
          setIsAdd(false);
          setShouldUpdate((prev) => !prev);
        }
      });
    } else {
      screenService.update(data)?.then((res) => {
        if (res?.status === 200) {
          toast.success("Screen Updated Successfully");
          setIsAdd(false);
          setShouldUpdate((prev) => !prev);
        }
      });
    }
  };

  const deleteScreen = (index, id) => {
    if (id) {
      screenService.remove(id).then((res) => {
        if (res && res?.status === 200) {
          let update = formData?.filter((_, ind) => ind !== index);
          setFormData([...update]);
          toast.success(Translate[lang].remove_image);
        }
        setShouldUpdate((prev) => !prev);
      });
    } else {
      let update = formData?.filter((_, ind) => ind !== index);
      setFormData([...update]);
      setShouldUpdate((prev) => !prev);
    }
  };

  const deleteFirstScreen = (index, id) => {
    if (id) {
      screenService.remove(id).then((res) => {
        if (res && res?.status === 200) {
          let update = formData?.map((item, ind) => {
            if (ind === index) {
              return {
                ...item,
                src: "",
              };
            } else {
              return item;
            }
          });
          setFormData(update);
          toast.success(Translate[lang].remove_image);
        }
        setShouldUpdate((prev) => !prev);
      });
    } else {
      let update = formData?.map((item, ind) => {
        if (ind === index) {
          return {
            ...item,
            src: "",
          };
        } else {
          return item;
        }
      });
      setFormData(update);
      setShouldUpdate((prev) => !prev);
    }
  };

  if (loading) {
    return (
      <Card className="py-5" style={{ height: "300px" }}>
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
            <Card key={index}>
              <Card.Body>
                <div className="w-100 d-flex justify-content-between align-items-center mb-1">
                      <p style={{ fontSize: "18px", marginBottom: "0" }}>
                        {Translate[lang].ad}
                      </p>
                      {index > 0 && (
                        <button
                          className="btn btn-danger p-1"
                          onClick={() => deleteScreen(index, data?.id)}
                        >
                          <i
                            className="la la-times"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </button>
                      )}
                </div>
                <div className="image-placeholder">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          onChange={(e) => {
                            if (!isExist("ad_screen")) {
                              toast.error("Not Allowed, Don`t have Permission");
                              return;
                            }
                            fileHandler(e, index);
                          }}
                          id={`imageUpload${index}`}
                        />
                        <label htmlFor={`imageUpload${index}`} name=""></label>
                      </div>
                      <div className="avatar-preview">
                        <div
                          id={`imagePreview${index}`}
                          className="position-relative"
                        >
                          {index === 0 && (
                            <button
                              onClick={() => {
                                deleteFirstScreen(index, data.id);
                              }}
                              style={{
                                position: "absolute",
                                top: "16px",
                                borderRadius: "50%",
                                right: "16px",
                                border: "0",
                                background: "#FF4847",
                                color: "#fff",
                                padding: "2px 5px",
                                zIndex: "1",
                              }}
                            >
                              <i
                                className="la la-times"
                                style={{ fontSize: "18px" }}
                              ></i>
                            </button>
                          )}
                          {!!data?.src && (
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
                          {!data?.src && data.loading && <Loader />}
                        </div>
                      </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
        {isExist("ad_screen") && (
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Button
              variant="secondary"
              className="px-5"
              onClick={() =>
                setFormData([...formData, { src: "", loading: false }])
              }
            >
              {Translate[lang].add_new_screen}
            </Button>
            <Button
              variant="primary"
              className="px-5"
              onClick={() => onSubmit()}
            >
              {Translate[lang].submit}
            </Button>
          </div>
        )}
    </>
  );
};
export default AdScreen;
