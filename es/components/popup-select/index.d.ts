/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 标题
     * @default 请选择
     */
    title?: string;
    /**
     * @description 选择项
     * @default []
     */
    options: Array<any>;
    /**
     * @description key,value字段名
     * @default { label: 'name', value: 'id' }
     */
    fieldNames?: any;
    /**
     * @description 是否多选
     * @default false
     */
    multiple?: boolean;
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
};
export default function PopupSelect(props: PropsType): JSX.Element;
export {};
