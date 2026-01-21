import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaUserCircle, FaUpload } from 'react-icons/fa'
import './AddDoctor.css'

const AddDoctor = () => {

    const { backendUrl, aToken } = useContext(AdminContext);

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image not selected');
            }

            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
                headers: { aToken }
            })

            if( data.success ) {
                toast.success(data.message);
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setAbout('');
                setFees('');
                setDegree('');
                setAddress1('');
                setAddress2('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-doc-container">
            <p className="form-title">Add New Doctor</p>

            <div className="upload-area">
                <label htmlFor="doc-img" className="upload-label">
                    {docImg ? (
                        <img className="upload-preview" src={URL.createObjectURL(docImg)} alt="" />
                    ) : (
                        <FaUserCircle size={80} color="#d1d5db" /> 
                    )}
                    <div style={{display: "flex", alignItems: "center", gap: "5px", fontSize: "14px"}}>
                        <FaUpload /> Upload Photo
                    </div>
                </label>
                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            </div>

            <div className="form-layout">
                <div className="form-grid">
                    <div className="input-group">
                        <label>Doctor Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required />
                    </div>

                    <div className="input-group">
                        <label>Speciality</label>
                        <select onChange={(e) => setSpeciality(e.target.value)} value={speciality}>
                            <option value="General Physician">General Physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatrician">Pediatrician</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Doctor Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
                    </div>

                    <div className="input-group">
                        <label>Degree</label>
                        <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required />
                    </div>

                    <div className="input-group">
                        <label>Doctor Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                    </div>

                    <div className="input-group">
                        <label>Address 1</label>
                        <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address Line 1" required />
                    </div>

                    <div className="input-group">
                        <label>Experience</label>
                        <select onChange={(e) => setExperience(e.target.value)} value="experience">
                            <option value="1 Year">1 Year</option>
                            <option value="2 Years">2 Years</option>
                            <option value="3 Years">3 Years</option>
                            <option value="4 Years">4 Years</option>
                            <option value="5 Years">5 Years</option>
                            <option value="10 Years">10+ Years</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Address 2</label>
                        <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address Line 2" required />
                    </div>

                    <div className="input-group">
                        <label>Fees</label>
                        <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required />
                    </div>
                </div>

                <div className="input-group">
                    <label>About Doctor</label>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about}  placeholder="Write about doctor" required />
                </div>
            </div>

            <button type="submit" className="submit-btn">Add Doctor</button>
        </form>
    )
}

export default AddDoctor;