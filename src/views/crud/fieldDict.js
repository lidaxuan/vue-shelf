// 本地字典表：常用字段配置（对象结构，查找效率 O(1)）
export const fieldDict = {
  // 通用字段
  id: { label: 'ID', type: 'input', search: false, width: 80, sortable: true },
  name: { label: '名称', type: 'input', search: true, width: 200 },
  remark: { label: '备注', type: 'input', search: false, minWidth: 200 },
  // 用户相关
  userName: { label: '用户名', type: 'input', search: true, width: 150 },
  realName: { label: '真实姓名', type: 'input', search: true, width: 150 },
  email: { label: '邮箱', type: 'input', search: true, width: 200 },
  phone: { label: '手机号', type: 'input', search: true, width: 150 },
  avatar: { label: '头像', type: 'input', search: false, width: 100 },
  // 状态相关
  status: { label: '状态', type: 'select', search: true, width: 100, options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }] },
  gender: { label: '性别', type: 'select', search: false, width: 80, options: [{ label: '男', value: 1 }, { label: '女', value: 0 }] },
  orderStatus: { label: '订单状态', type: 'select', search: true, width: 120, options: [{ label: '待支付', value: 0 }, { label: '已支付', value: 1 }, { label: '已发货', value: 2 }, { label: '已完成', value: 3 }] },
  payStatus: { label: '支付状态', type: 'select', search: true, width: 120, options: [{ label: '未支付', value: 0 }, { label: '已支付', value: 1 }, { label: '已退款', value: 2 }] },
  // 时间相关
  createTime: { label: '创建时间', type: 'date', search: true, width: 180, valueFormat: 'yyyy-MM-dd HH:mm:ss' },
  updateTime: { label: '更新时间', type: 'date', search: false, width: 180, valueFormat: 'yyyy-MM-dd HH:mm:ss' },
  startTime: { label: '开始时间', type: 'date', search: true, width: 160, valueFormat: 'yyyy-MM-dd' },
  endTime: { label: '结束时间', type: 'date', search: true, width: 160, valueFormat: 'yyyy-MM-dd' },
  // 金额相关
  amount: { label: '金额', type: 'input', search: false, width: 120, align: 'right' },
  price: { label: '单价', type: 'input', search: false, width: 100, align: 'right' },
  totalPrice: { label: '总价', type: 'input', search: false, width: 120, align: 'right' },
  balance: { label: '余额', type: 'input', search: false, width: 120, align: 'right' },
  // 数量相关
  stock: { label: '库存', type: 'input', search: false, width: 100, align: 'center' },
  salesCount: { label: '销量', type: 'input', search: false, width: 100, align: 'center' },
  viewCount: { label: '浏览量', type: 'input', search: false, width: 100, align: 'center' },
  // 业务字段
  orderNo: { label: '订单号', type: 'input', search: true, width: 180 },
  channelName: { label: '渠道名称', type: 'input', search: true, width: 150 },
  category: { label: '分类', type: 'input', search: true, width: 120 },
  address: { label: '地址', type: 'input', search: false, minWidth: 250 },
  ip: { label: 'IP地址', type: 'input', search: false, width: 150 },
  url: { label: '链接', type: 'input', search: false, minWidth: 250 },
  version: { label: '版本号', type: 'input', search: false, width: 100 }
}

export default fieldDict
