/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 类型---1是快捷时间筛选列表，2是只有自定义时间
     * @default 1
     */
    type?: Number | String;
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
     * @description 是否保留上次选中的数据信息
     * @default true
     */
    retentionHistory?: boolean;
};
export default function DatePickerPopup(props: PropsType): JSX.Element;
export {};
