import { React, useEffect, useState }  from 'react';
import EditModal from './EditModal';
import axios from 'axios'
import Input from './Input';
import Button from './Button';

const PackingList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPackingListId, setEditingPackingListId] = useState(null);
    const [packingList, setPackingList] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        date: "",
        time: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputs((prev) => ({ ...prev, [name]: value }));
    }

    const clearForm = () => {
        setInputs({
            name: "",
            date: "",
            time: ""
        });
    }

    useEffect(() => {
    async function getPackingLists() {
        try {
            const response = await axios.get("http://localhost:5000/packing_lists");
            setPackingList(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
    getPackingLists();
    }, []);

    const handleAddPackingList = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/packing_lists", {
                name: inputs.name,
                date: inputs.date,
                time: inputs.time
            })
            clearForm();
            window.location.reload('http://localhost:3000/');
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleOpenModal = (id) => {
        setEditingPackingListId(id);
        setIsModalOpen(true);
    };

    const handleDeletePackingList = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/packing_lists/${id}`)
            setPackingList((prevList) => prevList.filter((list) => list.id !== id));
        } catch (error) {
            console.error(error);
        }        
    }

    return(
        <div className='mx-auto w-full items-center justify-between'>
            <div className='mt-10 mb-8 px-3'>
                <form onSubmit={handleAddPackingList} className='flex flex-row items-center justify-between'>
                    <Input index='travel_name' labelName='Trip Name' inputValue={inputs.name} inputName='name' inputType='text' onChange={handleChange} inputStyle='w-[376px]' placeHolder='Enter trip title' />
                    <Input index='travel_date' labelName='Date of Travel' inputValue={inputs.date} inputName='date' inputType='date' onChange={handleChange}  inputStyle='w-[376px]' placeHolder='Enter travel date' />
                    <Input index='travel_time' labelName='Departure Time' inputValue={inputs.time} inputName='time' inputType='time' onChange={handleChange}  inputStyle='w-[376px]' placeHolder='Enter departure time' />
                    <Button buttonStyle='h-[32px] w-[236px] mt-3 bg-travelBlue text-center' buttonType='submit' buttonName='Add' />
                </form>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-travelGray">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Trip Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date To Travel
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Departure
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {packingList.map((list) => (
                            <tr key={list.id} className="bg-white border-b">
                                <td className="px-6 py-2">
                                    {list.name}
                                </td>
                                <td className="px-6 py-2">
                                    {list.date}
                                </td>
                                <td className="px-6 py-2">
                                    {list.time}
                                </td>
                                <td className="px-6 py-2">
                                    <Button onClick={() => handleOpenModal(list.id)} buttonStyle='h-[32px] w-[100px] mt-3 bg-travelGreen text-center' buttonType='submit' buttonName='Edit' />
                                </td>
                                <td className="px-6 py-2">
                                    <Button onClick={() => handleDeletePackingList(list.id)} buttonStyle='h-[32px] w-[100px] mt-3 bg-travelRed text-center' buttonType='submit' buttonName='Delete' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen && (
                    <EditModal isOpen={true} packingListId={editingPackingListId} />
                )}
            </div>
        </div>
    )
}

export default PackingList;
