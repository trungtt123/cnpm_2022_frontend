import React, { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { isDetailVisibleSelector, isSelectedIdSelector } from '../Redux/selector';
import detailroomSlice from '../Redux/detailRoomSlice';
import { Descriptions } from 'antd';
import { fontSize } from '@mui/system';
import axios from '../setups/custom_axios';
import { formatDate } from '../Services/API/formatDateService';



export default function AddRoomModal() {

    const isDetailVisible = useSelector(isDetailVisibleSelector)
    const isSelectedId = useSelector(isSelectedIdSelector)
    const [detailHouseholdData , setdetailHouseHoldData] = useState ({})
    const [danhSachNhanKhau, setDanhSachNhanKhau] = useState ([])

    useEffect (
       async () => {
            try {
                const response = await axios.get(`ho-khau?maHoKhau=${isSelectedId}`)
                setdetailHouseHoldData ( response.data )
                setDanhSachNhanKhau (response.data.danhSachNhanKhau);
            } catch (error) {
                console.log (error);
            }
        }, [isDetailVisible, isSelectedId]
    )

    const dispatch = useDispatch()

    const handleOk = () => {

        dispatch(detailroomSlice.actions.isDetailVisibleChange())
    };

    const handleCancel = () => {
    
        dispatch(detailroomSlice.actions.isDetailVisibleChange())
      };

    return (
        <div>
            <Modal
                visible={isDetailVisible}
                onOk={handleOk}
                width = {700}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <Descriptions title="Thông tin hộ khẩu" >
                    <Descriptions.Item label="Mã hộ khẩu " span={3}>{detailHouseholdData.maHoKhau}</Descriptions.Item>
                    <Descriptions.Item label="Số thành viên">{danhSachNhanKhau.length}</Descriptions.Item>
                    <Descriptions.Item label="Nơi cấp ">{detailHouseholdData.noiCap}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cấp">{formatDate(detailHouseholdData.ngayCap)}</Descriptions.Item>
                    <Descriptions title=" "></Descriptions>
                </Descriptions>

                {
                    danhSachNhanKhau.map ((nhanKhau) => {
                        return (
                            
                <Descriptions title= "Nhân khẩu 1">
                    <Descriptions.Item label="Mã nhân khẩu" span={3}>{nhanKhau.maNhanKhau}</Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">{nhanKhau.hoTen}</Descriptions.Item>
                    <Descriptions.Item label="Căn cước">{nhanKhau.canCuocCongDan}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">{formatDate(nhanKhau.ngaySinh)}</Descriptions.Item>
                    <Descriptions.Item label="Nơi sinh">{nhanKhau.noiSinh}</Descriptions.Item>
                    <Descriptions.Item label="Dân tộc">{nhanKhau.danToc}</Descriptions.Item>
                    <Descriptions.Item label="Nghề nghiệp">{nhanKhau.ngheNghiep}</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">{nhanKhau.trangThai}</Descriptions.Item>
                    <Descriptions.Item label="Quan hệ với chủ hộ">{nhanKhau.quanHe}</Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">{nhanKhau.ghiChu}</Descriptions.Item>
                    <Descriptions title=" "></Descriptions>
                </Descriptions>

                        )
                    })
                }

            </Modal>
        </div >
    );
}
