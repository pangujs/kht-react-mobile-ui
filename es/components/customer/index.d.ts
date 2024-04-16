/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 默认点击是否跳转到客户画像页面
     * @default true
     */
    gotoPortrait?: boolean;
    /**
     * @description 标题
     * @default 选择
     */
    title?: string;
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
export default function Customer(props: PropsType): JSX.Element;
export {};
