import Swal from "sweetalert2";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Topbar from "../../Topbar/Topbar";
import Sidebar from "../../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
const InnerHotelPhotos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const config = {
    headers: { token: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
  };

  const adminId = 1;
  const [files, setFiles] = useState(Array(4).fill(null));
  const [showFiles, setShowFiles] = useState(Array(4).fill(false));
  const [numBoxes, setNumBoxes] = useState(
    parseInt(localStorage.getItem("boxCount")) || 4
  );
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    const tempfiles = Array(4).fill(null);
    const tempShowFiles = Array(4).fill(false);
    for (let i = 0; i < numBoxes; i++) {
      const tempFileURL = localStorage.getItem(`image_url${i}`);
      console.log(tempFileURL);
      if (tempFileURL) {
        tempfiles[i] = tempFileURL;
        tempShowFiles[i] = true;
      }
    }
    setFiles(tempfiles);
    setShowFiles(tempShowFiles);
  }, [numBoxes]);

  const handleFileChange = async (e, index) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    let imageUrl;
    const reader = new FileReader();
    reader.onload = async () => {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const fileId = JSON.parse(localStorage.getItem(`fileId${index}`));
        console.log(
          `update fileId${index}:`,
          localStorage.getItem(`fileId${index}`)
        );
        const url = files[index]
          ? `http://localhost:5000/innerHotel/updatefile/${adminId}/${fileId}`
          : `http://localhost:5000/innerHotel/addfile/${adminId}`;

        const response = await axios.patch(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const resfileId = response.data.data.fileId;
        localStorage.setItem(`fileId${index}`, JSON.stringify(resfileId));

        imageUrl = response.data.data.secure_url_file;
        localStorage.setItem(`image_url${index}`, imageUrl);
        if (!files[index]) {
          console.log("i am calling");
          const newFileId = response.data.data.fileId;
          localStorage.setItem(`fileId${index}`, JSON.stringify(newFileId));
          imageUrl = response.data.data.secure_url_file;
          localStorage.setItem(`image_url${index}`, imageUrl);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
      const filesCopy = [...files];
      filesCopy[index] = imageUrl;
      setFiles(filesCopy);
      setShowFiles((prevShowFiles) =>
        prevShowFiles.map((show, i) => (i === index ? true : show))
      );

      setIsImageUploaded(true);
    };
    reader.readAsText(selectedFile);
  };

  const handleDeleteFile = async (index) => {
    const fileId = JSON.parse(localStorage.getItem(`fileId${index}`));
    const image_url = localStorage.getItem(`image_url${index}`);
    console.log(
      `delete fileId${index}:`,
      localStorage.getItem(`fileId${index}`)
    );
    console.log(
      `delete image_url${index}:`,
      localStorage.getItem(`image_url${index}`)
    );
    if (!fileId && !image_url) {
      console.log(`No file found for index ${index}`);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/innerHotel/deletefile/${adminId}/${fileId}`
      );

      console.log(response.data);
      localStorage.removeItem(`fileId${index}`);
      localStorage.removeItem(`image_url${index}`);
    } catch (error) {
      console.log(error, "delete api error");
    }
  };

  const handleAddBox = () => {
    const numFiles = files.filter((file) => file !== null).length;
    if (numFiles < numBoxes) {
      UploadImageFirst();
      return;
    }
    setNumBoxes((prevNumBoxes) => prevNumBoxes + 1);
    setFiles((prevFiles) => [...prevFiles, null]);
    setShowFiles((prevShowFiles) => [...prevShowFiles, false]);
  };

  useEffect(() => {
    localStorage.setItem("boxCount", numBoxes);
  }, [numBoxes]);

  const handleRemoveBox = (index) => {
    if (index >= 4 && index < numBoxes) {
      setNumBoxes((prevNumBoxes) => prevNumBoxes - 1);
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setShowFiles((prevShowFiles) =>
        prevShowFiles.filter((_, i) => i !== index)
      );

      setSelectedBox(null);
    }
  };
  const handleImageCancel = () => {
    const newFiles = [...files];
    newFiles[selectedBox] = null;
    setFiles(newFiles);

    const newShowFiles = [...showFiles];
    newShowFiles[selectedBox] = false;
    setShowFiles(newShowFiles);

    setSelectedBox(null);
  };

  const handleReplacePhoto = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .pdf, .image , .png, .html ";
    input.addEventListener("change", (e) => handleFileChange(e, index));
    input.click();
  };

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  // ===============
  const [isImageUploaded, setIsImageUploaded] = useState(
    localStorage.getItem("isImageUploaded") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isImageUploaded", isImageUploaded);
  }, [isImageUploaded]);
  const handleSend = () => {
    if (isImageUploaded) {
    } else {
      notify();
    }
  };

  const notify = () =>
    toast("Please upload an image first.", { type: "error" });
  const UploadImageFirst = () =>
    toast("Please upload a file in each box before adding a new one.", {
      type: "error",
    });
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // try {
    //   const res = await axios.post(
    //     "http://localhost:5000/roomFeature/createRoomFeature",
    //     extraServicesObj,
    //     config
    //   );
    //   console.log(res);
    //   res &&
    //     Swal.fire({
    //       icon: "success",
    //       title: "ExtraServices created",
    //     });
    //   setTimeout(() => {
    //     navigate("/addRoom");
    //   }, 1000);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="ad">
      <Topbar />
      <Sidebar />
      <div className="admin">
        <div
          className="adminDash"
          style={{ flex: 1, overflowY: "auto", height: "100vh" }}
        >
          <div className="titleContainer">
            <div className="adDash">
              <div className="TeacherAdd">
                <div className="teacherTitle">
                  <div className="colLeft">
                    <strong className="firstTitle">
                      Dashboard /{" "}
                      <span className="scndTitle">Add Inner Hotel Photos</span>
                    </strong>
                  </div>
                </div>

                <div className="mt-3">
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {[...Array(numBoxes)].map((_, index) => (
                        <div
                          key={index}
                          style={{
                            margin: "10px",
                            // flexBasis: "calc(20% - 20px)"
                            flexBasis: "calc(5% - 10px)",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              border: "1px solid orange",
                              width: "80px",
                              height: "80px",
                              position: "relative",
                              borderRadius: "0.5rem",
                              opacity: selectedBox === index ? 0.5 : 1,
                              border:
                                selectedBox === index
                                  ? "4px solid black"
                                  : "3px solid orange",
                            }}
                            onClick={() => handleBoxClick(index)}
                          >
                            {!showFiles[index] && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "1%",
                                  left: "30%",
                                }}
                              >
                                <label htmlFor={`fileInput-${index}`}>
                                  <span
                                    style={{
                                      fontSize: "50px",
                                      color: "orange",
                                      cursor: "pointer",
                                    }}
                                  >
                                    +
                                  </span>
                                  <input
                                    id={`fileInput-${index}`}
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileChange(e, index)}
                                  />
                                </label>
                              </div>
                            )}
                            {showFiles[index] && (
                              <div>
                                {files[index]?.includes("png") && (
                                  <div>
                                    <img
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        position: "absolute",
                                        // objectFit: "cover",
                                      }}
                                      src={files[index]}
                                      // src={URL.createObjectURL(files[index])}
                                      alt="uploaded file"
                                    />
                                  </div>
                                )}
                                {files[index]?.includes("jpg") && (
                                  <div>
                                    <img
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        position: "absolute",
                                        // objectFit: "cover",
                                      }}
                                      src={files[index]}
                                      // src={URL.createObjectURL(files[index])}
                                      alt="uploaded file"
                                    />
                                  </div>
                                )}
                              </div>
                              //////
                            )}
                            {/* ========= */}
                          </div>
                        </div>
                      ))}
                      {numBoxes < 40 && (
                        <div
                          style={{
                            margin: "10px",
                            flexBasis: "calc(20% - 20px)",
                          }}
                        >
                          <div
                            style={{
                              border: "1px dashed grey",
                              width: "80px",
                              height: "80px",
                              position: "relative",
                              borderRadius: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.5rem",
                              cursor: "pointer",
                            }}
                            onClick={handleAddBox}
                          >
                            <span style={{ marginTop: "-0.5rem" }}>+</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ====buttons========== */}
                  <div className="row mt-2">
                    <div className="col-sm-3 col-lg-3">
                      <button
                        style={{
                          paddingLeft: "1.9rem",
                          paddingRight: "1.9rem",
                          textTransform: "capitalize",
                        }}
                        className="btn btn-warning text-white fw-bold"
                        variant="outlined"
                        onClick={() => {
                          handleRemoveBox(selectedBox);
                          handleImageCancel();
                          handleDeleteFile(selectedBox);
                        }}
                      >
                        delete Photo
                      </button>
                    </div>

                    <div className="col-sm-3 col-lg-3">
                      <Button
                        style={{
                          paddingLeft: "1.9rem",
                          paddingRight: "1.9rem",
                          textTransform: "capitalize",
                          borderColor: "orange",
                        }}
                        className="btn btn-white text-warning fw-bold"
                        variant="outlined"
                        onClick={() => handleReplacePhoto(selectedBox)}
                      >
                        Change photo
                      </Button>
                      <div id="loader">{isLoading && <Loader />}</div>
                      <ToastContainer />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerHotelPhotos;
