<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-17 14:46:17
 * @FilePath: /vue-shelf/src/components/go/goGraphObject.vue
-->
//  const companyInfo = {
//         projectId: 196949374176133120,
//         userId: 'renjingyang',
//         companyId: 1,
//       };
<template>
  <div class="hmax">
    组件
    <div id="diagram" class="bb-h100">
      <div id="chartDiagram" ref="efContainer" class="chart-diagram" />
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import go from '@/assets/plugins/go';
import { defineFigureGenerator, chartDiagram, linkTemplate } from './init';

let $ = void 0;
export default {
  name: '', // Pascal命名
  mixins: [],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  //这里存放数据
  data() {
    return {
      diagram: '',
      nodeTabSetting: {},
      dataModel: {},
      sideTabArr: [
        { id: '1', name: '默认提问' }, // 机器人提问
        { id: '2', name: '针对性提问' }, // 模块回复
        { id: '3', name: '超时回复' },
        { id: '4', name: '知识库' },
        { id: '5', name: '意图优先级' },
        { id: '7', name: '通用节点回复' },
        { id: '6', name: '模块设置' },
      ],
      flowInfoQuery: {},
      Driver: '',
      imgx_r: require('@/assets/img/talk/x_r.png'),
      emptyImg: require('@/assets/img/empty/7.png'),
      emptyText: '拖动模块进入画布即可新增',
      openImg: require('@/assets/img/talk/open.png'),
      packUpImg: require('@/assets/img/talk/packUp.png'),
      initImg: require('@/assets/img/talk/init.png'),
      endImg: require('@/assets/img/talk/end.png'),
      solicomSuccessImg: require('@/assets/img/talk/solicomSuccess.png'),
      artificialImg: require('@/assets/img/talk/artificial.png'),
      flowLoading: false,
      asideCollapse: false,
      animationTimer: null,
      isCollapse: false,
      filterModule: '',
      filterName: '',
      initModuleId: '', //初始化模块
      customList: [],
      isWidth: '210px',
      delDialog: {
        title: '',
        delLoading: false,
        isShow: false,
        text: '',
        lineObj: {},
      },
      trainingDialog: {
        type: '1',
        title: '试听提示',
        model: '',
        sendContent: '',
        ishow: false,
      },
      preview: {
        isShow: false,
        url: '',
      },

      flexLinkArr: [],
      flexNodeArr: [],
      cellSide: 1,
      replyDialog: {
        title: '',
        loading: false,
        isShow: false,
      },

      optionsList: [],

      // 画布
      diagram: '',

      objGo: '',

      menuList: [],
      // 所有数据
      dataModel: {
        modules: [],
        sequenceFlows: [],
      },
      //  // 当前父节点获取对应模块及所有子模块
      parentNode: {},
      // 连线
      parentNodeLine: {},
      // 当前子节点
      childNode: {},
      nodeTabSetting: {
        activeName: '1',
        activeTabs: [],
      },
      zoom: 100,
      restaurants: {
        ntag: [],
      },
      checkedNodeArr: [],
      checkedLineArr: [],
      // 项目
      project: {
        flag: true,
        list: [],
        row: {},
        loading: false,
        selectItem: 0,
        projectId: '',
        pComponents: 'robotIndex',
      },
      speakContent: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  created() {},
  beforeMount() {}, //生命周期 - 挂载之前
  mounted() {
    this.diagramInit();
  },
  methods: {
    // 画布设置
    diagramInit() {
      $ = go.GraphObject.make;
      // $ = go.GraphObject.make;
      // 圆角
      go.Shape.defineFigureGenerator('RoundedAngle', defineFigureGenerator);
      // 初始化流程
      chartDiagram.ChangedSelection = this.changedSelection;
      chartDiagram.layout = $(go.LayeredDigraphLayout, {
        isInitial: false,
        isOngoing: false,
        layerSpacing: 50,
      });
      this.diagram = $(go.Diagram, 'chartDiagram', chartDiagram);
      // 放大
      // $(go.Overview, "myOverviewDiv", {observed: this.diagram, contentAlignment: go.Spot.Center});
      // 箭头连线
      this.diagram.linkTemplate = linkTemplate($, this.linkType, this.dashed, this.delLinkCom);

      this.settingInit(this.userParam);
      // });
      // 监听连线
      this.diagram.addDiagramListener('LinkDrawn', (e) => {
        let linkData = e.subject.part.data;
        this.replyForm.locationId = e.subject.part.locationId;
        let nodeFrom = this.diagram.model.findNodeDataForKey(linkData.from); //获取当前from点模块的数据
        let nodeTo = this.diagram.model.findNodeDataForKey(linkData.to); //获取当前to点模块的数据

        let lineFrom = this.dataModel.sequenceFlows.map((item) => {
          if (linkData.from == item.from) {
            return item.from;
          }
        });
        let filterLine = lineFrom.filter((item) => {
          return item != undefined;
        });
        if (filterLine.length > 1) {
          return this.linkErr(linkData);
        }
        if (nodeTo.rules != '') {
          let ids = nodeTo.rules.map((item) => {
            return item.fatherId;
          });
          if (nodeFrom.fatherId != undefined && ids.indexOf(nodeFrom.fatherId) != -1) {
            return this.linkErr(linkData);
          }
        }
        this.$HttpRobot
          .ai6AiUserModuleOutModuleUpdate(
            {
              ...this.userParam,
              ruleId: nodeFrom.ruleId,
              outModuleId: nodeTo.key,
              moduleId: nodeFrom.fatherId,
              locationId: e.subject.part.data.locationId,
              projectId: this.initModuleId == nodeFrom.fatherId ? 0 : this.userParam.projectId,
            },
            true
          )
          .then((res) => {
            if (res.code != 0) {
              this.$message.error(res.msg);
              this.dataModel.sequenceFlows = this.dataModel.sequenceFlows.filter((tab) => tab.pointId !== linkData.pointId);
            } else {
              linkData.close = this.imgx_r;
              linkData.fatherId = nodeFrom.fatherId;
              linkData.outModuleId = nodeTo.key;
              linkData.pointId = nodeTo.key;
              linkData.routing = go.Link.AvoidsNodes;
              linkData.fromSpot = 'BottomCenter';
              linkData.toSpot = 'TopCenter';
              linkData.fromId = linkData.from;
              this.dataModel.sequenceFlows = [...this.dataModel.sequenceFlows, linkData];
            }
            this.dataModelFun(this.dataModel.modules, this.dataModel.sequenceFlows);
          });
      });
      this.diagram.addDiagramListener('TextEdited', (evt) => {
        this.$HttpRobot
          .ai6AiUserModuleUpdateName(
            {
              ...this.userParam,
              moduleId: evt.subject.part.data.key,
              name: document.querySelector('.goTXarea').value,
            },
            true
          )
          .then((res) => {
            return res;
          });
      });
      // 单点击画布
      this.diagram.addDiagramListener('BackgroundSingleClicked', (evt) => {
        this.diagram.clearHighlighteds();
      });
      // 双点击画布  BackgroundDoubleClicked
      this.diagram.addDiagramListener('BackgroundDoubleClicked', (e) => {
        this.diagram.requestUpdate();
      });
      this.diagram.addDiagramListener('ObjectDoubleClicked', (e) => {
        this.diagram.requestUpdate();
      });
      // 监听点击
      this.diagram.addDiagramListener('ObjectSingleClicked', (e) => {
        if (this.initModuleId == e.subject.part.data.fatherId || this.initModuleId == e.subject.part.data.key) {
          this.userParam.projectId = 0;
          this.textRobot.projectId = this.userParam.projectId;
        } else {
          this.userParam.projectId = this.textRobot.clickProjectId;
          this.textRobot.projectId = this.userParam.projectId;
        }
        this.$store.dispatch('setTextRobot', {
          ...this.textRobot,
        });
        this.diagram.requestUpdate();

        // if (e.subject.part.data.from) {
        //     this.parentNodeLine = e.subject.part.data;
        // } else {
        //     this.parentNode = e.subject.part.data;
        // }
      });
      // // 移动事件
      this.diagram.addDiagramListener('SelectionMoved', (e) => {
        // console.log(e.diagram.lastInput.documentPoint);
        // var can = document.querySelector("canvas")
        // can.style.outlineColor = "#ff1a52";
      });
    },
    // 虚线点击
    dashed(e, obj) {
      // 虚线点击
      if (obj.part.data.animation == 'animation') {
        this.asideCollapse = true;
        this.$refs.sideSetting.intentionFlag = false;

        this.$nextTick(() => {
          this.$refs.sideSetting.intentionFlag = true;
        });
        this.parentNode = obj.part.data;
        this.nodeTabSetting.activeName = '1';
        this.nodeTabSetting.activeTabs = [{ id: '1', name: '意图列表' }];
      }
    },
    // 操作设置
    settingInit(userParam) {
      this.nodeTabSetting.activeName = '1';
      this.dataModel.sequenceFlows = []; //初始化
      this.dataModel.modules = []; //初始化
      this.flowLoading = true;
      this.allFlowFun(userParam);
    },
    // 初始化全量接口
    async allFlowFun(userParam = this.userParam) {
      // const companyInfo = this.$store.getters.companyInfo || {};
      const companyInfo = {
        projectId: 196949374176133120,
        userId: 'renjingyang',
        companyId: 1,
      };
      let query = Object.assign({}, userParam, { ...companyInfo });
      this.asideCollapse = false;
      await this.$HttpFlowAdmin
        .getFlow(query)
        .then((res) => {
          this.dataModel.modules = res.data.modules != null && res.data.modules != '' ? res.data.modules : [];
          this.dataModel.sequenceFlows = res.data.sequenceFlows != null && res.data.sequenceFlows != '' ? res.data.sequenceFlows : [];
          if (this.dataModel.modules != null && this.dataModel.modules != '') {
            this.initModuleId = res.data.initModuleId;
            this.dataModel.modules = this.nodeArrFun(this.dataModel.modules, this.initModuleId); //处理拼装数据 意图
            this.dataModel.sequenceFlows = this.linkArrFun(this.dataModel.modules, this.dataModel.sequenceFlows); //所有的线
            // 所有模块
            Promise.all([
              this.moduleReset(), //画出来所有模块。
              this.getModuleList(), //左侧模板
              this.filterSequenceFlows(this.dataModel.sequenceFlows), //过滤模块连线类型
              this.dataModelFun(this.dataModel.modules, this.dataModel.sequenceFlows), //画布更新
            ]);
          }
        })
        .finally(() => {
          this.flowLoading = false;
        });
    },
    // 获取所有模板
    getModuleList(search) {
      const query = {
        projectId: 196949374176133120,
        userId: 'renjingyang',
        companyId: 1,
      };
      this.$HttpRobot.ai6AiBaseModuleList({ ...this.userParam, search: search, ...query }).then((res) => {
        this.menuList = res.data;
        if (this.menuList != null && this.menuList != '') {
          var data = [],
            flag = 0,
            list = this.menuList.map((item) => {
              if (item.moduleUiProperties == null) {
                item.moduleUiProperties = {};
                item.moduleUiProperties.categoryName = '未知模块';
                item.moduleUiProperties.icon = '#iconheibanjiqixunlian_jieshumokuai-19';
                item.moduleUiProperties.img = '';
              }
              return item;
            });
          // 所有数据归类计算
          var moduleUiPropertiesObj = {};
          for (var i = 0; i < list.length; i++) {
            var z = '';
            for (var j = 0; j < data.length; j++) {
              if (data[j].name == list[i].moduleUiProperties.categoryName) {
                flag = 1;
                z = j;
                break; //调出循环在list循环中添加对应数据
              }
            }
            if (flag == 1) {
              data[z].arr.push(list[i]);
              flag = 0;
            } else if (flag == 0) {
              moduleUiPropertiesObj = {};
              moduleUiPropertiesObj.name = list[i].moduleUiProperties.categoryName;
              moduleUiPropertiesObj.arr = new Array();
              moduleUiPropertiesObj.arr.push(list[i]);
              data.push(moduleUiPropertiesObj);
            }
          }
          // 整合数据
          data.map((item, index) => {
            item.arr.map((model) => {
              if (model.moduleUiProperties != null) {
                // 问需阶段
                if (model.moduleUiProperties.categoryName == '问需阶段') {
                  let icon = '#iconheibanjiqixunlian_liuchengmokuaisekuai';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 1;
                } else if (model.moduleUiProperties.categoryName == 'AI无应答') {
                  let icon = '#iconheibanjiqixunlian_liuchengmokuaisekuai';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 2;
                } else if (model.moduleUiProperties.categoryName == '索联阶段') {
                  let icon = '#iconheibanjiqixunlian_suolianmokuaisekuai';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 3;
                } else if (model.moduleUiProperties.categoryName == '索联成功') {
                  let icon = '#iconheibanjiqixunlian_suolianchenggongmokuai';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 4;
                } else if (model.moduleUiProperties.categoryName == '转接人工') {
                  let icon = '#iconheibanjiqixunlian_jiqirenzhuanrengongmokuai';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 5;
                } else if (model.moduleUiProperties.categoryName == '对话结束') {
                  let icon = '#iconheibanjiqixunlian_jieshumokuai-xiao';
                  model.moduleUiProperties.icon = icon;
                  item.sort = 6;
                }
              } else {
                let icon = '#iconheibanjiqixunlian_jieshumokuai-19';
                model.moduleUiProperties.icon = icon;
                item.sort = index + 7;
              }
            });
            return item;
          });
          // 排序归类
          this.menuList = data.sort(this.compare('sort'));
        }
      });
    },
    // 根据数组对象某个num字段排序
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    // 连线管理
    linkArrFun(node, link) {
      let ret = node.find((v) => {
        return v.key == this.initModuleId && v.moduleUiProperties != undefined;
      });
      let copyLink = [].concat(link);
      // 父子线
      let arr = [];
      for (var i = 0; i < node.length; i++) {
        var obj = {};
        if (node[i].fatherId != undefined) {
          obj.from = node[i].fatherId;
          obj.fromId = node[i].fatherId;
          obj.fatherId = node[i].fatherId;
          obj.to = node[i].key;
          obj.toId = node[i].key;
          arr.push(obj);
        }
      }
      let same = JSON.parse(JSON.stringify(this.same)).map((s) => {
        return s.id;
      });
      // 判断与pointId 相同线
      let linkY = copyLink
        .filter((item) => same.indexOf(item.pointId) > -1)
        .map((l) => {
          l.pid = l.fromId;
          l.pointId = l.pointId + 'r'; //相同id加标识
          l.fatherId = l.pid;
          l.from = l.pointId;
          l.fromId = l.pointId;
          l.flag = '0'; //区分子节点连线标识
          return l;
        });
      // 判断与pointId不相同线 // 开放版 other: 176735642498172423 // 非开放版 176735642498172416
      let linkN = copyLink
        .filter((item) => !(same.indexOf(item.pointId) > -1))
        .map((l) => {
          l.fatherId = l.fromId;
          l.from = l.pointId;
          l.fromId = l.pointId;
          l.flag = '0'; //区分子节点连线标识
          return l;
        })
        .filter((j) => {
          return j.fromId != j.toId;
        })
        .map((q) => {
          // 判断非开放版
          if (ret.id == q.fatherId && ret.moduleUiProperties.id == '176735642498172416') {
            q.from = q.fatherId;
            q.fromId = q.fatherId;
            q.flag = '0'; //区分子节点连线标识
          }
          return q;
        });
      let linkArr = [...linkY, ...linkN, ...arr].filter((item) => {
        return item.toId != '0';
      });
      return linkArr;
    },

    // 所有模块生成
    moduleReset() {
      this.dataModel.modules.forEach((modules) => {
        if (modules.uiCategory == 'customize' + modules.templateId) {
          this.modulePublic('customize' + modules.templateId, modules.moduleUiProperties);
        } else if (modules.uiCategory == 'solicomSuccess' + modules.templateId) {
          this.modulePublic('solicomSuccess' + modules.templateId, 'solicomSuccess');
        } else if (modules.uiCategory == 'customize' + modules.key) {
          this.ntentionModulePublic('customize' + modules.key);
        } else if (modules.uiCategory == 'initModule' + modules.templateId) {
          this.initModuleFun('initModule' + modules.templateId, modules.moduleUiProperties);
        } else if (modules.uiCategory == 'end' + modules.templateId) {
          this.modulePublic('end' + modules.templateId, 'end');
        }
        return modules;
      });
      this.initModuleFun('initModule');
    },

    // 模块公共方法  意图
    ntentionModulePublic(type) {
      return this.diagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Table',
          new go.Binding('location', 'upperLeft', this.gridPointParse).makeTwoWay(go.Point.stringify),
          { locationSpot: go.Spot.Center, portId: 'NODE', copyable: true, deletable: false },
          // this.toolTipFun(true),
          this.selectionFun('ntention'),
          this.isHighlightedClick('ntention'),
          this.selectModuleColor(),
          {
            contextMenu: this.partContextMenu('rule'),
          },
          this.enterAndLeave(),
          $(
            go.Panel,
            'Auto',
            this.isHighlightedFun('ntention'),
            $(
              go.Panel,
              'Horizontal',
              {
                margin: new go.Margin(5),
              },
              // this.toolTipFun(true),
              $(
                go.TextBlock,
                {
                  stroke: '#fff',
                },
                {
                  alignment: go.Spot.Center,
                  editable: false,
                  cursor: 'pointer',
                  font: '14px Microsoft YaHei',
                },
                new go.Binding('text', 'name'),
                new go.Binding('stroke', 'stroke'),
                new go.Binding('background', 'background')
              )
            )
          ),
          this.makePort('B', go.Spot.Bottom, go.Spot.BottomCenter, true, false, 1, 1),
          new go.Binding('maxLines', 1)
        )
      );
    },

    // 转人工和结束模块
    initModuleFun(type, moduleUiProperties) {
      return this.diagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Vertical',
          { selectionObjectName: 'BODY' },
          new go.Binding('location', 'upperLeft', this.gridPointParse).makeTwoWay(go.Point.stringify),
          { locationSpot: go.Spot.Center, portId: 'NODE', copyable: true, deletable: false },
          this.selectionFun(),
          this.isHighlightedClick(),
          this.selectModuleColor(),
          // type == 'initModule' ?this.selectModuleColor('initModule'):this.selectModuleColor(),
          type == 'initModule'
            ? ''
            : {
                contextMenu: this.partContextMenu(type),
              },
          $(
            go.Panel,
            'Auto',
            { name: 'BODY' },
            // this.enterAndLeave(),
            // this.isHighlightedFun(),
            type == 'initModule' ? this.isHighlightedFun('initModule') : this.isHighlightedFun(),
            type == 'initModule' ? '' : this.toolTipFun(true),
            $(
              go.Panel,
              'Horizontal',
              type == 'initModule'
                ? {
                    margin: new go.Margin(-4, -2, 3, -2),
                  }
                : {
                    margin: new go.Margin(5, 8),
                  },
              type == 'initModule'
                ? $(
                    go.Picture,
                    {
                      desiredSize: new go.Size(33, 33),
                    },
                    new go.Binding('source', 'initImg')
                  )
                : moduleUiProperties.categoryName == '转接人工'
                ? $(
                    go.Picture,
                    {
                      desiredSize: new go.Size(33, 33),
                    },
                    new go.Binding('source', 'artificialImg')
                  )
                : $(
                    go.Picture,
                    {
                      desiredSize: new go.Size(33, 33),
                    },
                    new go.Binding('source', 'endImg')
                  ),
              $(
                go.TextBlock,
                {
                  margin: new go.Margin(0, 0, 0, 8),
                  stroke: '#fff',
                },
                {
                  alignment: go.Spot.Left,
                  editable: false,
                  cursor: 'pointer',
                  font: '14px Microsoft YaHei',
                },
                new go.Binding('text', 'name'),
                new go.Binding('stroke', 'stroke'),
                new go.Binding('background', 'background')
              )
            ),
            type == 'initModule' ? '' : this.makePort('T', go.Spot.Top, go.Spot.TopCenter, false, true)
          )
        )
      );
    },
    // 主模块公共方法 和欢迎语开放版 开放版 other: 176735642498172423 非开放版 176735642498172416
    modulePublic(type, end) {
      return this.diagram.nodeTemplateMap.add(
        type,
        $(
          go.Node,
          'Vertical',
          {
            selectionObjectName: 'BODY',
          },
          new go.Binding('location', 'upperLeft', this.gridPointParse).makeTwoWay(go.Point.stringify),
          { locationSpot: go.Spot.Center, copyable: true, deletable: false },
          this.selectionFun(),
          this.isHighlightedClick(),
          this.selectModuleColor(),
          end.id == '176735642498172423'
            ? ''
            : {
                contextMenu: this.partContextMenu(type),
              },
          $(
            go.Panel,
            'Auto',
            { name: 'BODY' },
            // this.enterAndLeave(),
            end.id != '176735642498172423' ? this.toolTipFun(true) : '',
            // this.isHighlightedFun(),
            end.id == '176735642498172423' ? this.isHighlightedFun('initModule') : this.isHighlightedFun(),
            $(
              go.Panel,
              'Horizontal',
              end != 'end' && end != 'solicomSuccess' && end.id != '176735642498172423'
                ? {
                    margin: new go.Margin(10, 8),
                  }
                : end.id == '176735642498172423'
                ? {
                    margin: new go.Margin(-4, -2, 3, -2),
                  }
                : {
                    margin: new go.Margin(4, 8),
                  },
              end == 'solicomSuccess' || end.id == '176735642498172423'
                ? $(
                    go.Picture,
                    {
                      desiredSize: new go.Size(32, 32),
                      margin: new go.Margin(0, 8, 0, 0),
                    },
                    new go.Binding('source', 'solicomSuccessImg'),
                    new go.Binding('source', 'initImg')
                  )
                : '',
              end != 'end'
                ? $(
                    go.TextBlock,
                    {
                      stroke: '#fff',
                    },
                    {
                      alignment: go.Spot.Center,
                      editable: false,
                      cursor: 'pointer',
                      font: '14px Microsoft YaHei',
                    },
                    new go.Binding('text', 'name'),
                    new go.Binding('stroke', 'stroke'),
                    new go.Binding('background', 'background')
                  )
                : $(
                    go.Picture,
                    {
                      desiredSize: new go.Size(32, 32),
                    },
                    new go.Binding('source', 'endImg'),
                    new go.Binding('source', 'addImg')
                  ),
              end != 'end'
                ? $(
                    go.Picture,
                    {
                      toolTip: $(go.HTMLInfo, {
                        show: this.showToolTip,
                        hide: this.hideToolTip,
                      }),
                    },
                    {
                      alignment: go.Spot.Right,
                      width: 18,
                      height: 18,
                      cursor: 'pointer',
                      margin: new go.Margin(0, 0, 0, 10),
                      click: (e, obj) => {
                        this.labelList(); //标签接口
                        this.placeholderFun(); //名片动作
                        this.parentNode = obj.part.data;

                        this.asideCollapse = false;
                        // this.replyDialog.isShow = true;
                        this.intentionType = '新增';
                        this.currentNodeInfo = Object.assign({}, obj.part.data);
                        this.replyDialogIsShow = true; //------------------------------------------------------
                        this.replyDialog.title = '新增意图';
                        this.replyForm.type = 0;
                        if (this.replyForm.type == 0) {
                          this.$nextTick(() => {
                            this.resetModify(this.$refs.replyForm);
                          });
                        }
                        this.replyForm.custom.baseKeys = [
                          {
                            name: '',
                          },
                        ];
                        this.replyForm.updateActions.ntag.tagName = '';
                        this.replyForm.custom.ntag.tagName = '';
                        this.replyForm.custom.logical = 'OR';
                        this.replyForm.custom.keywords = [''];
                        this.replyForm.custom.actions = [];
                        this.replyForm.visitorColSelves = [
                          {
                            value: '',
                            name: '',
                            id: '',
                          },
                        ];
                        this.ruleList(obj.part.data);
                      },
                    },
                    new go.Binding('source', 'addImg')
                  )
                : $(
                    go.TextBlock,
                    {
                      margin: new go.Margin(0, 0, 0, 8),
                      stroke: '#fff',
                    },
                    {
                      alignment: go.Spot.Left,
                      editable: false,
                      cursor: 'pointer',
                      font: '14px Microsoft YaHei',
                    },
                    new go.Binding('text', 'name'),
                    new go.Binding('stroke', 'stroke'),
                    new go.Binding('background', 'background')
                  )
            ),
            end != 'end' ? this.makePort('T', go.Spot.Top, go.Spot.TopCenter, true, true) : this.makePort('T', go.Spot.Top, go.Spot.TopCenter, false, true)
          ),
          end != 'end'
            ? $(
                go.Picture,
                {
                  desiredSize: new go.Size(23, 23),
                  cursor: 'pointer',
                },
                new go.Binding('source', 'openImg'),
                {
                  click: (e, t) => {
                    this.asideCollapse = false;
                    this.flexLinkArr = [];
                    if (t.source == this.openImg) {
                      t.source = this.packUpImg;
                      this.dataModel.modules = this.dataModel.modules.filter((item) => {
                        if (t.part.data.key == item.key) {
                          item.openImg = this.packUpImg;
                          this.flexNodeArr.push(...item.rules);
                        }
                        return t.part.data.key != item.fatherId;
                      });
                      this.dataModel.sequenceFlows.map((link) => {
                        if (t.part.data.key == link.fatherId || t.part.data.key == link.pid) {
                          this.flexLinkArr.push(link);
                          link.from = t.part.data.key;
                          link.close = '';
                        }
                        t.part.data.rules.map((rules) => {
                          if (link.from == rules.key) {
                            this.flexLinkArr.push(link);
                          }
                        });
                        return link;
                      });
                      this.dataModelFun(this.dataModel.modules, this.dataModel.sequenceFlows);
                    } else {
                      t.source = this.openImg;
                      this.openRulesFun(t.part.data);
                    }
                  },
                  doubleClick: () => {
                    this.asideCollapse = false;
                  },
                }
              )
            : ''
        )
      );
    },

    // 单击和双击模块
    isHighlightedClick(ntention) {
      return {
        doubleClick: (e, node) => {
          this.diagram.requestUpdate();
          if (ntention === 'ntention') {
            this.replyFormUpdate.actions = [];
            this.replyFormUpdate.ntag.tagName = '';
            this.replyFormUpdate.ntag.tagId = '';
            this.asideCollapse = false;
            this.replyFormUpdate.type = '';
            this.rlueClick(node);
            // this.replyDialogUpdate.loading = true;
            // this.replyDialogUpdate.title = '意图';
            // this.replyDialogUpdate.isShow = true;
            this.currentNodeInfo = Object.assign({}, node.data);
            this.replyDialogIsShow = true; // -----------------------------------------
            this.intentionType = '编辑';
            this.labelList(); //标签接口
            this.placeholderFun(); //名片动作
            this.ruleList(node.data);
          } else {
            this.replyForm.custom.actions = [];
            this.replyForm.updateActions.actions = [];
            this.asideCollapse = false;
            this.$nextTick(() => {
              this.asideCollapse = true;
              this.sideSettingKey = uuid();
              this.nodeTabSetting.activeName = '1';
            });
            // 单击防止请求多次接口
            this.v_Result = true;
            if (this.v_Result) {
              this.loadEle(node);
            }
          }
        },
        click: (e, node) => {
          this.highlightFun(node);
          this.diagram.requestUpdate();
          if (ntention === 'ntention') {
            this.asideCollapse = false;
          } else {
            if (this.asideCollapse == true) {
              this.asideCollapse = true;
            } else {
              this.asideCollapse = false;
            }
            // 单击防止请求多次接口
            this.v_Result = false;
            clearTimeout(this.clicktimer);
            this.clicktimer = setTimeout(() => {
              if (this.v_Result != false) return;
              this.loadEle(node);
            }, 500);
          }
        },
      };
    },

    // 右点击每个模块
    partContextMenu(normal) {
      return $(
        'ContextMenu',
        this.makeButton(
          '删 除',
          () => {
            if (normal != 'rule') {
              this.delModule();
            } else {
              this.delDialog.title = '意图';
              this.delDialog.startFlag = true;
              this.asideCollapse = false;
              this.delDialog.isShow = true;
              this.delDialog.text = '此操作将删除当前意图,删除后不可恢复, 是否继续?';
            }
          },
          (o) => {
            return o.diagram.commandHandler.canDeleteSelection();
          }
        )
      );
    },
    nodeArrFun(nodeArr, initModuleId) {
      // 复制原始数据
      this.copyNodeArr = [].concat(nodeArr);
      let arr = [];
      this.copyNodeArr.map((n) => {
        //模块样式
        this.nodeCom(n, n.templateId, initModuleId);
        // 判断意图是否为空
        if (n.rules != '' && n.rules != undefined) {
          n.rules.map((r, i) => {
            r.fatherId = n.id;
            r.fatherName = n.name;
            r.name = r.ruleName;
            r.templateId = n.templateId;
            r.id = r.ruleId;
            r.key = r.ruleId;
            r.uiCategory = 'customize' + r.key; //后台返回类型
            r.category = 'customize' + r.key; //前端用的类型
            if (r.bound != undefined && r.bound != null && r.bound.upperLeft != null) {
              r.upperLeft = r.bound.upperLeft;
            } else {
              var x = Number(i + '00') + 355;
              var y = Number(445);
              r.upperLeft = x + ' ' + y;
            }
            return r;
          });
          // 非开放版 176735642498172416
          // 开放版 other: 176735642498172423
          if (initModuleId != n.id || (initModuleId == n.id && n.moduleUiProperties.id == '176735642498172423')) {
            arr.push(...n.rules);
          }
        }
        n.key = n.id;
        n.category = n.uiCategory;
        return n;
      });
      // 复制原始数据处理id数组
      let tempArray = JSON.parse(JSON.stringify(this.copyNodeArr)).map((item) => {
        return item.id;
      });
      // 不相同意图
      this.nosame = arr.filter((item) => !(tempArray.indexOf(item.id) > -1));
      // 相同意图
      this.same = arr
        .filter((item) => tempArray.indexOf(item.id) > -1)
        .map((r) => {
          r.key = r.id + 'r';
          r.flag = '0';
          r.ruleId = r.id;
          r.uiCategory = 'customize' + r.key; //后台返回类型
          r.category = 'customize' + r.key; //前端用的类型
          return r;
        });
      // 合并三个数组
      let nodeList = [...this.copyNodeArr, ...this.nosame, ...this.same];
      return nodeList;
    },
    // 右点击线
    linkType() {
      return $(
        'ContextMenu',
        this.makeButton(
          '删除连线',
          (o, obj) => {
            if (obj.part.data.close != '') {
              this.delLinkCom(obj.part.data);
            } else {
              this.$message.warning('此线不可删除。');
            }
          },
          (o) => {
            return o.diagram.commandHandler.canDeleteSelection();
          }
        )
      );
    },

    // 删除连线
    delLinkCom(data) {
      this.delDialog.lineObj = data;
      this.asideCollapse = false;
      if (this.delDialog.lineObj.pointId != undefined && this.delDialog.lineObj.close != '') {
        this.delDialog.title = '连线';
        this.delDialog.isShow = true;
        this.delDialog.startFlag = true;
        this.delDialog.text = '此操作将删除当前模块,删除后不可恢复, 是否继续?';
      }
    },
    // 线的类型  绕线  曲线
    linkFun(line, routing) {
      line.routing = routing;
      line.fromSpot = 'BottomCenter';
      line.toSpot = 'TopCenter';
    },
    // 高亮
    highlightFun(node) {
      var diagram = node.diagram;
      diagram.startTransaction('highlight');
      diagram.clearHighlighteds();
      node.findLinksOutOf().each((l) => {
        l.isHighlighted = true;
      });
      node.findNodesOutOf().each((n) => {
        n.isHighlighted = true;
      });
      diagram.commitTransaction('highlight');
    },
    // 右点击
    makeButton(text, action, visiblePredicate) {
      return $(
        'ContextMenuButton',
        $(go.TextBlock, text, {
          margin: 4,
          stroke: '#409EFF',
        }),
        { click: action },
        visiblePredicate
          ? new go.Binding('visible', '', function (o, e) {
              return o.diagram ? visiblePredicate(o, e) : false;
            }).ofObject()
          : {}
      );
    },
    // 进入和离开模块模块样式
    enterAndLeave() {
      return {
        mouseEnter: (e, t) => {
          let port = t.part.findObject('PORT');
          if (port != null) {
            port.fill = '#fff';
          }
          t.background = 'rgba(39,154,242,0.2)';
        },
        mouseLeave: (e, t) => {
          let port = t.part.findObject('PORT');
          if (port != null) {
            port.fill = 'transparent';
          }
          t.background = 'transparent';
        },
      };
    },
    // 模块和连线高亮
    isHighlightedFun(ntention) {
      return $(
        go.Shape,
        ntention == 'initModule'
          ? {
              figure: 'RoundedAngle',
              parameter1: 250,
            }
          : 'RoundedRectangle',
        // "RoundedRectangle",
        ntention !== 'ntention'
          ? new go.Binding('fill', 'fill')
          : {
              fill: '#3B3B3B',
            },
        new go.Binding('stroke', 'isHighlighted', (h) => {
          return h ? '#fff' : 'transparent';
        }).ofObject(),
        new go.Binding('strokeWidth', 'isHighlighted', (h) => {
          return h ? 3 : 2.5;
        }).ofObject()
      );
    },
    // 刷新画布
    dataModelFun(modules, sequenceFlows) {
      let myModel = $(go.GraphLinksModel, {
        // copiesArrays: true,
        // copiesArrayObjects: true,
        linkFromPortIdProperty: 'pointId',
        linkToPortIdProperty: 'locationId',
        nodeDataArray: modules,
        linkDataArray: sequenceFlows,
      });
      this.diagram.model = myModel;
      // this.animationFun();
      // 取消Ctrl+Z Ctrl+A/Y，Del/Backspace删除键的命令关联:
      this.diagram.commandHandler.doKeyDown = () => {
        var e = this.diagram.lastInput;
        var control = e.control || e.meta;
        var key = e.key;
        if (control && (key === 'Z' || key === 'Y' || key === 'A')) return;
        if (key === 'Del' || key === 'Backspace') return;
        go.CommandHandler.prototype.doKeyDown.call(this);
      };
    },
    //选中每个模块事件
    changedSelection(e) {
      this.clearHighlightedsFun(e);
      e.diagram.selection.each((nodeOrLink) => {
        if (nodeOrLink instanceof go.Node) {
          //选择节点
          this.parentNode = nodeOrLink.data;
          this.nodeTabSetting.activeName = '1';
          if (this.parentNode.tabUiProperties != undefined) {
            this.nodeTabSetting.activeTabs = this.parentNode.tabUiProperties;
          }
        }
      });
    },
    // 取消自动布局
    cancelAutoLayout() {
      return $(go.LayeredDigraphLayout, {
        isInitial: false,
        isOngoing: false,
        layerSpacing: 50,
      });
    },
    //节点连接线
    makePort(name, align, spot, output, input, fromMaxLinks, toMaxLinks) {
      var horizontal = align.equals(go.Spot.TopSide) || align.equals(go.Spot.BottomSide);
      return $(go.Shape, 'Circle', {
        fill: 'transparent', // 默认透明
        strokeWidth: 0, // 无边框
        name: 'PORT',
        fromMaxLinks: fromMaxLinks, //最大连接数
        toMaxLinks: toMaxLinks, //最大连接数
        // fromShortLength: fromShortLength,
        width: 11, // 垂直"port"则8像素宽
        height: 11, // 水平"port"则8像素
        alignment: align, // 同其模块对齐
        stretch: horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical, //自动同其模块一同伸缩
        portId: name, // 声明ID
        fromSpot: spot, // 声明连线头连出此"port"的位置
        fromLinkable: output, // 布尔型，是否允许连线从此"port"连出
        toLinkable: input, // 布尔型，是否允许连线从此"port"连出
        toSpot: spot, // 声明连线尾连入此"port"的位置
        cursor: 'pointer', // 鼠标由指针改为手指，表示此处可点击生成连线
        // mouseEnter: (e, port) => {  //鼠标移到"port"位置后，高亮
        //     if (!e.diagram.isReadOnly) {
        //         port.fill = "#fff";
        //         // port.background = "rgba(255,0,255,0.3)";
        //     }
        // },
        // mouseLeave: (e, port) => {// 鼠标移出"port"位置后，透明
        //     port.fill = "transparent";
        //     // port.background = "transparent";
        // }
      });
    },
    // 选中节点
    selectNode(key) {
      var newdata = this.diagram.model.findNodeDataForKey(key);
      var node = this.diagram.findNodeForData(newdata);
      this.diagram.select(node); //选中节点
    },
    // 选中模块颜色
    selectModuleColor() {
      return {
        selectionAdornmentTemplate: $(
          go.Adornment,
          'Auto',
          $(
            go.Shape,
            // initModule=="initModule"?{ figure:"RoundedAngle",parameter1: 250,fill: null, stroke: "#fff", strokeWidth: 3,
            //           margin: new go.Margin(19, 14, 0,14),
            //       }:
            'RoundedRectangle',
            { fill: null, stroke: '#fff', strokeWidth: 3 },
            new go.Binding('stroke', 'color')
          ),
          $(go.Placeholder)
        ),
      };
    },
    // 悬浮展示删除模块按钮
    toolTipFun(flag) {
      return {
        toolTip: $(go.Adornment, 'Spot', { background: 'transparent' }, $(go.Placeholder, flag ? { padding: 10 } : { padding: 8 }), this.moduleClose(flag)),
      };
    },
    // 定位点
    gridPointParse(point) {
      if (!(point instanceof go.Point)) {
        point = go.Point.parse(point);
      }
      if (point.x != 0 && point.y != 0) {
        point.s = true;
        point.setTo(point.x, point.y);
        return point;
      }
    },
    // 选中模块时 连线高亮
    selectionFun(ntention) {
      return {
        selectionChanged: (node) => {
          // this.clearHighlightedsFun(node);
          if (node.isSelected) {
            this.parentNode = node.data;
            //获取节点关联的线
            node.findLinksConnected().each((link) => {
              link.isSelected = true;
            });
          } else {
            //没选中
            node.findLinksConnected().each((link) => {
              link.isSelected = false;
            });
          }
          if (ntention == 'ntention') {
            this.asideCollapse = false;
          }
        },
      };
    },
    // 清理选中
    clearHighlightedsFun(e) {
      e.diagram.commit((d) => {
        d.clearHighlighteds();
      }, 'no highlighteds');
      this.diagram.requestUpdate();
    },
    // 线的悬浮离开展示删除图标
    lineEnterAndLeave() {
      return {
        click: (e, t) => {
          let linkClose = t.part.findObject('linkClose');
          linkClose.opacity = 1;
        },
        mouseEnter: (e, t) => {
          let linkClose = t.part.findObject('linkClose');
          linkClose.opacity = 1;
        },
        mouseLeave: (e, t) => {
          let linkClose = t.part.findObject('linkClose');
          linkClose.opacity = 0;
        },
      };
    },
    //模块的悬浮离开展示删除图标
    delEnterAndLeave() {
      return {
        mouseEnter: (e, t) => {
          if (t.element != null) {
            t.source = this.imgx_h;
          }
        },
        mouseLeave: (e, t) => {
          if (t.element != null) {
            t.source = this.imgx_r;
          }
        },
      };
    },
    // 过滤模块连线
    filterSequenceFlows(lineList) {
      lineList.map((line) => {
        line.from = line.fromId;
        line.to = line.toId;
        if (line.flag == '0') {
          line.close = this.imgx_r;
          this.linkFun(line, go.Link.AvoidsNodes);
        } else {
          line.close = '';
          this.linkFun(line, go.Link.Bezier);
        }
        return line;
      });
      return lineList;
    },
    // 去除多维数组
    arrCat(arr) {
      return arr.reduce((p, c) => p.concat(Array.isArray(c) ? this.arrCat(c) : c), []);
    },
    // 悬浮展示添加意图
    showToolTip(obj, diagram) {
      let toolTipDIV = document.getElementById('toolTipDIV');
      var pt = diagram.lastInput.viewPoint;
      toolTipDIV.style.left = pt.x - 35 + 'px';
      toolTipDIV.style.top = pt.y - 8 + 'px';
      toolTipDIV.style.display = 'block';
    },
    hideToolTip() {
      let toolTipDIV = document.getElementById('toolTipDIV');
      toolTipDIV.style.display = 'none';
    },
    // 删除模块方法
    moduleClose(flag) {
      return $(
        'Button',
        {
          alignment: go.Spot.TopRight,
          alignmentFocus: go.Spot.TopRight,
          width: 20,
          height: 20,
          'ButtonBorder.figure': 'Circle',
          'ButtonBorder.stroke': 'transparent',
          'ButtonBorder.fill': 'transparent',
          'ButtonBorder.strokeWidth': 0,
          mouseEnter: (e, t) => {
            t.source = this.imgx_h;
          },
          mouseLeave: (e, t) => {
            t.source = this.imgx_r;
          },
        },
        $(go.Picture, this.imgx_r, {
          width: 15,
          height: 15,
          mouseEnter: (e, t) => {
            t.source = this.imgx_h;
          },
          mouseLeave: (e, t) => {
            t.source = this.imgx_r;
            t.fill = 'transparent';
          },
        }),
        flag
          ? {
              click: (e, obj) => {
                this.parentNode = obj.part.data;
                this.delModule();
              },
            }
          : {
              //这种方法有个bug
              click: () => {
                this.delDialog.title = '意图';
                this.delDialog.startFlag = true;
                this.delDialog.isShow = true;
                this.delDialog.text = '此操作将删除当前意图,删除后不可恢复, 是否继续?';
              },
            }
      );
    },

    // 判断节点字段是否为空 为空就增加默认值
    nodeCom(item, id, initModuleId) {
      if (item.id == initModuleId) {
        item.fill = '#3B3B3B';
        item.initImg = item.moduleUiProperties.img == '' ? this.initImg : item.moduleUiProperties.img;
        if (item.moduleUiProperties.id == '176735642498172423') {
          if (item.rules != '') {
            item.openImg = this.openImg;
          } else {
            item.openImg = '';
          }
          item.addImg = this.addImg;
          item.uiCategory = 'customize' + id;
          item.tabUiProperties != '' && item.tabUiProperties != null ? item.tabUiProperties : (item.tabUiProperties = this.sideTabArr);
        } else {
          item.openImg = '';
          item.uiCategory = 'initModule';
          item.tabUiProperties != '' && item.tabUiProperties != null
            ? item.tabUiProperties
            : (item.tabUiProperties = this.sideTabArr.filter((item) => {
                return item.id == '1' || item.id == '3';
              }));
        }
      } else {
        // if (item.moduleUiProperties != null && (item.moduleUiProperties.categoryName == '转接人工' || item.moduleUiProperties.categoryName == '对话结束')) {
        if (item.moduleUiProperties != null && (item.moduleUiProperties.categoryName == '转接人工' || item.moduleUiProperties.categoryName == '对话结束')) {
          if (item.moduleUiProperties.categoryName == '转接人工') {
            item.artificialImg = item.moduleUiProperties.img == '' ? this.artificialImg : item.moduleUiProperties.img;
            item.uiCategory = 'initModule' + id;
            item.tabUiProperties != '' && item.tabUiProperties != null
              ? item.tabUiProperties
              : (item.tabUiProperties = [{ id: '1', name: '转接人工客服分组' }]);
          } else {
            item.endImg = item.moduleUiProperties.img == '' ? this.endImg : item.moduleUiProperties.img;
            item.uiCategory = 'end' + id;
            item.tabUiProperties = item.tabUiProperties ? item.tabUiProperties : this.sideTabArr;
          }
          item.fill = '#3B3B3B';
        } else {
          if (item.rules != '') {
            item.openImg = this.openImg;
          } else {
            item.openImg = '';
          }
          if (item.moduleUiProperties != null && item.moduleUiProperties.categoryName == '索联成功') {
            item.solicomSuccessImg = item.moduleUiProperties.img == '' ? this.solicomSuccessImg : item.moduleUiProperties.img;
            item.uiCategory = 'solicomSuccess' + id;
          } else {
            item.uiCategory = 'customize' + id;
          }
          item.addImg = this.addImg;
          item.fill = item.moduleUiProperties != null ? item.moduleUiProperties.color : '';
          item.tabUiProperties != '' && item.tabUiProperties != null ? item.tabUiProperties : (item.tabUiProperties = this.sideTabArr);
        }
      }
      if (item.bound != null && item.bound.upperLeft != null) {
        item.upperLeft = item.bound.upperLeft;
      } else {
        item.upperLeft = '550 50';
      }
      return item;
    },
  },

  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#diagram {
  width: 100%;
  height: 100%;
}

.chart-diagram,
#chartDiagram {
  width: 100%;
  height: 100%;
  position: relative;
  //background-color: #000000;
  //border: solid 1px #000000;
  border-radius: 4px;
}

::v-deep canvas {
  outline-color: #000;
  background: #000;
  height: 100%;
}
</style>