import axios from "../../setups/custom_axios";

export const addHouseHold = async newHouseHold => {
    try {
        const response = await axios.post(`/ho-khau`, newHouseHold)
        console.log (response);

        if (response.message){
            alert (response.message)
        } else {
            alert ("Thêm thất bại ")
        }
    } catch (error) {
        console.log (error);
    }
}


export const deleteHouseHold = async HouseHoldId => {
    try {
        const response = await axios.delete(`ho-khau?maHoKhau=${HouseHoldId}`)
        console.log (response)
        alert (response.message);
        /*if (response.message){
            alert (response.message)
        } else {
            alert ("Xóa thất bại")
        }*/
    } catch (error) {
        console.log(error)
    }
}

