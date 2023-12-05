import React from 'react';
import Input from './Input';
import Button from './Button';

const PackingList = () => {
    return(
        <div className='mx-auto w-full items-center justify-between mt-10 mb-8 px-3'>
            <form className='flex flex-row items-center justify-between'>
                <Input labelName='Trip Name' inputType='text' inputStyle='w-[376px]' placeHolder='Enter trip title' />
                <Input labelName='Date of Travel'inputType='date' inputStyle='w-[376px]' placeHolder='Enter travel date' />
                <Input labelName='Departure Time' inputType='time' inputStyle='w-[376px]' placeHolder='Enter departure time' />
                <Button buttonStyle='h-[32px] w-[236px] mt-3 bg-travelBlue text-center' buttonType='submit' buttonName='Add' />
            </form>
        </div>
    )
}

export default PackingList;
