/// <reference types="react" />
type PropsType = {
    visible: boolean;
    onClose?: Function;
    onConfirm?: Function;
    radio?: boolean;
    queryInfo?: any;
    /**
     * @description 类型--1部门、2成员、3部门+成员、4项目、5房屋、6业户、7空间、8客户
     * @default 2
     */
    type: Number | String;
};
export default function PopupSearch(props: PropsType): JSX.Element;
export {};
