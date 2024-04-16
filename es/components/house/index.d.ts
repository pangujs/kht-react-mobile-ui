/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 非必传 -- 上级数据，可能是（机构、小区、分期、楼栋、单元、楼层等等...）没有默认请求顶级机构
     * @default
     */
    info?: Object;
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
     * @description 默认项
     * @default []
     */
    defaultValue?: Array<any>;
    /**
     * @description 取消按钮的回调
     * @default ()=>void
     */
    onClose?: Function;
    /**
     * @description 确认按钮的回调,data为选中的房屋，list为选中的所有数据（不包含房屋）
     * @default ()=>void
     */
    onConfirm?: Function;
};
export default function House(props: PropsType): JSX.Element;
export {};
