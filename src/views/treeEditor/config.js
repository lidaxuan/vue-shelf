/*
 * @Description: 
 * @Author: 李大玄
 * @Date: 2023-12-01 18:28:42
 * @FilePath: /vue-shelf/src/views/treeEditor/config.js
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-12-01 18:28:42
 */
import './menu.scss';
import {useEffect, useState} from 'react';
import {Input, Modal, Form, Radio, message, Divider, Dropdown, Button,} from 'antd';
import {v4} from 'uuid';
import {
  ExclamationCircleOutlined, CaretRightOutlined, CaretDownOutlined,
  FileTextFilled, HomeFilled, FolderOutlined
} from '@ant-design/icons';
import apiMap from '../../service';
import type {MenuProps} from 'antd';
import {summaryCompontType, timerSaveObj} from '../../share/ts/utils/index';
import _ from 'lodash';

const {confirm} = Modal;

interface CreateTreeNode {
  title: string;
  key: string;
  children?: Array<CreateTreeNode>;
  
  [key: string]: any;
}

export interface SpaceValue {
  id?: string;
  name?: string;
  holdingType?: string;
  
  [key: string]: any;
}

interface SummaryItem {
  spaceId: string;
  id: string;
  documentId: string;
  title: string;
  contentType: string;
  pid: string;
  holdingType: string;
  children?: Array<SummaryItem>;
  
  [key: string]: any;
}

export const SPACE_KEY: string = 'space';
export const DELETE_SPACE_KEY: string = 'delete_space';
export const DOCUMENT_KEY: string = 'document';

const menuList: MenuProps['items'] = [
  {label: '新建文档库', key: SPACE_KEY},
  {label: '删除当前文档库', key: DELETE_SPACE_KEY},
  {type: 'divider',},
  // {label: '新建文档', key: DOCUMENT_KEY},
  // {type: 'divider',},
  {label: '分享文档库', key: 'spaceShare'},
  {label: '取消分享文档库', key: 'spaceCancelShare'},
  {type: 'divider'},
];

interface Props {
  session: Session;
  triggerNodeGetData: (data: any, cb: Function) => void;
  setShowEmpty: (flag: boolean) => Promise<void>;
  
  [key: string]: any;
}


export default function MenuComponent(props: Props) {
  const [form] = Form.useForm();
  const [createform] = Form.useForm();
  const [createModalType, setCreateModalType] = useState(''); // SPACE_KEY
  const [spaceList, setSpaceList] = useState<Array<SpaceValue>>([]);
  const [spaceItemInfo, setSpaceItemInfo] = useState<SpaceValue>({});
  const [selectDefaultValue, setSelectDefaultValue] = useState<string | undefined>('');
  const [treeList, setTreeList] = useState<Array<SummaryItem>>([]);
  const [treeKey, setTreeKey] = useState<any>('');
  const [currentClickKey, seCurrentClickKey] = useState('');
  const [createNodeData, setCreateNodeData] = useState<any>({}); // 操作的当前tree 节点
  const [modalVisible, setModalVisible] = useState<{ [key: string]: boolean }>({
    'export': false,
    'editname': false,
    'createform': false
  });
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean | undefined }>({});
  const items: MenuProps['items'] = menuList;
  const [currentDocumentInfo, setCurrentDocumentInfo] = useState<any>({});
  
  
  React.useImperativeHandle(props.onRef, () => {
    return {
      spaceItemInfo,
      fetchSummaryTree,
      getSpaceList,
      createTreeNode,
      editTreeNodeName,
      deleteTreeNode,
      getBreadcrumb
    };
  });
  
  const getBreadcrumb = (documentId: string) => {
    const sign = ' / ';
    let path: Array<any> = [];
    
    function dfs(node: any, tmpPath: any) {
      tmpPath.push(node.title);
      if (node.documentId === documentId) {
        path = tmpPath;
        return;
      }
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          dfs(node.children[i], tmpPath.slice());
        }
      }
    }
    
    for (let i = 0; i < treeList.length; i++) {
      dfs(treeList[i], []);
      if (path.length > 0) {
        break;
      }
    }
    
    return `${spaceItemInfo.name}${sign}${path.join(sign)}`;
  };
  
  // ---------------------------------------------------------------------------
  // 获取目录
  const getSpaceList = async (cb: Function = () => void 0) => {
    const catalogRes = await apiMap.default.fetch.spaceList();
    if (catalogRes.code) {
      message.error(catalogRes.msg);
      return;
    }
    const list: Array<SpaceValue> = [].concat(catalogRes?.data || []);
    setSpaceList(list);
    cb(list);
  };
  
  // 将文档库第一个选中
  const selectSpaceFirst = async (list: Array<SpaceValue>) => {
    if (list.length) {
      setSelectDefaultValue(list.length ? list[0].id : '');
      setSpaceItemInfo(list.length ? list[0] : {});
      await fetchSummaryTree(_.first(list) as SpaceValue, (summaryList: [any]) => {
        if (summaryList.length) {
          itemClick(_.first(summaryList) as SummaryItem); // 点击
        }
      });
    }
  };
  
  // 获取文档树
  const fetchSummaryTree = async (item: SpaceValue, cb: Function = () => void 0) => {
    setSpaceItemInfo(item);
    const res = await apiMap.default.fetch.summaryTree({spaceId: item.id});
    if (res.code) {
      message.error(res.msg);
      return;
    }
    let list: Array<any> = [];
    for (const item in res.data) {
      list = list.concat(res.data[item] || []);
    }
    await setTreeList(list);
    cb(list);
  };
  
  useEffect(() => {
    getSpaceList((list: Array<SpaceValue>) => {
      selectSpaceFirst(list);
      setTreeKey(v4());
    });
  }, []);
  
  // ---------------------------------------------------------------------------
  
  const isShowEmpty = (flag = true) => {
    props.setShowEmpty(flag);
    seCurrentClickKey(''); // 清空
  };
  
  // 新增文件夹  弹窗展示
  const createTreeNode = (data: any, e: any, type: string): void => {
    openModal('createform');
    setCreateModalType(type); // 新建目录
    createform.setFieldsValue({title: ''});
    setCreateNodeData(data);
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  
  // 创建文件夹 目录提交按钮  文档
  const createFileOk = () => {
    createform.validateFields().then(async val => {
      let params = {};
      if (createModalType == SPACE_KEY) {
        params = {name: val.title};
      } else {
        params = {
          title: val.title,
          pid: createNodeData.documentId || 0,
          spaceId: spaceItemInfo.id || 0,
          contentType: val.contentType
        };
      }
      const res = await apiMap.default.fetch[`${createModalType}Add`](params);
      if (res.code) {
        message.open({type: 'error', content: res.msg});
        return;
      }
      getSpaceList(); // 获取目录
      fetchSummaryTree(spaceItemInfo, (summaryList: [any]) => {
        if (summaryList.length == 1) {
          itemClick(_.first(summaryList) as SummaryItem); // 点击
        }
      });
      message.open({type: 'success', content: '操作成功',});
      onCancel('createform');
    });
  };
  // ---------------------------------------------------------------------------
  
  // 删除文档
  const deleteTreeNode = async (data: any, e: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确认删除当前数据?',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const res = await apiMap.default.fetch.documentDelete({}, {splicingParams: data.documentId});
        if (res.code) {
          message.open({type: 'error', content: res.msg});
          return;
        }
        fetchSummaryTree(spaceItemInfo);
        if (data.documentId == currentClickKey) {
          isShowEmpty();
        }
        message.open({type: 'success', content: '删除成功'});
      }
    });
  };
  
  // 设置
  const setTreeNode = (treeList: Array<any>, id: string, data: any, isEdit?: boolean) => { // 通过id从数组（树结构）中移除元素
    if (!treeList || !treeList.length) {
      return;
    }
    for (let i = 0; i < treeList.length; i++) {
      if (treeList[i].key == id) {
        if (isEdit) {
          treeList[i] = Object.assign({}, treeList[i], data);
        } else {
          treeList[i].children.push(data);
        }
        break;
      }
      if (treeList[i].children && treeList[i].children.length) {
        setTreeNode(treeList[i].children, id, data, isEdit);
      }
    }
    // @ts-ignore
    setTreeList([...[].concat(treeList)]);
  };
  
  const openModal = (modalName: string) => {
    const visible = {...modalVisible};
    visible[modalName] = true;
    setModalVisible(visible);
    if (props.session) {
      props.session.stopKeyMonitor('block-modal2');
    }
  };

// 编辑
  const editTreeNodeName = (data: any, e: any, type: string): void => {
    form.setFieldsValue({title: data.title});
    openModal('editname');
    setCreateModalType(type); // 类型 catalog: 目录  doc: 文件
    setCreateNodeData(data);
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

// 修改文档名 确认按钮
  const editnameOk = () => {
    form.validateFields().then(async val => {
      const res = await apiMap.default.fetch.summaryEditName({}, {splicingParams: createNodeData.documentId + '?name=' + val.title});
      if (res.code) {
        message.open({type: 'error', content: res.msg});
        return;
      }
      message.open({type: 'success', content: '操作成功',});
      fetchSummaryTree(spaceItemInfo);
      props.setDocumentDetailName(val);
      onCancel('editname');
    });
  };
// 关闭弹窗
  const onCancel = (modalName: string) => {
    const visible = {...modalVisible};
    visible[modalName] = false;
    createform.resetFields(); // 重置
    setModalVisible(visible);
    setCreateNodeData({});
    if (props.session) {
      props.session.startKeyMonitor();
    }
  };

// 文档库切换刷新数据
  const onChange = async (value: any) => {
    if (value.key == SPACE_KEY) {
      createTreeNode({}, value.domEvent, value.key);
      return;
    } else if (value.key == DELETE_SPACE_KEY) {// 删除文档库
      deleteSpace();
      return;
    }
    if (value.key == 'spaceShare' || value.key == 'spaceCancelShare') {
      props.operationClick(value);
      return;
    }
    
    const flag = await timerSaveObj.setCurrentDocInfo(currentDocumentInfo, props.session);
    if (!flag) {
      return;
    }
    const item = spaceList.find(item => item.id == value.key) || {id: value.key};
    fetchSummaryTree(item, (list: any) => {
      if (list.length) {
        setTimeout(() => {
          itemClick(_.first(list) as SummaryItem); // 点击
        }, 0);
      } else {
        isShowEmpty();
      }
      // props.session.stopKeyMonitor('block-modal2');
    });
  };
  
  const itemClick = async (data: SpaceValue, e?: any) => {
    setCurrentDocumentInfo(data);
    if (data.contentType != "application/session-component") {
      setTimeout(() => {
        props.session.stopKeyMonitor('block-modal2');
      }, 1000);
    } else {
      props.session.startKeyMonitor();
    }
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!data) {
      isShowEmpty();
      return;
    }
    if (currentClickKey && data.documentId == currentClickKey) {
      return;
    }
    const flag = await timerSaveObj.setCurrentDocInfo(data, props.session);
    if (flag) {
      props.triggerNodeGetData(Object.assign({}, data), () => {
        timerSaveObj.clearTime(); // 为了将第一次加载 不进行保存 但是初始化空间会进行保存
      });
      seCurrentClickKey(data.documentId);
      setSelectDefaultValue(data.spaceId);
    } else {
      seCurrentClickKey(currentClickKey);
      setSelectDefaultValue(selectDefaultValue);
      setTreeKey(v4());
    }
    // return data;
  };
  
  // 删除文档库
  const deleteSpace = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: '确认删除当前数据?',
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const res = await apiMap.default.fetch.spaceDelete({}, {splicingParams: spaceItemInfo.id});
        if (res.code) {
          message.open({type: 'error', content: res.msg});
          return;
        }
        getSpaceList((list: Array<SpaceValue>) => {
          selectSpaceFirst(list);
          setTreeKey(v4());
        }); // 获取目录
        // fetchSummaryTree(spaceItemInfo);
        // if (data.documentId == currentClickKey) {
        //   isShowEmpty();
        // }
        message.open({type: 'success', content: '删除成功'});
      }
    });
  };

// 无数据
  const nodeData = () => <div className="flex ai-center jc-center flex-column no-data">无数据</div>;

// 展开收起
  const collapsedClick = (item: SummaryItem, e?: any) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    collapsed[item.documentId] = !collapsed[item.documentId];
    setCollapsed(collapsed);
    setTreeKey(v4());
  };

// 递归获取文档库树
  const getTreeDoc = (treeList: Array<any>, className?: string) => {
    return (
      Boolean(treeList.length) && treeList.map((item: any, index) => {
        const pActive = item.documentId == currentClickKey ? 'parent-active' : '';
        return (
          <div key={index + treeKey} className={className}>
            <div className={`custom-menu-box-title p-title flex ai-center jc-between ${pActive}`} onClick={(e) => itemClick(item, e)}>
              <div className="flex ai-center">
                {Boolean(item.children.length != 0) && (Boolean(collapsed[item.documentId]) ?
                    <CaretDownOutlined onClick={(e) => collapsedClick(item, e)} /> :
                    <CaretRightOutlined onClick={(e) => collapsedClick(item, e)} />) ||
                    <span className="occupyPosition"></span>}
                <FileTextFilled className="catalog-cion mlr-10" />
                <span className="ml-0">{item.title}</span>
              </div>
              {/*<div className="flex ai-center">{getHandleIcon(item)}</div>*/}
            </div>
            {item.children && item.children.length > 0 && Boolean(collapsed[item.documentId]) && getTreeDoc(item.children, 'pl-15')}
          </div>
        );
      }) || nodeData()
    );
  };
  
  const createFormTitle = {[SPACE_KEY]: '新建文档库', [DOCUMENT_KEY]: '新建文档'}[createModalType];
  const formOptions = {
    wrapperCol: {flex: 1},
    labelCol: {flex: '90px'},
    autoComplete: "off"
  };
  
  // @ts-ignore
  const itemsList: MenuProps['items'] = [].concat(items, spaceList.map((item: any) => {
    return {label: item.name, key: item.id, icon: (<FolderOutlined />)};
  }));
  
  return (
    <div className="menu-box wmax" key="menu-box">
      <Modal title='修改当前文档名' open={modalVisible.editname} onOk={editnameOk} onCancel={() => onCancel('editname')} okText='确认' cancelText='取消'>
        <Form form={form} name="validateOnlyName" {...formOptions}>
          <Form.Item name="title" label="文件名" rules={[{required: true, message: '请输入文件名!'}]}>
            <Input placeholder='请输入文件名' />
          </Form.Item>
        </Form>
      </Modal>
      
      {/*新建目录 文档 同一个弹窗*/}
      <Modal title={createFormTitle} open={modalVisible.createform} onOk={createFileOk} onCancel={() => onCancel('createform')} okText='确认' cancelText='取消'>
        <Form initialValues={{contentType: 'application/session-component'}} form={createform} name="validateOnly" {...formOptions}>
          <Form.Item name="title" label="文件名: " rules={[{required: true, message: '请输入文件名!'}]}>
            <Input placeholder='请输入文件名' />
          </Form.Item>
          
          {createModalType == DOCUMENT_KEY &&
              <Form.Item name="contentType" label="文档类型: ">
                <Radio.Group>
                  <Radio value={summaryCompontType.SESSION}>大纲编辑器</Radio>
                  <Radio value={summaryCompontType.BRAFT_EDITOR}>富文本</Radio>
                  <Radio value={summaryCompontType.FORTUNE_SHEET}>excel</Radio>
                </Radio.Group>
              </Form.Item>}
        </Form>
      </Modal>
      
      <div className="menu-box-container wmax">
        
        <div className="flex ai-center ptb-7 plr-10">
          <Dropdown menu={{items: itemsList, onClick: (val) => onChange(val)}}>
            <Button className="mr-10" icon={<HomeFilled />}></Button>
          </Dropdown>
          
          <div>
            <div className="name">{spaceItemInfo.name}</div>
            <div className="belonging fs-12" style={{color: '#7e8c8d'}}>北京易聊科技有限公司</div>
          </div>
        </div>
        
        <Divider style={{margin: '0'}} />
        
        <div className="tree-box  mt-10">
          <div className="custom-menu-box" key={`${treeKey}-${currentClickKey}`}>
            
            {treeKey && getTreeDoc(treeList)}
          </div>
        </div>
      </div>
    </div>
  );
}
