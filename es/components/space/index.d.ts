/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 必传---上级小区数据 {id:"",sourceTableType:"",name:""}
     * @default
     */
    info: any;
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
export default function Space(props: PropsType): JSX.Element;
export {};
