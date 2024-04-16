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
     * @description 选择项 [
     * {
     *  name:"一级",
     *  id:0,
     *    children:[
     *      {name:"二级",id:1}
     *    ]
     *  }
     * ]  备注：id必传，如果有全部id应为""空串
     * @default []
     */
    options: Array<any>;
    /**
     * @description 数值变化一次都走一遍重置操作
     * @default 0
     */
    initResetNumber?: number;
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
