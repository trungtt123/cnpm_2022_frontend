import React from 'react';
import { Form, Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { isDetailVisibleSelector } from '../Redux/selector';
import detailroomSlice from '../Redux/detailRoomSlice';
import { Descriptions } from 'antd';
import { fontSize } from '@mui/system';





export default function AddRoomModal() {

    const isDetailVisible = useSelector(isDetailVisibleSelector)
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
                    <Descriptions.Item label="Mã hộ khẩu " span={3}>HK001</Descriptions.Item>
                    <Descriptions.Item label="Số thành viên">2</Descriptions.Item>
                    <Descriptions.Item label="Nơi cấp ">Số 1, Đại cồ việt</Descriptions.Item>
                    <Descriptions.Item label="Ngày cấp">13/11/2022</Descriptions.Item>
                    
                </Descriptions>
                <Descriptions title=" "></Descriptions>
                <Descriptions title= "Nhân khẩu 1">
                    <Descriptions.Item label="Mã nhân khẩu" span={3}>NK001</Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">Nguyễn Việt Hưng</Descriptions.Item>
                    <Descriptions.Item label="Căn cước">123456789</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">13/11</Descriptions.Item>
                    <Descriptions.Item label="Nơi sinh">Bệnh viện huyện</Descriptions.Item>
                    <Descriptions.Item label="Dân tộc">Kinh</Descriptions.Item>
                    <Descriptions.Item label="Nghề nghiệp">Sinh viên</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">Còn sống</Descriptions.Item>
                    <Descriptions.Item label="Quan hệ với chủ hộ">Con</Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">Không</Descriptions.Item>
                    
                </Descriptions>
                <Descriptions title=" "></Descriptions>
                <Descriptions title="Nhân khẩu 2">
                    <Descriptions.Item label="Mã nhân khẩu" span={3}>NK001</Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">Nguyễn Việt Hưng</Descriptions.Item>
                    <Descriptions.Item label="Căn cước">123456789</Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">13/11</Descriptions.Item>
                    <Descriptions.Item label="Nơi sinh">Bệnh viện huyện</Descriptions.Item>
                    <Descriptions.Item label="Dân tộc">Kinh</Descriptions.Item>
                    <Descriptions.Item label="Nghề nghiệp">Sinh viên</Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">1</Descriptions.Item>
                    <Descriptions.Item label="Quan hệ với chủ hộ">Con</Descriptions.Item>
                    <Descriptions.Item label="Ghi chú">Không</Descriptions.Item>
                    
                </Descriptions>


            </Modal>
        </div >
    );
}

