import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import Input from './Input';

const EditModal = ({ isOpen, onClose, packingListId }) => {
    const [packingListData, setPackingListData] = useState({
        name: '',
        date: '',
        time: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackingListData({
            ...packingListData,
            [name]: value,
        });
    };

    useEffect(() => {
        async function getPackingListData() {
            try {
                const response = await axios.get(`http://localhost:5000/packing_lists/${packingListId}`);
                setPackingListData(response.data);
                
            } catch (error) {
                console.log(error)
            }
        }
        getPackingListData();
    }, [packingListId]);
    
    const handleEditPackingList = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:5000//packing_lists/${id}`, updatedData);
            setPackingListData(updatedData)
            console.log(updatedData)
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            handleEditPackingList(packingListId, packingListData);
            await axios.get("http://localhost:5000/packing_lists");
            window.location.reload('http://localhost:3000/');
        } catch (error) {
            console.log(error)
        }
    };

  return isOpen ? (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 min-w-lg">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-blue-50 p-6 rounded-md z-10 w-[586px]">
            <div className="text-right">
                <Button
                buttonStyle='text-white font-medium font-sm w-[86px] bg-travelRed rounded-md mb-2'
                onClick={onClose}
                buttonName="Close"
                />
            </div>
            <h3 className="text-xl text-center font-semibold mb-4">Edit Packing List</h3>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-between space-y-3'>
                    <Input index='travel_name' labelName='Trip Name' inputValue={packingListData.name} inputName='name' inputType='text' onChange={handleChange} inputStyle='w-[376px]' placeHolder='Enter trip title' />
                    <Input index='travel_date' labelName='Date of Travel' inputValue={packingListData.date} inputName='date' inputType='date' onChange={handleChange}  inputStyle='w-[376px]' placeHolder='Enter travel date' />
                    <Input index='travel_time' labelName='Departure Time' inputValue={packingListData.time} inputName='time' inputType='time' onChange={handleChange}  inputStyle='w-[376px]' placeHolder='Enter departure time' />
                    <Button buttonStyle='h-[32px] w-[376px] mt-3 bg-travelGreen text-center' buttonType='submit' buttonName='Edit' />
                </form>
            </div>
        </div>
  ) : null;
}

export default EditModal
