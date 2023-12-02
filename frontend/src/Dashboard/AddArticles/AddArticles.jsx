import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const AddArticles = () => {
   
    // SUBMIT FORM DATA TO THE DATABASE
    const [files, setFiles] = useState('')
    const [headline, setHeadline] = useState('')
    const [titleOne, setTitleOne] = useState('')
    const [titleTwo, setTitleTwo] = useState('')
    const [titleThree, setTitleThree] = useState('')
    const [titleFour, setTitleFour] = useState('')
    const [paraOne, setParaOne] = useState('')
    const [paraTwo, setParaTwo] = useState('')
    const [paraThree, setParaThree] = useState('')
    const [paraFour, setParaFour] = useState('')
    const [bgimg, setBGimg] = useState('')

   const navigate = useNavigate()
    const config = {
        headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    };
    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        // ARTICLES IMAGES
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/rahatdev1020/image/upload",
                        data
                    );

                    const { url } = uploadRes.data;
                    return url;
                })
            );
            // console.log(files)

            // BACKROUD IMAGE
            const data = new FormData();
                    data.append("file", bgimg);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/rahatdev1020/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
            

            const artObject = {
                headline,
                bgimg: url,
                titleOne,
                titleTwo,
                titleThree,
                titleFour,
                paraOne,
                paraTwo,
                paraThree,
                paraFour,
                img: list,
            }
            console.log(artObject)

            const res = await axios.post('https://hotel-server-beryl.vercel.app/article/add', artObject, config);
            console.log(res.data)
            res && Swal.fire({
                icon: 'success',
                title: 'Articles added',
            })
            setTimeout(function () {
                navigate("/artlists")
            }, [1000])
            return clearTimeout(setTimeout())
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <div className="ad">
            <Topbar />
            <Sidebar />
            <div className="admin">
                <div className="adminDash">
                    <div className="titleContainer">
                        <div className="adDash">
                            <div className="TeacherAdd">

                                {/* Teacher add forms */}
                                <div className="">
                                    <div className="Tadd">
                                        {/* basic details */}
                                        <>
                                            <div className="bdtails">
                                                <h4>Articles Details</h4>
                                                <div className="line" />
                                            </div>
                                            <form className="row g-3" onSubmit={handleSubmit}>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputEmail4" className="form-label">Headline</label>
                                                    <input type="text" className="form-control" id="inputEmail4" onChange={(e) => setHeadline(e.target.value)} placeholder="headline" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Title one</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setTitleOne(e.target.value)} placeholder="title one" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Paragrap One</label>
                                                    <textarea type="text" className="form-control" id="inputCity" onChange={(e) => setParaOne(e.target.value)} placeholder="para one" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputPassword4" className="form-label">Title Two</label>
                                                    <input type="text" className="form-control" id="inputPassword4" onChange={(e) => setTitleTwo(e.target.value)} placeholder="Title Two" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Paragrap Two</label>
                                                    <textarea type="text" className="form-control" id="inputCity" onChange={(e) => setParaTwo(e.target.value)} placeholder="para two" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Title Three</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setTitleThree(e.target.value)} placeholder="Title Three" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Paragrap Three</label>
                                                    <textarea type="text" className="form-control" id="inputCity" onChange={(e) => setParaThree(e.target.value)} placeholder="para three" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Title Four</label>
                                                    <input type="text" className="form-control" id="inputCity" onChange={(e) => setTitleFour(e.target.value)} placeholder="Title Four" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputCity" className="form-label">Paragrap Four</label>
                                                    <textarea type="text" className="form-control" id="inputCity" onChange={(e) => setParaFour(e.target.value)} placeholder="para four" />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputZip" className="form-label">Articles Images</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="inputZip" className="form-label">Background Image</label>
                                                    <div className="d-flex justify-content-start align-items-start">
                                                        <input type="file" multiple onChange={(e) => setBGimg(e.target.files[0])} className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-4">
                                                    <button type="submit" className="btn btn-warning text-white fw-bold">Submit</button>
                                                </div>
                                            </form>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddArticles