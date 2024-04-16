/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 标题
     * @default 选择
     */
    title?: string;
    /**
     * @description 是否单选
     * @default false
     */
    radio?: boolean;
    /**
     * @description 取消按钮的回调
     * @default ()=>void
     */
    onClose?: Function;
    /**
     * @description 确认按钮的回调
     * @default ()=>void
     */
    onConfirm?: Function;
    /**
     * @description 初始选中的值
     * @default []
     */
    defaultValue?: Array<any>;
    /**
     * @description 类型--1部门、2成员、3部门+成员
     * @default 2
     */
    type: Number | String;
};
export default function Organization(props: PropsType): JSX.Element;
export {};
