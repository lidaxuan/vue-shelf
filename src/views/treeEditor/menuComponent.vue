<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2023-12-01 18:28:20
 * @FilePath: /vue-shelf/src/views/treeEditor/menuComponent.vue
 * @LastEditors: 李大玄
 * @LastEditTime: 2023-12-01 18:33:47
-->
<template>
  <div class="menu-box wmax" key="menu-box">
    <!-- <el-dialog title='修改当前文档名' open={modalVisible.editname} onOk={editnameOk} onCancel={() => onCancel('editname')} okText='确认' cancelText='取消'>
        <Form form={form} name="validateOnlyName" {...formOptions}>
          <Form.Item name="title" label="文件名" rules={[{required: true, message: '请输入文件名!'}]}>
            <Input placeholder='请输入文件名' />
          </Form.Item>
        </Form>
      </el-dialog> -->

    <!-- {/*新建目录 文档 同一个弹窗*/} -->
    <!-- <el-dialog title={createFormTitle} open={modalVisible.createform} onOk={createFileOk} onCancel={() => onCancel('createform')} okText='确认' cancelText='取消'>
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
      </el-dialog> -->

    <!-- <div class="menu-box-container wmax">
        
        <div class="flex ai-center ptb-7 plr-10">
          <Dropdown menu={{items: itemsList, onClick: (val) => onChange(val)}}>
            <Button class="mr-10" icon={<HomeFilled />}></Button>
          </Dropdown>
          
          <div>
            <div class="name">{{ spaceItemInfo.name }}</div>
            <div class="belonging fs-12" style="color: #7e8c8d">北京易聊科技有限公司</div>
          </div>
        </div>
        
        <Divider style="margin: 0" />
        
        <div class="tree-box  mt-10">
          <div class="custom-menu-box" key={`${treeKey}-${currentClickKey}`}>
            
            {treeKey && getTreeDoc(treeList)}
          </div>
        </div>
      </div> -->
  </div>
</template>

<script>
export default {
  name: "", // Pascal命名
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      spaceItemInfo: {}
    };
  },
  computed: {},
  watch: {
    // temObj: {
    //   handler(newVal, oldVal) {},
    //   deep: true, // 深度
    //   immediate: true, // 立即执行
    // },
  },
  beforeCreate() {},
  created() {
    // .$emit
    this.getSpaceList((list) => {
      selectSpaceFirst(list);
      setTreeKey(v4());
    });
  },
  beforeMount() {},
  mounted() {},
  methods: {
    async getSpaceList(cb) {
      const catalogRes = await apiMap.default.fetch.spaceList();
      if (catalogRes.code) {
        message.error(catalogRes.msg);
        return;
      }
      const list = [].concat(catalogRes?.data || []);
      setSpaceList(list);
      cb(list);
    }
  },
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.menu-box {
  height: 100%;
  background: rgba(244, 244, 245, 0.5);

  .menu-box-container {
    height: 100%;

    .menu-search {
      width: 224px;
      flex: 1 1 0%;
      margin-right: 10px;
    }

    .creat-doc-icon {
      font-size: 16px;
      color: #fff;
      background: #6359ca;
      border-radius: 50%;
      padding: 5px;
    }

    .tree-box {
      height: calc(100% - 63px);
      overflow-y: auto;
      /*.SWeFi {
        height: 40px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid rgba( 31,35,41 ,0.15);
        & > * {
          cursor: pointer;
          font-size: 18px;
        }
      }*/
    }

    .custom-menu-box {
      height: calc(100% - 0px);
      overflow-y: auto;
      padding: 0 6px 0 0;

      .custom-menu-box-title {
        margin-bottom: 4px;
        font-size: 14px;
        border-radius: 8px;
        cursor: pointer;
        color: #344563;

        .occupyPosition {
          display: inline-block;
          width: 14px;
          height: 14px;
        }

        .tree-btn {
          display: none;
        }

        &:hover .tree-btn {
          display: inline-block;
        }
      }

      .mr-10 {
        margin-right: 10px;
      }

      .p-title {
        padding: 10px 16px;

        .catalog-cion {
          color: #7e84a3;
        }

        &:hover {
          color: rgb(88, 86, 213);
          background: rgb(222, 221, 247);
          transition: background 0.1s ease-in-out 0s, color 0.1s ease-in-out 0s;

          .catalog-cion {
            color: #6359ca;
          }
        }
      }

      .parent-active {
        background: #e3e2f6;
        color: #6359ca;

        .catalog-cion {
          color: #6359ca;
        }
      }

      .c-title {
        padding: 10px 16px 10px 42px;

        .doc-icon {
          color: #c3c8df;
        }

        &:hover:not(.child-active) {
          color: rgb(88, 86, 213);
          background: rgb(222, 221, 247);
          transition: background 0.1s ease-in-out 0s, color 0.1s ease-in-out 0s;

          .doc-icon {
            color: #6359ca;
          }
        }
      }

      .child-active {
        background: #6359ca;
        color: #fff;

        .doc-icon {
          color: #fff;
        }
      }

      .child-box {
        transition: all 0.8s;
      }
    }

    .no-data {
      margin-top: 100px;
      font-size: 16px;
    }
  }
}
</style>
