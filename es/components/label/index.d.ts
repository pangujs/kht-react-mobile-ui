/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 标题
     * @default 选择标签
     */
    title?: string;
    /**
     * @description 默认选中的标签
     * @default []
     */
    defaultList?: Array<any>;
    /**
     * @description 是否需要每次初始化数据
     * @default []
     */
    isResetAll?: Array<any>;
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
export default function PopupFilter(props: PropsType): JSX.Element;
export {};
