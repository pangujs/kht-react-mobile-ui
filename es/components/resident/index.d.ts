/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 必传 上级数据，可能是（机构、小区、分期、楼栋、单元、楼层等等... {id:"",sourceTableType:"",name:""}
     * @default
     */
    info: any;
    /**
     * @description 标题
     * @default 选择
     */
    title?: string;
    /**
     * @description 业户类型  类型[family:家属，proprietor：业主，tenant：租户],默认全部
     * @default ""
     */
    residentType?: string;
    /**
     * @description 是否单选
     * @default false
     */
    radio?: boolean;
    /**
     * @description 自定义筛选参数
     * @default {}
     */
    customsQueryInfo?: any;
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
     * @description 确认按钮的回调
     * @default ()=>void
     */
    onConfirm?: Function;
};
export default function Resident(props: PropsType): JSX.Element;
export {};
