/// <reference types="react" />
type PropsType = {
    /**
     * @description 弹层的状态
     * @default false
     */
    visible: boolean;
    /**
     * @description 标题
     * @default 全部
     */
    title: String;
    /**
     * @description 集合数据，如果要展示成员的头像，list->item需包含isEmployee为 true [{isEmployee：true,name:"张三"}]
     * @default []
     */
    list: Array<any>;
    /**
     * @description 取消按钮的回调
     * @default ()=>void
     */
    onClose?: Function;
    /**
     * @description 数据改变回调
     * @default ()=>void
     */
    onChange?: Function;
    /**
     * @description 清空全部的回调
     * @default ()=>void
     */
    onCloseAll?: Function;
    /**
     * @description 类型 2标题展示'人'其余展示'个'，
     * @default 2
     */
    type?: Number | String;
    /**
     * @description 是否需要close操作
     * @default  true
     */
    isClose?: boolean;
};
export default function ExecutorPopup(props: PropsType): JSX.Element;
export {};
