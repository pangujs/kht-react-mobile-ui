/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 标题
     * @default 添加人
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
};
export default function FilterPopup(props: PropsType): JSX.Element;
export {};
