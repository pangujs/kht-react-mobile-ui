/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 必传---层级接口,不需要前面的/api/v1
     * @default
     */
    apiUrl: string;
    /**
     * @description 标题
     * @default 请选择
     */
    title?: string;
    /**
     * @description 父级id 字段名
     * @default parentId
     */
    parentId?: string;
    /**
     * @description 接口传参公共参数
     * @default { }
     */
    queryInfo?: any;
    /**
     * @description 自定义字段取值，两者需同时存在。label展示名称，value 为key唯一值不能重复,并且是作为parentId的取值
     * @default { label: 'name', value: 'id' }
     */
    fieldNames?: any;
    /**
     * @description 是否多选
     * @default false
     */
    multiple: boolean;
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
    /**
     * @description 判断是否有下级的方法,传什么就执行什么方法，默认会赋值当前项：item
     * @default ()=>void
     */
    onNextOperation?: Function;
};
export default function ClassifyLevel(props: PropsType): JSX.Element;
export {};
