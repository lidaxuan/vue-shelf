<!--
 * @Description: 
 * @Author: 李大玄
 * @Date: 2021-08-17 14:46:17
 * @FilePath: /vue-shelf/src/components/go/goGraphObject.vue
-->
<template>
  <div class="">
    组件
    <div id="diagram" class="bb-h100">
      <div id="chartDiagram" ref="efContainer" class="chart-diagram" />
    </div>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
import go from '@/assets/plugins/go';
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
      // 圆角
      go.Shape.defineFigureGenerator('RoundedAngle', function (shape, w, h) {
        var p1 = 10;
        if (shape !== null) {
          var param1 = shape.parameter1;
          if (!isNaN(param1) && param1 >= 0) p1 = param1; // can't be negative or NaN
        }
        p1 = Math.min(p1, w / 2);
        p1 = Math.min(p1, h / 2);
        var geo = new go.Geometry();
        geo.add(
          new go.PathFigure(0, p1)
            .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Line, w - p1, 0))
            .add(new go.PathSegment(go.PathSegment.Arc, 270, 90, w - p1, p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Arc, 0, 90, w - p1, h - p1, p1, p1))
            .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close())
        );
        // don't intersect with two top corners when used in an "Auto" Panel
        geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0.3 * p1);
        geo.spot2 = new go.Spot(1, 1, -0.3 * p1, 0);
        return geo;
      });
      // 初始化流程
      this.diagram = $(go.Diagram, 'chartDiagram', {
        scale: 1.0,
        // initialDocumentSpot: go.Spot.Center,
        // initialViewportSpot: go.Spot.Center,
        // allowZoom: !1,
        // allowLink: !0,
        'draggingTool.dragsLink': false, //拖动线
        // initialContentAlignment: go.Spot.TopCenter, // 居中显示
        // "undoManager.isEnabled": true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
        'toolManager.hoverDelay': 100, //tooltip提示显示延时
        // "toolManager.toolTipDuration": 10000, //tooltip持续显示时间
        // isReadOnly:true,//只读
        // allowZoom: true,//画布是否可以缩放
        'grid.visible': false, //显示网格
        allowMove: true, //允许拖动
        // allowDragOut:true,
        allowDelete: true,
        'animationManager.duration': 100, //画布刷新的加载速度
        //允许使用delete键删除模块
        'commandHandler.deletesTree': false,
        // 复制
        allowCopy: false,
        // "animationManager.initialAnimationStyle":go.Animation.EaseOutExpo,
        // "animationManager.initialAnimationStyle": go.Animation.EaseInOutQuad,
        'animationManager.initialAnimationStyle': go.AnimationManager.None,
        // "animationManager.initialAnimationStyle":go.AnimationManager.AnimateLocations,
        hasHorizontalScrollbar: false, //去除水平滚动条
        hasVerticalScrollbar: false, //去除竖直滚动条
        // "canStart":false,
        // allowClipboard: true,

        ChangedSelection: this.changedSelection,
        // "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom, //有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
        // layout: $(go.TreeLayout, {
        //     treeStyle: go.TreeLayout.LayerUniform,
        //     alignment: go.TreeLayout.AlignmentCenterChildren,
        //     angle: 90,
        //     layerSpacing: 80,
        //     alternateAngle: 0,
        //     alternateNodeIndent: 60,
        //     alternateNodeIndentPastParent: 1,
        //     alternateNodeSpacing: 60,
        //     alternateLayerSpacing: 60,
        //     alternateLayerSpacingParentOverlap: 1,
        //     alternatePortSpot: new go.Spot(.001,1,20,0),
        //     alternateChildPortSpot: go.Spot.Top
        // }),
        // layout:
        //       $(go.TreeLayout,
        //             {angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal}),
        // layout:
        //       $(go.TreeLayout,
        //             {angle: 90, arrangement: go.TreeLayout.ArrangementFixedRoots}),
        // layout:
        //       $(go.TreeLayout,
        //             {	angle: 90,
        //                 compaction:  go.TreeLayout.LayerUniform}),
        // layout:
        //       $(go.TreeLayout,
        //             {	angle: 90,
        //                 layerSpacing:80,
        //                 isOngoing:false,
        //                 compaction: go.TreeLayout.CompactionNone}),
        layout: this.cancelAutoLayout(),
        // "draggingTool.dragsTree": true,
      });
      // // 放大
      // $(go.Overview, "myOverviewDiv",
      //       {observed: this.diagram, contentAlignment: go.Spot.Center});
      // 箭头连线
      this.diagram.linkTemplate = $(
        go.Link,
        {
          corner: 15,
          toShortLength: 4,
          // curve: go.Link.JumpOver,
          toEndSegmentLength: 15,
          fromEndSegmentLength: 10,
          cursor: 'pointer',
        },
        new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
        new go.Binding('toSpot', 'toSpot', go.Spot.parse),
        new go.Binding('routing', 'routing'),
        {
          selectionAdornmentTemplate: $(
            go.Adornment,
            $(go.Shape, { isPanelMain: true, stroke: '#fff', strokeWidth: 3 }),
            $(go.Shape, { toArrow: 'Standard', fill: '#fff', stroke: null })
          ),
        },
        $(
          go.Shape,
          'RoundedRectangle',
          {
            fill: '#fff',
            stroke: '#fff',
          },
          new go.Binding('strokeDashArray', 'strokeDashArray'),
          new go.Binding('name', 'animation'),
          // #8445DE
          new go.Binding('stroke', 'isHighlighted', (h) => {
            return h ? '#fff' : '#555555';
          }).ofObject(),
          new go.Binding('strokeWidth', 'isHighlighted', (h) => {
            return h ? 3 : 2.5;
          }).ofObject()
        ),
        // this.selectModuleColor(),
        $(
          go.Shape,
          { toArrow: 'Standard', strokeWidth: 0 },
          new go.Binding('fill', 'isHighlighted', (h) => {
            return h ? '#fff' : '#555555';
          }).ofObject()
        ),
        {
          contextMenu: this.linkType(),
        },
        {
          click: (e, obj) => {
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
        },
        this.lineEnterAndLeave(),
        $(
          go.Picture,
          {
            cursor: 'pointer',
            opacity: 0,
            name: 'linkClose',
            desiredSize: new go.Size(14, 14),
            click: (e, obj) => {
              this.delLinkCom(obj.part.data);
            },
          },
          this.delEnterAndLeave(),
          new go.Binding('source', 'close')
        )
      );
      // this.projectListFun('', (res) => {
      //   this.project.list = res.data;
      //   this.project.projectId = this.project.list[0].id;
      //   this.project.row = this.project.list[0];
      //   this.userParam = {
      //     projectId: this.project.projectId,
      //     userId: this.textRobot.aiUserId,
      //   };

      //   this.textRobot.projectId = this.userParam.projectId;
      //   this.textRobot.clickProjectId = this.userParam.projectId;
      //   this.$store.dispatch('setTextRobot', {
      //     ...this.textRobot,
      //   });
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
        console.log(e.diagram.lastInput.documentPoint);
        // var can = document.querySelector("canvas")
        // can.style.outlineColor = "#ff1a52";
      });
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
        toolTip: $(
          go.Adornment,
          'Spot',
          { background: 'transparent' },
          $(go.Placeholder, flag ? { padding: 10 } : { padding: 8 }),
          this.moduleClose(flag)
        ),
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
</style>